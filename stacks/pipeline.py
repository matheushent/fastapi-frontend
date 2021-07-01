from aws_cdk import (
    core,
    pipelines,
    aws_s3 as s3,
    aws_codepipeline as codepipeline,
    aws_codepipeline_actions as actions,
)

from typing import Dict

from stacks.frontend import ProductionStage


class ProductionPipeline(core.Stack):
    def __init__(self, app: core.App, id: str, props: Dict, **kwargs) -> None:
        super().__init__(app, id, **kwargs)

        self.namespace = props['namespace']

        # define the s3 artifact
        source_output = codepipeline.Artifact(artifact_name='source')
        build_output = codepipeline.Artifact(artifact_name='build')

        # define source bucket
        source_bucket = s3.Bucket(
            self, "SourceProductionBucket",
            bucket_name=self.give_name('source-bucket'),
            versioned=True,
            removal_policy=core.RemovalPolicy.DESTROY
        )

        # define the pipeline
        pipeline = codepipeline.Pipeline(
            self, "Pipeline",
            pipeline_name=self.give_name('pipeline'),
            artifact_bucket=props['bucket'],
            stages=[
                codepipeline.StageProps(
                    stage_name='Source',
                    actions=[
                        actions.S3SourceAction(
                            bucket=source_bucket,
                            bucket_key="source.zip",
                            output=source_output,
                            action_name=self.give_name('source'),
                            trigger=actions.S3Trigger.POLL,
                            run_order=1
                        )
                    ]
                ),
                codepipeline.StageProps(
                    stage_name='Build',
                    actions=[
                        actions.CodeBuildAction(
                            action_name=self.give_name('build'),
                            input=source_output,
                            project=props['build'],
                            run_order=1,
                            outputs=[build_output]
                        )
                    ]
                )
            ]

        )

        # give pipeline role read write to the bucket
        props['bucket'].grant_read_write(pipeline.role)

        source_bucket.grant_read_write(pipeline.role)

        cdk_pipeline = pipelines.CdkPipeline(
            self, "CDKPipeline",
            cloud_assembly_artifact=build_output,
            code_pipeline=pipeline,
            # self_mutating=False
        )
        cdk_pipeline.add_application_stage(ProductionStage(
            self, self.give_name('stage'),
            props, **kwargs
        ))

    def give_name(self, name: str) -> str:
        return f'{self.namespace}-{name}'