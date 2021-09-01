import { getRepository } from 'typeorm';
import DeliveryProblem from '../../data/models/DeliveryProblem';

class ListDeliveryProblemService {
  public async execute(user_id: string): Promise<DeliveryProblem[]> {
    const deliveryProblemRepository = getRepository(DeliveryProblem);

    const deliveriesProblems = await deliveryProblemRepository.find({
      where: {
        delivery: {
          user_id,
        },
      },
      relations: ['delivery'],
      order: {
        created_at: 'ASC',
      },
    });

    return deliveriesProblems;
  }
}

export default ListDeliveryProblemService;
