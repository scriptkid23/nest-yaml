import { DynamicModule } from '@nestjs/common';
export declare class YamlConfigLoaderModule {
    static forRoot<T extends Record<string, any>>(...transformers: string[]): DynamicModule;
    private static loadEnv;
    private static createConfigLoaders;
}
