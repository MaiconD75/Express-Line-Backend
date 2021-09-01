import { classToClass } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import DeliveryProblem from '../../data/models/DeliveryProblem';
import DeliveryProblemRepository from '../../data/repositories/DeliveryProblemRepository';
import DeliveryRepository from '../../data/repositories/DeliveryRepository';
import AppError from '../../error/AppError';

interface Request {
  deliveryman_id: string;
  delivery_id: string;
  description: string;
}

class CreateDeliveryProblemService {
  public async execute({
    deliveryman_id,
    delivery_id,
    description,
  }: Request): Promise<DeliveryProblem> {
    const deliveryProblemRepository = getCustomRepository(
      DeliveryProblemRepository,
    );
    const deliveryRepository = getCustomRepository(DeliveryRepository);

    if (!delivery_id) {
      throw new AppError(`delivery's id was not provided`);
    }

    const delivery = await deliveryRepository.findById(delivery_id);

    if (delivery.deliveryman_id !== deliveryman_id) {
      throw new AppError('You does not have this delivery');
    }

    if (!delivery.start_date) {
      throw new AppError(
        'You does not can register a problem in a non started delivery',
      );
    }

    if (delivery.end_date) {
      throw new AppError(
        'You does not can register a problem in a ended delivery',
      );
    }

    if (!description) {
      throw new AppError('The description was not provided');
    }

    const deliveryProblem = deliveryProblemRepository.create({
      delivery_id,
      description,
    });

    await deliveryProblemRepository.save(deliveryProblem);

    const createdDeliveryProblem = await deliveryProblemRepository.findById(
      deliveryProblem.id,
    );

    return classToClass(createdDeliveryProblem);
  }
}

export default CreateDeliveryProblemService;
