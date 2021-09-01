import { getCustomRepository } from 'typeorm';
import Delivery from '../../data/models/Delivery';
import DeliveryProblemRepository from '../../data/repositories/DeliveryProblemRepository';
import DeliveryRepository from '../../data/repositories/DeliveryRepository';
import AppError from '../../error/AppError';

class DeleteDeliveryProblemService {
  public async execute(problem_id: string): Promise<Delivery> {
    const deliveryProblemRepository = getCustomRepository(
      DeliveryProblemRepository,
    );
    const deliveryRepository = getCustomRepository(DeliveryRepository);

    if (!problem_id) {
      throw new AppError(`Problem's id was not provided`);
    }

    const deliveryProblem = await deliveryProblemRepository.findById(
      problem_id,
    );

    const delivery = await deliveryRepository.findById(
      deliveryProblem.delivery_id,
    );

    if (!delivery.start_date) {
      throw new AppError('You does not can cancel a non started delivery');
    }

    if (delivery.end_date) {
      throw new AppError('You does not can cancel a ended delivery');
    }

    delivery.canceled_at = new Date();

    await deliveryRepository.save(delivery);

    return delivery;
  }
}

export default DeleteDeliveryProblemService;
