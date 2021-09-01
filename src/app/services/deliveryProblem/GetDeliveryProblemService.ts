import { getRepository } from 'typeorm';
import DeliveryProblem from '../../data/models/DeliveryProblem';

class GetDeliveryProblemService {
  public async execute(delivery_id: string): Promise<DeliveryProblem[]> {
    const deliveryProblemRepository = getRepository(DeliveryProblem);

    const deliveriesProblems = await deliveryProblemRepository.find({
      where: {
        delivery_id,
      },
      relations: ['delivery'],
      order: {
        created_at: 'ASC',
      },
    });

    return deliveriesProblems;
  }
}

export default GetDeliveryProblemService;
