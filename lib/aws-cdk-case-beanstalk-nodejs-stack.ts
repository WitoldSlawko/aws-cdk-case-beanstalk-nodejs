import cdk = require('@aws-cdk/core');
import elasticbeanstalk = require('@aws-cdk/aws-elasticbeanstalk');
import s3assets = require('@aws-cdk/aws-s3-assets');
import getFileZipName from '../utils/getZipFileName';

export class ElbeanstalkNodejsStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const platform = this.node.tryGetContext('platform');

        const elbZipArchive = new s3assets.Asset(this, 'MyElbAppZip', {
            path: `${__dirname}/../${getFileZipName()}`
        });

        const appName = 'cdkElasticBeanStalkNodejs';
        const app = new elasticbeanstalk.CfnApplication(this, 'Application', {
            applicationName: appName,
        });

        const optionSettingProperties: elasticbeanstalk.CfnEnvironment.OptionSettingProperty[] = [
            {
                namespace: 'aws:autoscaling:launchconfiguration',
                optionName: 'InstanceType',
                value: 't2.micro'
            },
            {
                namespace: 'aws:autoscaling:launchconfiguration',
                optionName: 'IamInstanceProfile',
                value: 'aws-elasticbeanstalk-ec2-role'
            }
        ];

        const appVersionProps = new elasticbeanstalk.CfnApplicationVersion(this, 'AppVersion', {
            applicationName: appName,
            sourceBundle: {
                s3Bucket: elbZipArchive.s3BucketName,
                s3Key: elbZipArchive.s3ObjectKey,
            },
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const elbEnv = new elasticbeanstalk.CfnEnvironment(this, 'Environment', {
            environmentName: 'beta-env',
            applicationName: app.applicationName || appName,
            platformArn: platform,
            solutionStackName: '64bit Amazon Linux 2 v5.0.1 running Node.js 10',
            optionSettings: optionSettingProperties,
            versionLabel: appVersionProps.ref
        });

        elbEnv.addDependsOn(app);
        appVersionProps.addDependsOn(app);
    }

}