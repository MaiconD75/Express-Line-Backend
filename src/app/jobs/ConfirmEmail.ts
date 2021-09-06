import EtherealMail from '../../lib/EtherealMail';

interface ConfirmEmailData {
  userName: string;
  email: string;
  userId: string;
}

class ConfirmEmail {
  get key() {
    return 'ConfirmEmail';
  }

  async handle(data: ConfirmEmailData) {
    const { userName, email, userId } = data;

    const mail = new EtherealMail();

    await mail.sendMail(email, 'Confirme seu email', 'confirmEmail', {
      userName,
      confirmLink: `${process.env.APP_WEB_URL}/users/confirm-email/${userId}`,
      unconfirmLink: `${process.env.APP_WEB_URL}/users/unconfirm-email/${userId}`,
    });
  }
}

export default new ConfirmEmail();
