import { ConfigService } from '@nestjs/config';
export declare class YamlConfigService {
    private configService;
    constructor(configService: ConfigService);
    get<T = any>(key: string, defaultValue?: T): T;
    getNested<T = any>(path: string, defaultValue?: T): T;
}
