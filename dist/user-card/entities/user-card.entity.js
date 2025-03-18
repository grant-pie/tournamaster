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
exports.UserCard = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const card_entity_1 = require("../../card/entities/card.entity");
const deck_entity_1 = require("../../deck/entities/deck.entity");
let UserCard = class UserCard {
    id;
    userId;
    cardId;
    user;
    card;
    decks;
    createdAt;
};
exports.UserCard = UserCard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserCard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserCard.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserCard.prototype, "cardId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.cards, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], UserCard.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => card_entity_1.Card, card => card.userCards, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'cardId' }),
    __metadata("design:type", card_entity_1.Card)
], UserCard.prototype, "card", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => deck_entity_1.Deck, deck => deck.userCards),
    __metadata("design:type", Array)
], UserCard.prototype, "decks", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserCard.prototype, "createdAt", void 0);
exports.UserCard = UserCard = __decorate([
    (0, typeorm_1.Entity)('user_cards')
], UserCard);
//# sourceMappingURL=user-card.entity.js.map