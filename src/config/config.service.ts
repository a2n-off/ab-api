import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: {[key: string]: string};

  constructor(filePath: string) {
    // stock the file
    try {
      const fileContents = fs.readFileSync(filePath);
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    } catch (err) {

      this.envConfig = {};
    }
  }

  // get specific key in .env file
  get(key: string): string {
    return Object.keys(this.envConfig).length !== 0 ? this.envConfig[key] : process.env[key];
  }

}
