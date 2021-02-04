import { Request, Response } from 'express';

import DeleteDeliverymanAvatarService from '../services/deliverymanAvatar/DeleteDeliverymanAvatar';
import UpdateDeliverymanAvatarService from '../services/deliverymanAvatar/UpdateDeliverymanAvatarService';

class deliverymenAvatarsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const deliverymanId = request.params.id;
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    const updateDeliverymanAvatarService = new UpdateDeliverymanAvatarService();
    const deliveryman = await updateDeliverymanAvatarService.execute(
      deliverymanId,
      user_id,
      avatarFilename,
    );

    return response.json(deliveryman);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deliverymanId = request.params.id;
    const user_id = request.user.id;

    const deleteDeliverymanAvatarService = new DeleteDeliverymanAvatarService();
    const deliveryman = await deleteDeliverymanAvatarService.execute({
      deliverymanId,
      user_id,
    });

    return response.json(deliveryman);
  }
}

export default deliverymenAvatarsController;
