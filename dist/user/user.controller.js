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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_service_1 = require("./user.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const role_enum_1 = require("./enums/role.enum");
const update_username_dto_1 = require("./dto/update-username.dto");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async findAll() {
        const users = await this.userService.findAll();
        return users.map(user => ({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt
        }));
    }
    async getAllUsernames() {
        const users = await this.userService.findAll();
        return users
            .filter(user => user.username)
            .map(user => ({
            id: user.id,
            username: user.username
        }));
    }
    async findOne(id) {
        const user = await this.userService.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt
        };
    }
    async findByUsername(username) {
        const user = await this.userService.findByUsername(username);
        if (!user) {
            throw new common_1.NotFoundException(`User with username ${username} not found`);
        }
        return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture,
        };
    }
    async updateUsername(req, updateUsernameDto) {
        const userId = req.user.id;
        const updatedUser = await this.userService.updateUsername(userId, updateUsernameDto);
        return {
            id: updatedUser.id,
            username: updatedUser.username,
            message: 'Username updated successfully'
        };
    }
    async updateUsernameByAdmin(id, updateUsernameDto, req) {
        if (req.user.id === id && req.user.role === role_enum_1.Role.ADMIN) {
            return this.updateUsername(req, updateUsernameDto);
        }
        const updatedUser = await this.userService.updateUsername(id, updateUsernameDto);
        return {
            id: updatedUser.id,
            username: updatedUser.username,
            message: 'Username updated successfully by admin'
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('usernames'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsernames", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('username/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByUsername", null);
__decorate([
    (0, common_1.Patch)('username'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_username_dto_1.UpdateUsernameDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUsername", null);
__decorate([
    (0, common_1.Patch)(':id/username'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_username_dto_1.UpdateUsernameDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUsernameByAdmin", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map