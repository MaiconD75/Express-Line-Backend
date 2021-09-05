import EtherealMail from '../../lib/EtherealMail';

interface ConfirmMailData {
  userName: string;
  email: string;
  userId: string;
}

class ResetPassword {
  get key() {
    return 'ResetPassword';
  }

  async handle(data: ConfirmMailData) {
    const { userName, email, userId } = data;

    const mail = new EtherealMail();

    await mail.sendMail(email, 'Redefinição de senha', 'resetPassword', {
      userName,
      link: `http://localhost:3333/users/forgotten-password/${userId}`,
    });
  }
}

export default new ResetPassword();