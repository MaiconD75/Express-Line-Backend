import EtherealMail from '../../lib/EtherealMail';

interface NewDeliveryData {
  email: string;
  deliverymanName: string;
  product: string;
  recipientName: string;
  deliveryId: string;
}

class NewDelivery {
  get key() {
    return 'NewDelivery';
  }

  async handle(data: NewDeliveryData) {
    const { email, deliverymanName, product, recipientName, deliveryId } = data;

    const mail = new EtherealMail();

    await mail.sendMail(email, 'Nova encomenda', 'newDelivery', {
      deliverymanName,
      product,
      recipientName,
      link: `http://localhost:3333/deliveries/${deliveryId}`,
    });
  }
}

export default new NewDelivery();
