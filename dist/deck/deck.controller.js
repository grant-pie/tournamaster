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
exports.DeckController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const deck_service_1 = require("./deck.service");
const create_deck_dto_1 = require("./dto/create-deck.dto");
const update_deck_dto_1 = require("./dto/update-deck.dto");
const role_enum_1 = require("../user/enums/role.enum");
let DeckController = class DeckController {
    deckService;
    constructor(deckService) {
        this.deckService = deckService;
    }
    async getUserDecks(req, userId) {
        if (req.user.role !== role_enum_1.Role.ADMIN && req.user.id !== userId) {
            return { error: 'Access denied' };
        }
        const decks = await this.deckService.findAllByUserId(userId);
        return { decks };
    }
    async getDeck(req, id) {
        const deck = await this.deckService.findOne(id);
        if (req.user.role !== role_enum_1.Role.ADMIN && req.user.id !== deck.userId) {
            return { error: 'Access denied' };
        }
        return { deck };
    }
    async createDeck(req, createDeckDto) {
        const deck = await this.deckService.create(req.user, createDeckDto);
        return { deck };
    }
    async updateDeck(req, id, updateDeckDto) {
        const deck = await this.deckService.update(req.user, id, updateDeckDto);
        return { deck };
    }
    async removeDeck(req, id) {
        await this.deckService.delete(req.user, id);
        return { success: true };
    }
    async addCardToDeck(req, deckId, body) {
        const deck = await this.deckService.addCardToDeck(req.user, deckId, body.multiverseId);
        return { deck };
    }
    async removeCardFromDeck(req, deckId, cardId) {
        const deck = await this.deckService.removeCardFromDeck(req.user, deckId, cardId);
        return { deck };
    }
};
exports.DeckController = DeckController;
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "getUserDecks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "getDeck", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_deck_dto_1.CreateDeckDto]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "createDeck", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_deck_dto_1.UpdateDeckDto]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "updateDeck", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "removeDeck", null);
__decorate([
    (0, common_1.Post)(':deckId/cards'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('deckId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "addCardToDeck", null);
__decorate([
    (0, common_1.Delete)(':deckId/cards/:cardId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('deckId')),
    __param(2, (0, common_1.Param)('cardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "removeCardFromDeck", null);
exports.DeckController = DeckController = __decorate([
    (0, common_1.Controller)('decks'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [deck_service_1.DeckService])
], DeckController);
//# sourceMappingURL=deck.controller.js.map