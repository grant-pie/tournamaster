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
exports.DeckService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const deck_entity_1 = require("./entities/deck.entity");
const user_card_entity_1 = require("../user-card/entities/user-card.entity");
const role_enum_1 = require("../user/enums/role.enum");
let DeckService = class DeckService {
    deckRepository;
    userCardRepository;
    constructor(deckRepository, userCardRepository) {
        this.deckRepository = deckRepository;
        this.userCardRepository = userCardRepository;
    }
    async findAllByUserId(userId) {
        return this.deckRepository.find({
            where: { userId },
            relations: ['userCards', 'userCards.card'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const deck = await this.deckRepository.findOne({
            where: { id },
            relations: ['userCards', 'userCards.card'],
        });
        if (!deck) {
            throw new common_1.NotFoundException(`Deck with ID ${id} not found`);
        }
        return deck;
    }
    async create(user, createDeckDto) {
        const deck = new deck_entity_1.Deck();
        deck.name = createDeckDto.name;
        deck.description = createDeckDto.description || '';
        deck.userId = user.id;
        deck.userCards = [];
        return this.deckRepository.save(deck);
    }
    async update(currentUser, deckId, updateDeckDto) {
        const deck = await this.findOne(deckId);
        if (currentUser.role !== role_enum_1.Role.ADMIN && currentUser.id !== deck.userId) {
            throw new common_1.ForbiddenException('You do not have permission to update this deck');
        }
        if (updateDeckDto.name) {
            deck.name = updateDeckDto.name;
        }
        if (updateDeckDto.description !== undefined) {
            deck.description = updateDeckDto.description;
        }
        return this.deckRepository.save(deck);
    }
    async delete(currentUser, deckId) {
        const deck = await this.findOne(deckId);
        if (currentUser.role !== role_enum_1.Role.ADMIN && currentUser.id !== deck.userId) {
            throw new common_1.ForbiddenException('You do not have permission to delete this deck');
        }
        await this.deckRepository.remove(deck);
    }
    async addUserCardToDeck(currentUser, deckId, userCardId) {
        const deck = await this.findOne(deckId);
        if (currentUser.role !== role_enum_1.Role.ADMIN && currentUser.id !== deck.userId) {
            throw new common_1.ForbiddenException('You do not have permission to modify this deck');
        }
        const userCard = await this.userCardRepository.findOne({
            where: { id: userCardId }
        });
        if (!userCard) {
            throw new common_1.NotFoundException(`UserCard with ID ${userCardId} not found`);
        }
        if (userCard.userId !== currentUser.id && currentUser.role !== role_enum_1.Role.ADMIN) {
            throw new common_1.ForbiddenException('You do not have permission to add this card');
        }
        const isUserCardInDeck = deck.userCards.some(uc => uc.id === userCardId);
        if (!isUserCardInDeck) {
            if (!deck.userCards) {
                deck.userCards = [];
            }
            deck.userCards.push(userCard);
            await this.deckRepository.save(deck);
        }
        return deck;
    }
    async removeUserCardFromDeck(currentUser, deckId, userCardId) {
        const deck = await this.findOne(deckId);
        if (currentUser.role !== role_enum_1.Role.ADMIN && currentUser.id !== deck.userId) {
            throw new common_1.ForbiddenException('You do not have permission to modify this deck');
        }
        deck.userCards = deck.userCards.filter(userCard => userCard.id !== userCardId);
        return this.deckRepository.save(deck);
    }
};
exports.DeckService = DeckService;
exports.DeckService = DeckService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(deck_entity_1.Deck)),
    __param(1, (0, typeorm_1.InjectRepository)(user_card_entity_1.UserCard)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DeckService);
//# sourceMappingURL=deck.service.js.map