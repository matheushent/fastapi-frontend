#!/usr/bin/env python3

from aws_cdk import core

from stacks.staging.pipeline import StagingPipeline
from stacks.pipeline import ProductionPipeline
from stacks.base import Base


common_tags = {"Application": "jobbergate2", "project": "Jobbergate"}

props = {"namespace": "jobbergate2"}

env = core.Environment(account="212021838531", region="us-east-1")

app = core.App()

base = Base(app, f"{props['namespace']}-base", props, env=env, tags=common_tags)

# Production

pipeline = ProductionPipeline(
    app, f"{props['namespace']}-pipeline", base.outputs, env=env, tags=common_tags
)
pipeline.add_dependency(base)

# Test

pipeline_test = StagingPipeline(
    app, f"{props['namespace']}-pipeline-staging", base.outputs, env=env, tags=common_tags
)
pipeline_test.add_dependency(base)

app.synth()