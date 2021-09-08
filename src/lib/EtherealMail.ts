import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import { resolve } from 'path';
import handlebars from 'handlebars';

class EtherealMail {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS,
      },
    });
  }

  public async sendMail(
    to: string,
    subject: string,
    path: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    variables: any,
  ): Promise<void> {
    const templatePath = resolve(
      __dirname,
      '..',
      'app',
      'views',
      'emails',
      path,
      'index.hbs',
    );

    const templateFileContent = fs.readFileSync(templatePath).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      from: 'Equipe ExpressLine <equipe@expressline.com.br',
      to,
      subject,
      html: templateHTML,
    });
  }
}

export default EtherealMail;
