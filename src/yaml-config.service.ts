import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YamlConfigService {
    constructor(private configService: ConfigService) { }

    /**
     * Get a configuration value by key.
     * @param key - The key of the configuration value.
     * @param defaultValue - A default value to return if the key is not found.
     */
    get<T = any>(key: string, defaultValue?: T): T {
        const value = this.configService.get<T>(key);
        return value !== undefined ? value : (defaultValue as T);
    }

    /**
     * Get a nested configuration value by key path.
     * @param path - The path of the nested configuration value, e.g., 'database.host'.
     * @param defaultValue - A default value to return if the path is not found.
     */
    getNested<T = any>(path: string, defaultValue?: T): T {
        const segments = path.split('.');
        let result: any = this.configService.get<T>(segments.shift() as string);

        for (const segment of segments) {
            if (result && typeof result === 'object' && segment in result) {
                result = result[segment];
            } else {
                return defaultValue as T;
            }
        }

        return result !== undefined ? result : (defaultValue as T);
    }
}
