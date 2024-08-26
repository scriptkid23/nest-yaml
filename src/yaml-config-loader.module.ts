import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import * as YAML from 'yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { YamlConfigService } from './yaml-config.service';

@Module({
    providers: [YamlConfigService],
    exports: [YamlConfigService],
})
export class YamlConfigLoaderModule {
    static forRoot<T extends Record<string, any>>(...transformers: string[]): DynamicModule {
        const env = YamlConfigLoaderModule.loadEnv<T>(process.env.NODE_ENV);
        const configLoaders = YamlConfigLoaderModule.createConfigLoaders(env, transformers);

        return {
            module: YamlConfigLoaderModule,
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    load: configLoaders,
                }),
            ],
            providers: [YamlConfigService],
            exports: [YamlConfigService],
        };
    }

    private static loadEnv<T>(profileName?: string): T {
        const filePath = join(process.cwd(), `.env${profileName ? `.${profileName}` : ''}.yaml`);
        try {
            const fileContents = readFileSync(filePath, 'utf8');
            return YAML.parse(fileContents) as T;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Failed to load environment configuration from ${filePath}: ${error.message}`);
            } else {
                console.error(`Failed to load environment configuration from ${filePath}: Unknown error`);
            }
            throw error;
        }
    }

    private static createConfigLoaders<T extends Record<string, any>>(env: T, transformers: string[]) {
        const keys = [...Object.keys(env), ...transformers];

        return keys.map((key) => {
            return registerAs(key, () => {
                if (env[key] !== undefined) {
                    return env[key];
                }

                console.warn(`Configuration for key: ${key} not found in YAML file.`);
                return undefined;
            });
        });
    }

}
