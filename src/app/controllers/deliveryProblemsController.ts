import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateDeliveryProblemService from '../services/deliveryProblem/CreateDeliveryProblemService';
import ListDeliveryProblemService from '../services/deliveryProblem/ListDeliveryProblemService';

class DeliveryProblemsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const delivery_id = request.params.id;
    const { deliveryman_id, description } = request.body;

    const createDeliveryProblemsService = new CreateDeliveryProblemService();
    const deliveryProblem = await createDeliveryProblemsService.execute({
      deliveryman_id,
      delivery_id,
      description,
    });

    return response.json(classToClass(deliveryProblem));
  }

  // public async index(request: Request, response: Response): Promise<Response> {}

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listDeliveryProblemsService = new ListDeliveryProblemService();
    const deliveryProblemslist = await listDeliveryProblemsService.execute(id);

    return response.json(classToClass(deliveryProblemslist));
  }

  // public async update(request: Request, response: Response): Promise<Response> {}
}

export default DeliveryProblemsController;
