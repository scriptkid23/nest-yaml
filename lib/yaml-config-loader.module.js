"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var YamlConfigLoaderModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.YamlConfigLoaderModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const YAML = require("yaml");
const fs_1 = require("fs");
const path_1 = require("path");
const yaml_config_service_1 = require("./yaml-config.service");
let YamlConfigLoaderModule = YamlConfigLoaderModule_1 = class YamlConfigLoaderModule {
    static forRoot(...transformers) {
        const env = YamlConfigLoaderModule_1.loadEnv(process.env.NODE_ENV);
        const configLoaders = YamlConfigLoaderModule_1.createConfigLoaders(env, transformers);
        return {
            module: YamlConfigLoaderModule_1,
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    load: configLoaders,
                }),
            ],
            providers: [yaml_config_service_1.YamlConfigService],
            exports: [yaml_config_service_1.YamlConfigService],
        };
    }
    static loadEnv(profileName) {
        const filePath = (0, path_1.join)(process.cwd(), `.env${profileName ? `.${profileName}` : ''}.yaml`);
        try {
            const fileContents = (0, fs_1.readFileSync)(filePath, 'utf8');
            return YAML.parse(fileContents);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(`Failed to load environment configuration from ${filePath}: ${error.message}`);
            }
            else {
                console.error(`Failed to load environment configuration from ${filePath}: Unknown error`);
            }
            throw error;
        }
    }
    static createConfigLoaders(env, transformers) {
        const keys = [...Object.keys(env), ...transformers];
        return keys.map((key) => {
            return (0, config_1.registerAs)(key, () => {
                if (env[key] !== undefined) {
                    return env[key];
                }
                console.warn(`Configuration for key: ${key} not found in YAML file.`);
                return undefined;
            });
        });
    }
};
exports.YamlConfigLoaderModule = YamlConfigLoaderModule;
exports.YamlConfigLoaderModule = YamlConfigLoaderModule = YamlConfigLoaderModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [yaml_config_service_1.YamlConfigService],
        exports: [yaml_config_service_1.YamlConfigService],
    })
], YamlConfigLoaderModule);
