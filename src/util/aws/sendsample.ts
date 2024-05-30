// email.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { EmailUtil } from './mail.awsutil';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailUtil) {}

  @Post('send')
  async sendEmail(@Body() data: { to: string; subject: string; templateName: string; templateData: any }) {
    const { to, subject, templateName, templateData } = data;
    await this.emailService.sendEmail(to, subject, templateName, templateData);
    return { message: 'Email sent successfully' };
  }
}
