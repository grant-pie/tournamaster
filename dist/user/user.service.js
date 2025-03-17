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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const role_enum_1 = require("./enums/role.enum");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findOrCreateUser(userDetails) {
        const existingUser = await this.userRepository.findOne({
            where: { googleId: userDetails.googleId },
        });
        if (existingUser) {
            return existingUser;
        }
        const newUser = new user_entity_1.User();
        newUser.googleId = userDetails.googleId;
        newUser.email = userDetails.email || '';
        newUser.firstName = userDetails.firstName || '';
        newUser.lastName = userDetails.lastName || '';
        newUser.picture = userDetails.picture || '';
        newUser.role = role_enum_1.Role.USER;
        return this.userRepository.save(newUser);
    }
    async findById(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async findAll() {
        return this.userRepository.find();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map