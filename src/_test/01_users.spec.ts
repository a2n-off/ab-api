import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { LevelEnum } from '../common/enums/level.enum';
import { getMongoConnection, IMongoConnection, cleanObjectIds } from './utils/mongo.utils';
import { UsersFactory } from './factories/users.factory';
import { getTestingApplication } from './utils/nest-testing.utils';
import { Users } from '../users/users.schema';

describe('👬 users', () => {
  let mc: IMongoConnection;
  let app: INestApplication;
  let usersFactory: UsersFactory;

  /**
   * Init the application
   */
  beforeAll(async () => {
    mc = await getMongoConnection();
    usersFactory = UsersFactory.getInstance(mc.db);
    app = await getTestingApplication();
    await app.init();
  });

  /**
   * Close all connections and process
   */
  afterAll(async () => {
    await app.close();
    await mc.connection.close();
  });
  
  /**
   * Reset the test database to avoid dependencies between unit test
   */
  afterEach(async () => {
    await mc.db.collection('users').deleteMany({});
  });


  /** Create a User */
  it('should create a user requesting post on /users', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'ausername',
        password: 'auserpassword',
        level: LevelEnum.user,
      })
      .expect(201);
  });

  /** Get all Users */
  it('should get all users requesting get on /users', async (done) => {
    const users = await usersFactory.createMany(4);

    // remove fields that are not returned by the API
    const cleanedUsers = users.map((user: Users): Users => {
      const cleanedUser = { ...user }; 
      delete cleanedUser.password;
      return cleanedUser as Users;
    });
  
    request(app.getHttpServer())
      .get(`/users`)
      .expect(200)
      .end((err, res: request.Response) => {
        expect(res.body).toEqual(
          cleanObjectIds(cleanedUsers)
        );

        done();
      });
  });

  /** Update one User */
  it('should update one user', async (done) => {
    const user = await usersFactory.createOne();

    request(app.getHttpServer())
      .put(`/users/${user._id}`)
      .send({
        name: 'johndoe'
      })
      .expect(200)
      .end(async () => {
        const updatedUser: Users = await mc.db.collection('users').findOne({ _id: user._id });
        expect(updatedUser.name).toBe('johndoe');
        done();
      });
  });

  /** Delete one User */
  it('should delete one user', async (done) => {
    const user = await usersFactory.createOne();

    request(app.getHttpServer())
      .delete(`/users/${user._id}`)
      .expect(200)
      .end(async () => {
        const deletedUser = await mc.db.collection('users').findOne({ _id: user._id });
        expect(deletedUser).toBeNull();
        done();
      });
  });

});
