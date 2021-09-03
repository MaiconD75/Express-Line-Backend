import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';

class EtherealMail {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'peyton.lowe72@ethereal.email',
        pass: 'GjABaatbfg3n2TWC4j',
      },
    });
  }

  public async sendMail(
    to: string,
    subject: string,
    templatePath: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    variables: any,
  ): Promise<void> {
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
