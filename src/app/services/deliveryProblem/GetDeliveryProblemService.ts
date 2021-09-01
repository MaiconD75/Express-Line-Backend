import { getRepository } from 'typeorm';
import DeliveryProblem from '../../data/models/DeliveryProblem';

class GetDeliveryProblemService {
  public async execute(delivery_id: string): Promise<DeliveryProblem[]> {
    const deliveryProblemRepository = getRepository(DeliveryProblem);

    const DeliveriesProblems = await deliveryProblemRepository.find({
      where: {
        delivery_id,
      },
      relations: ['delivery'],
      order: {
        created_at: 'ASC',
      },
    });

    return DeliveriesProblems;
  }
}

export default GetDeliveryProblemService;
