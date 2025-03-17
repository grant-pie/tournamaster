// src/deck/deck.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deck } from './entities/deck.entity';
import { User } from '../user/entities/user.entity';
import { Card } from '../card/entities/card.entity';
import { CardService } from '../card/card.service';
import { Role } from '../user/enums/role.enum';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(Deck)
    private deckRepository: Repository<Deck>,
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private cardService: CardService,
  ) {}

  async findAllByUserId(userId: string): Promise<Deck[]> {
    return this.deckRepository.find({
      where: { userId },
      relations: ['cards'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Deck> {
    const deck = await this.deckRepository.findOne({
      where: { id },
      relations: ['cards'],
    });
    
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    }
    
    return deck;
  }

  async create(user: User, createDeckDto: { name: string; description?: string }): Promise<Deck> {
    const deck = new Deck();
    deck.name = createDeckDto.name;
    deck.description = createDeckDto.description || '';
    deck.userId = user.id;
    
    return this.deckRepository.save(deck);
  }

  async update(
    currentUser: User,
    deckId: string,
    updateDeckDto: { name?: string; description?: string },
  ): Promise<Deck> {
    const deck = await this.findOne(deckId);
    
    // Check if user owns deck or is admin
    if (currentUser.role !== Role.ADMIN && currentUser.id !== deck.userId) {
      throw new ForbiddenException('You do not have permission to update this deck');
    }
    
    if (updateDeckDto.name) {
      deck.name = updateDeckDto.name;
    }
    
    if (updateDeckDto.description !== undefined) {
      deck.description = updateDeckDto.description;
    }
    
    return this.deckRepository.save(deck);
  }

  async delete(currentUser: User, deckId: string): Promise<void> {
    const deck = await this.findOne(deckId);
    
    // Check if user owns deck or is admin
    if (currentUser.role !== Role.ADMIN && currentUser.id !== deck.userId) {
      throw new ForbiddenException('You do not have permission to delete this deck');
    }
    
    await this.deckRepository.remove(deck);
  }

  async addCardToDeck(
    currentUser: User,
    deckId: string,
    multiverseId: string,
  ): Promise<Deck> {
    const deck = await this.findOne(deckId);
    
    // Check if user owns deck or is admin
    if (currentUser.role !== Role.ADMIN && currentUser.id !== deck.userId) {
      throw new ForbiddenException('You do not have permission to modify this deck');
    }
    
    // Get or create card
    const card = await this.cardService.createOrUpdate(multiverseId);
    
    // Check if card is already in deck
    const isCardInDeck = deck.cards.some(c => c.id === card.id);
    if (!isCardInDeck) {
      deck.cards.push(card);
      await this.deckRepository.save(deck);
    }
    
    return deck;
  }

  async removeCardFromDeck(
    currentUser: User,
    deckId: string,
    cardId: string,
  ): Promise<Deck> {
    const deck = await this.findOne(deckId);
    
    // Check if user owns deck or is admin
    if (currentUser.role !== Role.ADMIN && currentUser.id !== deck.userId) {
      throw new ForbiddenException('You do not have permission to modify this deck');
    }
    
    // Filter out the card to remove
    deck.cards = deck.cards.filter(card => card.id !== cardId);
    
    return this.deckRepository.save(deck);
  }
}