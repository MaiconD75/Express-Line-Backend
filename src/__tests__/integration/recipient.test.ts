import request from 'supertest';
import faker from 'faker/locale/pt_BR';

import app from '../../app';
import connection from '../../database/connection';

describe('Recipient', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  it('should be able to register', async () => {
    const randomEmail = faker.internet.email();

    await request(app).post('/users').send({
      email: randomEmail,
      name: 'Some Name',
      password: '123456',
    });

    const userSession = await request(app).post('/sessions').send({
      email: randomEmail,
      password: '123456',
    });

    const recipient = await request(app)
      .post('/recipients')
      .set('Authorization', `bearer ${userSession.body.token}`)
      .send({
        name: 'Jonathan de Lima Souza',
        street: 'Rua Adolfo Gordo',
        number: 1035,
        complement: 'Ap.: 705 Bloco: A',
        city: 'Natal',
        state: 'Rio Grande do Sul',
        zip_code: 59070100,
      });

    expect(recipient.body).toHaveProperty('id');
  });
});
