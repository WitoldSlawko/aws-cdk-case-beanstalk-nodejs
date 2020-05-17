#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ElbeanstalkNodejsStack } from '../lib/aws-cdk-case-beanstalk-nodejs-stack';

const app = new cdk.App();
new ElbeanstalkNodejsStack(app, 'ElbeanstalkNodejsStack');
app.synth();
