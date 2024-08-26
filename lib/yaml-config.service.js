"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YamlConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let YamlConfigService = class YamlConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get(key, defaultValue) {
        const value = this.configService.get(key);
        return value !== undefined ? value : defaultValue;
    }
    getNested(path, defaultValue) {
        const segments = path.split('.');
        let result = this.configService.get(segments.shift());
        for (const segment of segments) {
            if (result && typeof result === 'object' && segment in result) {
                result = result[segment];
            }
            else {
                return defaultValue;
            }
        }
        return result !== undefined ? result : defaultValue;
    }
};
exports.YamlConfigService = YamlConfigService;
exports.YamlConfigService = YamlConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], YamlConfigService);
