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
exports.UserCardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_card_entity_1 = require("./entities/user-card.entity");
const role_enum_1 = require("../user/enums/role.enum");
const card_service_1 = require("../card/card.service");
let UserCardService = class UserCardService {
    userCardRepository;
    cardService;
    constructor(userCardRepository, cardService) {
        this.userCardRepository = userCardRepository;
        this.cardService = cardService;
    }
    async findAllByUserId(userId) {
        return this.userCardRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
            relations: ['card'],
        });
    }
    async searchUserCards(userId, query) {
        const queryBuilder = this.userCardRepository.createQueryBuilder('userCard')
            .leftJoinAndSelect('userCard.card', 'card')
            .where('userCard.userId = :userId', { userId });
        if (query.createdAt) {
            const dateStr = query.createdAt;
            if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                const startDate = new Date(`${dateStr}T00:00:00.000Z`);
                const endDate = new Date(`${dateStr}T23:59:59.999Z`);
                queryBuilder.andWhere('userCard.createdAt >= :startDate', { startDate })
                    .andWhere('userCard.createdAt <= :endDate', { endDate });
            }
        }
        if (query.createdAtStart && query.createdAtEnd) {
            const startDateStr = query.createdAtStart;
            const endDateStr = query.createdAtEnd;
            if (/^\d{4}-\d{2}-\d{2}$/.test(startDateStr) && /^\d{4}-\d{2}-\d{2}$/.test(endDateStr)) {
                const startDate = new Date(`${startDateStr}T00:00:00.000Z`);
                const endDate = new Date(`${endDateStr}T23:59:59.999Z`);
                queryBuilder.andWhere('userCard.createdAt >= :startDate', { startDate })
                    .andWhere('userCard.createdAt <= :endDate', { endDate });
            }
        }
        if (query.name) {
            queryBuilder.andWhere('card.name LIKE :name', { name: `%${query.name}%` });
        }
        if (query.type) {
            queryBuilder.andWhere('card.type LIKE :type', { type: `%${query.type}%` });
        }
        if (query.colors) {
            const colors = Array.isArray(query.colors) ? query.colors : [query.colors];
            colors.forEach((color, index) => {
                queryBuilder.andWhere(`card.colors LIKE :color${index}`, { [`color${index}`]: `%${color}%` });
            });
        }
        if (query.rarity) {
            queryBuilder.andWhere('card.rarity = :rarity', { rarity: query.rarity });
        }
        if (query.set) {
            queryBuilder.andWhere('card.set = :set', { set: query.set });
        }
        if (query.manaCost) {
            queryBuilder.andWhere('card.manaCost LIKE :manaCost', { manaCost: `%${query.manaCost}%` });
        }
        if (query.artist) {
            queryBuilder.andWhere('card.artist LIKE :artist', { artist: `%${query.artist}%` });
        }
        if (query.convertedManaCost) {
            queryBuilder.andWhere('card.convertedManaCost = :cmc', { cmc: Number(query.convertedManaCost) });
        }
        if (query.minPower) {
            queryBuilder.andWhere('CAST(card.power AS DECIMAL) >= :minPower', { minPower: Number(query.minPower) });
        }
        if (query.minToughness) {
            queryBuilder.andWhere('CAST(card.toughness AS DECIMAL) >= :minToughness', { minToughness: Number(query.minToughness) });
        }
        if (query.text) {
            queryBuilder.andWhere('card.text LIKE :text', { text: `%${query.text}%` });
        }
        if (query.orderBy) {
            const direction = query.orderDirection === 'DESC' ? 'DESC' : 'ASC';
            queryBuilder.orderBy(`card.${query.orderBy}`, direction);
        }
        else {
            queryBuilder.orderBy('userCard.createdAt', 'DESC');
        }
        return queryBuilder.getMany();
    }
    async addCardToUser(currentUser, userId, multiverseId) {
        if (currentUser.role !== role_enum_1.Role.ADMIN && currentUser.id !== userId) {
            throw new common_1.ForbiddenException('Only admins can add cards to other users');
        }
        const card = await this.cardService.createOrUpdate(multiverseId);
        const userCard = new user_card_entity_1.UserCard();
        userCard.userId = userId;
        userCard.cardId = card.id;
        return this.userCardRepository.save(userCard);
    }
    async removeCardFromUser(currentUser, cardId) {
        const card = await this.userCardRepository.findOne({
            where: { id: cardId },
            relations: ['user', 'card'],
        });
        if (!card) {
            throw new common_1.NotFoundException('Card not found');
        }
        if (currentUser.role !== role_enum_1.Role.ADMIN && currentUser.id !== card.userId) {
            throw new common_1.ForbiddenException('You do not have permission to remove this card');
        }
        await this.userCardRepository.remove(card);
    }
};
exports.UserCardService = UserCardService;
exports.UserCardService = UserCardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_card_entity_1.UserCard)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        card_service_1.CardService])
], UserCardService);
//# sourceMappingURL=user-card.service.js.map