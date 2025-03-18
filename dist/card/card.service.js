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
exports.CardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const card_entity_1 = require("./entities/card.entity");
const axios_1 = require("axios");
let CardService = class CardService {
    cardRepository;
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }
    async findAll() {
        return this.cardRepository.find();
    }
    async findOne(id) {
        const card = await this.cardRepository.findOne({ where: { id } });
        if (!card) {
            throw new common_1.NotFoundException(`Card with ID ${id} not found`);
        }
        return card;
    }
    async findByMultiverseId(multiverseId) {
        const card = await this.cardRepository.findOne({ where: { multiverseId } });
        return card;
    }
    async createOrUpdate(multiverseId) {
        let card = await this.findByMultiverseId(multiverseId);
        if (card) {
            return card;
        }
        try {
            const response = await axios_1.default.get(`https://api.scryfall.com/cards/multiverse/${multiverseId}`);
            const cardData = response.data;
            card = new card_entity_1.Card();
            card.multiverseId = multiverseId;
            card.name = cardData.name;
            card.manaCost = cardData.mana_cost || '';
            card.convertedManaCost = cardData.cmc || 0;
            card.type = cardData.type_line;
            card.colors = cardData.colors || [];
            card.rarity = cardData.rarity;
            card.set = cardData.set;
            card.setName = cardData.set_name;
            card.text = cardData.oracle_text;
            card.artist = cardData.artist;
            card.power = cardData.power;
            card.toughness = cardData.toughness;
            card.imageUrl = cardData.image_uris?.normal || cardData.image_uris?.png || '';
            return this.cardRepository.save(card);
        }
        catch (error) {
            console.log(`Card with multiverse ID ${multiverseId} could not be found or fetched from Scryfall API`);
            throw new common_1.NotFoundException(`Card with multiverse ID ${multiverseId} could not be found or fetched from Scryfall API`);
        }
    }
    async search(query) {
        const queryBuilder = this.cardRepository.createQueryBuilder('card');
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
        return queryBuilder.getMany();
    }
};
exports.CardService = CardService;
exports.CardService = CardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(card_entity_1.Card)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CardService);
//# sourceMappingURL=card.service.js.map