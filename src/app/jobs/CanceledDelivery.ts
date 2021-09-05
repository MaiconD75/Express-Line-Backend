import EtherealMail from '../../lib/EtherealMail';

interface CanceledDeliveryData {
  email: string;
  deliverymanName: string;
  product: string;
  recipientName: string;
  description: string;
  deliveryId: string;
}

class CanceledDelivery {
  get key() {
    return 'CanceledDelivery';
  }

  async handle(data: CanceledDeliveryData) {
    const {
      email,
      deliverymanName,
      product,
      recipientName,
      description,
      deliveryId,
    } = data;

    const mail = new EtherealMail();

    await mail.sendMail(email, 'Entrega Cancelada', 'canceledDelivery', {
      deliverymanName,
      product,
      recipientName,
      description,
      link: `http://localhost:3333/deliveries/${deliveryId}`,
    });
  }
}

export default new CanceledDelivery();
