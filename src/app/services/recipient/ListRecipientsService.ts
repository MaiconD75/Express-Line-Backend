import { getRepository } from 'typeorm';

import Recipient from '../../data/models/Recipient';

class ListRecipientsService {
  public async execute(id: string): Promise<Recipient[]> {
    const recipientsRepository = getRepository(Recipient);

    const recipientsList = await recipientsRepository.find({
      where: { user_id: id },
    });

    return recipientsList;
  }
}
export default ListRecipientsService;
