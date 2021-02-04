import { getRepository } from 'typeorm';

import Origin from '../../data/models/Origin';

class ListOriginsService {
  public async execute(id: string): Promise<Origin[]> {
    const originsRepository = getRepository(Origin);

    const originsList = await originsRepository.find({
      where: { user_id: id },
    });

    return originsList;
  }
}
export default ListOriginsService;
