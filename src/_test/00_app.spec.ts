import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app/app.controller';
import { AppService } from '../app/app.service';

describe('🎉 Basic app test', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('🧟 API is alive', () => {
    it('should return hello world quote', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHello()).toBe('Hello World! My version is 0.0.1-beta.');
    });
  });

  describe('📝 read proper config variable', () => {

    it('should have a db_user', () => {
      expect(process.env.db_user).toBeDefined();
    });
    it('should have a db_pass', () => {
      expect(process.env.db_pass).toBeDefined();
    });
    it('should have a db_uri', () => {
      expect(process.env.db_uri).toBeDefined();
    });
    it('should have a db_port', () => {
      expect(process.env.db_port).toBeDefined();
    });
    it('should have a db_name', () => {
      expect(process.env.db_name).toBeDefined();
    });
  });

});
