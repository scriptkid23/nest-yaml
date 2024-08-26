# `yaml-config-loader-nestjs`

`yaml-config-loader-nestjs` is a NestJS library that enables you to use YAML files for configuration, providing type safety compared to traditional `.env` files.

## Installation

To install the library, use npm:

```bash
npm install yaml-config-loader-nestjs
```

## Configuration

### 1. Create YAML Configuration Files

Create a default YAML configuration file with various settings. For example, create a file named `.env.yaml` with the following content:

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

Create additional environment-specific YAML files as needed:

- `.env.development.yaml` for development settings.
- `.env.production.yaml` for production settings.

### 2. Set Up Environment-Specific Scripts

Configure your `package.json` to use different YAML files based on the environment. Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "start:dev": "NODE_ENV=development nest start --watch",
    "start:prod": "NODE_ENV=production node dist/main"
  }
}
```

### 3. Integrate `yaml-config-loader-nestjs` in Your Application

1. **Initialize the `YamlConfigLoaderModule`:**

   Import and configure `YamlConfigLoaderModule` in your main module (`AppModule`):

   ```typescript
   import { Module } from '@nestjs/common';
   import { AppController } from './app.controller';
   import { AppService } from './app.service';
   import { YamlConfigLoaderModule } from 'yaml-config-loader-nestjs';

   @Module({
     imports: [YamlConfigLoaderModule.forRoot()],
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
   import { YamlConfigService } from 'yaml-config-loader-nestjs';

   @Controller()
   export class AppController {
     constructor(private readonly appService: AppService, private readonly yamlService: YamlConfigService) {}

     @Get()
     getHello(): string {
       // Access a nested configuration value
       console.log(`HTTP Port: ${this.yamlService.getNested('http.port')}`);
       console.log(`Database Host: ${this.yamlService.getNested('database.host')}`);
       return this.appService.getHello();
     }
   }
   ```

### 4. Example Usage

- **Development Mode:** Run your application with development settings by using:

  ```bash
  npm run start:dev
  ```

  This will load configurations from `.env.development.yaml`.

- **Production Mode:** Run your application with production settings by using:

  ```bash
  npm run start:prod
  ```

  This will load configurations from `.env.production.yaml`.

## License

This library is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
