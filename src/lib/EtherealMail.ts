import nodemailer, { Transporter } from 'nodemailer';

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
    body: string,
  ): Promise<void> {
    await this.client.sendMail({
      from: 'Equipe ExpressLine <equipe@expressline.com.br',
      to,
      subject,
      text: body,
    });
  }
}

export default EtherealMail;
