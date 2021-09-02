import { classToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import RedisCache from '../../../lib/Redis';
import DeliveryProblem from '../../data/models/DeliveryProblem';

class GetDeliveryProblemService {
  public async execute(delivery_id: string): Promise<DeliveryProblem[]> {
    const cache = new RedisCache();
    const deliveryProblemRepository = getRepository(DeliveryProblem);

    let deliveryProblems = await cache.recover<DeliveryProblem[]>(
      `delivery-problems-list:${delivery_id}`,
    );

    if (!deliveryProblems) {
      deliveryProblems = await deliveryProblemRepository.find({
        where: {
          delivery_id,
        },
        relations: ['delivery'],
        order: {
          created_at: 'ASC',
        },
      });

      await cache.save(
        `delivery-problems-list:${delivery_id}`,
        classToClass(deliveryProblems),
      );
    }

    return deliveryProblems;
  }
}

export default GetDeliveryProblemService;
