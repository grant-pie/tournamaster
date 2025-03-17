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
let UserCardController = class UserCardController {
    userCardService;
    constructor(userCardService) {
        this.userCardService = userCardService;
    }
    async getUserCards(req, userId, query) {
        if (req.user.role !== role_enum_1.Role.ADMIN && req.user.id !== userId) {
            return { error: 'Access denied' };
        }
        let userCards;
        if (Object.keys(query).length > 0) {
            userCards = await this.userCardService.searchUserCards(userId, query);
        }
        else {
            userCards = await this.userCardService.findAllByUserId(userId);
        }
        const cards = userCards.map(userCard => ({
            id: userCard.id,
            userId: userCard.userId,
            cardDetails: userCard.card,
            createdAt: userCard.createdAt
        }));
        return { cards };
    }
    async addCardToUser(req, userId, body) {
        const userCard = await this.userCardService.addCardToUser(req.user, userId, body.multiverseId);
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
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UserCardController.prototype, "getUserCards", null);
__decorate([
    (0, common_1.Post)(':userId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
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
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('cardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserCardController.prototype, "removeCard", null);
exports.UserCardController = UserCardController = __decorate([
    (0, common_1.Controller)('user-cards'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [user_card_service_1.UserCardService])
], UserCardController);
//# sourceMappingURL=user-card.controller.js.map