// email.service.ts

import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailUtil {
  constructor() {}

  async sendEmail(to: string, subject: string, templateName: string, templateData: any) {
    // AWS SES를 사용하기 위해 인증 정보 설정
    AWS.config.update({
      accessKeyId: 'YOUR_ACCESS_KEY_ID',
      secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
      region: 'YOUR_REGION', // 예: 'us-west-2'
    });

    // AWS SES 객체 생성
    const ses = new AWS.SES({ apiVersion: '2010-12-01' });

    // EJS 템플릿 로드
    const templatePath = path.resolve(__dirname, 'templates', `${templateName}.ejs`);
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    // EJS 템플릿 렌더링
    const renderedTemplate = ejs.render(templateContent, templateData);

    // 이메일 전송 요청 생성
    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Data: renderedTemplate,
          },
        },
        Subject: {
          Data: subject,
        },
      },
      Source: 'YOUR_SENDER_EMAIL',
    };

    try {
      // 이메일 전송 요청 보내기
      const result = await ses.sendEmail(params).promise();
      console.log('Email sent:', result);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
