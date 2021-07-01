from aws_cdk import (
    core,
    aws_s3 as s3,
    aws_iam as iam,
    aws_ssm as ssm,
    aws_ecr as ecr,
    aws_codebuild as codebuild,
)

from typing import Dict


class Base(core.Stack):
    def __init__(self, app: core.App, id: str, props: Dict, **kwargs) -> None:
        super().__init__(app, id, **kwargs)

        # pipeline requires versioned bucket
        bucket = s3.Bucket(
            self,
            "SourceBucket",
            bucket_name=f"{props['namespace'].lower()}-{core.Aws.ACCOUNT_ID}",
            versioned=True,
            removal_policy=core.RemovalPolicy.DESTROY,
        )

        # codebuild project meant to run in pipeline
        build = codebuild.PipelineProject(
            self,
            "BuildProject",
            project_name=f"{props['namespace']}-build",
            build_spec=codebuild.BuildSpec.from_source_filename(
                filename="buildspec.yaml"
            ),
            environment=codebuild.BuildEnvironment(
                privileged=True,
                build_image=codebuild.LinuxBuildImage.STANDARD_5_0,
                compute_type=codebuild.ComputeType.LARGE
            ),
            environment_variables={
                "namespace": codebuild.BuildEnvironmentVariable(
                    value=props["namespace"]
                )
            },
            description="CodeBuild project for the Jobbergate2 frontend",
            timeout=core.Duration.minutes(60),
        )

        build.add_to_role_policy(
            iam.PolicyStatement(actions=["cloudformation:*"], resources=["*"])
        )

        # codebuild iam permissions to read write s3
        bucket.grant_read_write(build)

        self.output_props = props.copy()
        self.output_props["build"] = build
        self.output_props["bucket"] = bucket

    # pass objects to another stack
    @property
    def outputs(self):
        return self.output_props