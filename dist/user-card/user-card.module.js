"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_card_controller_1 = require("./user-card.controller");
const user_card_service_1 = require("./user-card.service");
const user_card_entity_1 = require("./entities/user-card.entity");
const card_module_1 = require("../card/card.module");
const user_module_1 = require("../user/user.module");
let UserCardModule = class UserCardModule {
};
exports.UserCardModule = UserCardModule;
exports.UserCardModule = UserCardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_card_entity_1.UserCard]),
            card_module_1.CardModule,
            user_module_1.UserModule,
        ],
        controllers: [user_card_controller_1.UserCardController],
        providers: [user_card_service_1.UserCardService],
        exports: [user_card_service_1.UserCardService],
    })
], UserCardModule);
//# sourceMappingURL=user-card.module.js.map