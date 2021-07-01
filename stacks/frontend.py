from aws_cdk import (
    core,
    aws_s3 as s3,
    aws_route53 as route53,
    aws_cloudfront as cloudfront,
    aws_certificatemanager as cm,
    aws_s3_deployment as s3_deploy,
    aws_route53_targets as targets,
)

from typing import Dict, Optional, Any


class Production(core.Stack):
    def __init__(self, app: core.App, id: str, props: Dict, **kwargs):
        super().__init__(app, id, **kwargs)

        site_domain = "placeholder"

        hosted_zone = route53.HostedZone.from_hosted_zone_attributes(
            self,
            "HostedZone",
            hosted_zone_id="Z2RWLC4Y0R7S2S",
            zone_name="omnivector.solutions",
        )

        # note the removal policy is "RETAIN". It requires to be manually deleted
        bucket = s3.Bucket(
            self,
            "OriginBucket",
            bucket_name=site_domain,
            website_index_document="index.html",
            website_error_document="index.html",
            removal_policy=core.RemovalPolicy.RETAIN,
            cors=[s3.CorsRule(
                allowed_origins=["*"],
                allowed_methods=[
                    s3.HttpMethods.GET,
                    s3.HttpMethods.HEAD,
                    s3.HttpMethods.POST,
                    s3.HttpMethods.PUT,
                    s3.HttpMethods.DELETE
                ],
                allowed_headers=["*"]
            )],
            public_read_access=True
        )

        certificate = cm.Certificate.from_certificate_arn(
            self, "AwsCertificate",
            certificate_arn="<placeholder>"
        )

        distribution = cloudfront.CloudFrontWebDistribution(
            self,
            "Distribution",
            alias_configuration=cloudfront.AliasConfiguration(
                acm_cert_ref=certificate.certificate_arn,
                names=[site_domain],
                ssl_method=cloudfront.SSLMethod.SNI,
                security_policy=cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
            ),
            origin_configs=[
                cloudfront.SourceConfiguration(
                    custom_origin_source=cloudfront.CustomOriginConfig(
                        domain_name=bucket.bucket_website_domain_name,
                        origin_protocol_policy=cloudfront.OriginProtocolPolicy.HTTP_ONLY
                    ),
                    behaviors=[
                        cloudfront.Behavior(
                            is_default_behavior=True,
                            max_ttl=core.Duration.seconds(0),
                            min_ttl=core.Duration.seconds(0),
                            default_ttl=core.Duration.seconds(0),
                        )
                    ],
                )
            ],
        )

        record = route53.ARecord(
            self,
            "ARecord",
            target=route53.RecordTarget.from_alias(
                targets.CloudFrontTarget(distribution=distribution)
            ),
            zone=hosted_zone,
            record_name=site_domain,
        )

        s3_deploy.BucketDeployment(
            self,
            "BucketDeployment",
            sources=[s3_deploy.Source.asset('./dist')],
            destination_bucket=bucket,
            memory_limit=512
        )


class ProductionStage(core.Stage):
    def __init__(
        self,
        app: core.App,
        id: str,
        props: Dict,
        outdir: Optional[str] = None,
        **kwargs: Any,
    ):
        super().__init__(app, id, env=kwargs.get("env"), outdir=outdir)

        stack = Production(self, f"{props['namespace']}", props, **kwargs)
