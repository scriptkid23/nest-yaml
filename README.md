# `nest-yaml`

`nest-yaml` is a NestJS library that enables you to use YAML files for configuration, offering a more structured and readable alternative to traditional `.env` files.

## Installation

Install via npm:

```bash
npm install nest-yaml
```

## Configuration

### 1. Create YAML Configuration Files

Define your application configuration in YAML format. For example, create a file named `.env.yaml`:

```yaml
app:
  name: "MyApp"
  version: "1.0.0"
  environment: "development"

http:
  port: 8080
  host: "localhost"

database:
  host: "127.0.0.1"
  port: 5432
  username: "user"
  password: "password"
  name: "mydatabase"

logging:
  level: "debug"
  file: "app.log"
```

You can also create environment-specific YAML files:

- `.env.development.yaml` for development settings.
- `.env.production.yaml` for production settings.

### 2. Set Up Environment-Specific Scripts

Configure your `package.json` to load different YAML files based on the environment:

```json
{
  "scripts": {
    "start:dev": "NODE_ENV=development nest start --watch",
    "start:prod": "NODE_ENV=production node dist/main"
  }
}
```

### 3. Integrate `nest-yaml` in Your Application

1. **Initialize the `YamlConfigModule`:**

   Import and configure `YamlConfigModule` in your `AppModule`:

   ```typescript
   import { Module } from '@nestjs/common';
   import { AppController } from './app.controller';
   import { AppService } from './app.service';
   import { YamlConfigModule } from 'nest-yaml';

   @Module({
     imports: [YamlConfigModule.forRoot()],
     controllers: [AppController],
     providers: [AppService],
   })
   export class AppModule {}
   ```

2. **Access Configuration Values:**

   Use `YamlConfigService` to retrieve configuration values in your controllers or services:

   ```typescript
   import { Controller, Get } from '@nestjs/common';
   import { AppService } from './app.service';
   import { YamlConfigService } from 'nest-yaml';

   @Controller()
   export class AppController {
     constructor(private readonly appService: AppService, private readonly configService: YamlConfigService) {}

     @Get()
     getHello(): string {
       // Access a nested configuration value
       const httpPort = this.configService.get('http.port');
       const dbHost = this.configService.get('database.host');
       console.log(`HTTP Port: ${httpPort}`);
       console.log(`Database Host: ${dbHost}`);
       return this.appService.getHello();
     }
   }
   ```

### 4. Example Usage

- **Development Mode:** Run your application with development settings:

  ```bash
  npm run start:dev
  ```

  This will load configurations from `.env.development.yaml`.

- **Production Mode:** Run your application with production settings:

  ```bash
  npm run start:prod
  ```

  This will load configurations from `.env.production.yaml`.

## License

This library is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
