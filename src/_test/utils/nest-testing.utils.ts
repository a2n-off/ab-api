import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";

import { AppModule } from "../../app/app.module";

/**
 * Get a nest application from a built testing module.
 * Use the global AppModule.
 * @return {Promise<INestApplication>} Nest application
 */
export const getTestingApplication = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  
  return moduleFixture.createNestApplication();
}