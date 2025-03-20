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
exports.UserCardController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_card_service_1 = require("./user-card.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const role_enum_1 = require("../user/enums/role.enum");
const user_service_1 = require("../user/user.service");
let UserCardController = class UserCardController {
    userCardService;
    userService;
    constructor(userCardService, userService) {
        this.userCardService = userCardService;
        this.userService = userService;
    }
    async getCardsByUsername(username, query) {
        const page = query.page ? parseInt(query.page, 10) : 1;
        const limit = query.limit ? parseInt(query.limit, 10) : 10;
        const paginationParams = { page, limit };
        const { page: _, limit: __, ...filterParams } = query;
        const user = await this.userService.findByUsername(username);
        if (!user) {
            throw new common_1.NotFoundException(`User with username ${username} not found`);
        }
        let response;
        if (Object.keys(filterParams).length > 0) {
            response = await this.userCardService.searchUserCards(user.id, filterParams, paginationParams);
        }
        else {
            response = await this.userCardService.findAllByUserId(user.id, paginationParams);
        }
        const cards = response.items.map(userCard => ({
            id: userCard.id,
            userId: userCard.userId,
            cardDetails: userCard.card,
            createdAt: userCard.createdAt
        }));
        return {
            cards,
            pagination: response.meta
        };
    }
    async getUserCards(req, userId, query) {
        if (req.user.role !== role_enum_1.Role.ADMIN && req.user.id !== userId) {
            return { error: 'Access denied' };
        }
        const page = query.page ? parseInt(query.page, 10) : 1;
        const limit = query.limit ? parseInt(query.limit, 10) : 10;
        const paginationParams = { page, limit };
        const { page: _, limit: __, ...filterParams } = query;
        let response;
        if (Object.keys(filterParams).length > 0) {
            response = await this.userCardService.searchUserCards(userId, filterParams, paginationParams);
        }
        else {
            response = await this.userCardService.findAllByUserId(userId, paginationParams);
        }
        const cards = response.items.map(userCard => ({
            id: userCard.id,
            userId: userCard.userId,
            cardDetails: userCard.card,
            createdAt: userCard.createdAt
        }));
        return {
            cards,
            pagination: response.meta
        };
    }
    async addCardToUser(req, userId, body) {
        const userCard = await this.userCardService.addCardToUser(req.user, userId, body.scryfallId);
        return {
            userCard: {
                id: userCard.id,
                userId: userCard.userId,
                cardId: userCard.cardId,
                createdAt: userCard.createdAt
            }
        };
    }
    async removeCard(req, cardId) {
        await this.userCardService.removeCardFromUser(req.user, cardId);
        return { success: true };
    }
};
exports.UserCardController = UserCardController;
__decorate([
    (0, common_1.Get)('username/:username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserCardController.prototype, "getCardsByUsername", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UserCardController.prototype, "getUserCards", null);
__decorate([
    (0, common_1.Post)(':userId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UserCardController.prototype, "addCardToUser", null);
__decorate([
    (0, common_1.Delete)(':cardId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('cardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserCardController.prototype, "removeCard", null);
exports.UserCardController = UserCardController = __decorate([
    (0, common_1.Controller)('user-cards'),
    __metadata("design:paramtypes", [user_card_service_1.UserCardService,
        user_service_1.UserService])
], UserCardController);
//# sourceMappingURL=user-card.controller.js.map