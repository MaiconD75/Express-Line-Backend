import { classToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import RedisCache from '../../../lib/Redis';
import DeliveryProblem from '../../data/models/DeliveryProblem';

class ListDeliveryProblemService {
  public async execute(user_id: string): Promise<DeliveryProblem[]> {
    const cache = new RedisCache();
    const deliveryProblemRepository = getRepository(DeliveryProblem);

    let deliveriesProblems = await cache.recover<DeliveryProblem[]>(
      `deliveries-problems-list:${user_id}`,
    );

    if (!deliveriesProblems) {
      deliveriesProblems = await deliveryProblemRepository.find({
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

      await cache.save(
        `deliveries-problems-list:${user_id}`,
        classToClass(deliveriesProblems),
      );
    }

    return deliveriesProblems;
  }
}

export default ListDeliveryProblemService;
