import { getRepository } from 'typeorm';
import RedisCache from '../../../lib/Redis';

import Origin from '../../data/models/Origin';

class ListOriginsService {
  public async execute(id: string): Promise<Origin[]> {
    const cache = new RedisCache();
    const originsRepository = getRepository(Origin);

    let originsList = await cache.recover<Origin[]>(`origins-list:${id}`);

    if (!originsList) {
      originsList = await originsRepository.find({
        where: { user_id: id },
      });

      console.log('é');

      await cache.save(`origins-list:${id}`, originsList);
    }

    return originsList;
  }
}
export default ListOriginsService;
