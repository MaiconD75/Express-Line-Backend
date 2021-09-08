import EtherealMail from '../../lib/EtherealMail';

interface ResetPasswordData {
  userName: string;
  email: string;
  userToken: string;
}

class ResetPassword {
  get key() {
    return 'ResetPassword';
  }

  async handle(data: ResetPasswordData) {
    const { userName, email, userToken } = data;

    const mail = new EtherealMail();

    await mail.sendMail(email, 'Redefinição de senha', 'resetPassword', {
      userName,
      link: `${process.env.APP_WEB_URL}/users/forgotten-password/${userToken}`,
    });
  }
}

export default new ResetPassword();
