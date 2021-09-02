import { getRepository } from 'typeorm';
import RedisCache from '../../../lib/Redis';

import Recipient from '../../data/models/Recipient';

class ListRecipientsService {
  public async execute(id: string): Promise<Recipient[]> {
    const cache = new RedisCache();
    const recipientsRepository = getRepository(Recipient);

    let recipientsList = await cache.recover<Recipient[]>(
      `recipients-list:${id}`,
    );

    if (!recipientsList) {
      recipientsList = await recipientsRepository.find({
        where: { user_id: id },
      });

      await cache.save(`recipients-list:${id}`, recipientsList);
    }

    return recipientsList;
  }
}
export default ListRecipientsService;
