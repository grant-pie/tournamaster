// src/deck/deck.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deck } from './entities/deck.entity';
import { UserCard } from '../user-card/entities/user-card.entity';
import { User } from '../user/entities/user.entity';
import { Role } from '../user/enums/role.enum';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(Deck)
    private deckRepository: Repository<Deck>,
    @InjectRepository(UserCard)
    private userCardRepository: Repository<UserCard>,
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
      throw new NotFoundException('Deck not found');
    }

    return deck;
  }

  async create(currentUser: User, createDeckDto: CreateDeckDto): Promise<Deck> {
    const deck = new Deck();
    deck.name = createDeckDto.name;
    deck.description = createDeckDto.description ?? '';
    deck.userId = currentUser.id;
    deck.cards = [];

    return this.deckRepository.save(deck);
  }

  async update(currentUser: User, id: string, updateDeckDto: UpdateDeckDto): Promise<Deck> {
    const deck = await this.findOne(id);

    if (currentUser.role !== Role.ADMIN && currentUser.id !== deck.userId) {
      throw new ForbiddenException('You do not have permission to update this deck');
    }

    if (updateDeckDto.name) deck.name = updateDeckDto.name;
    if (updateDeckDto.description !== undefined) deck.description = updateDeckDto.description;

    return this.deckRepository.save(deck);
  }

  async remove(currentUser: User, id: string): Promise<void> {
    const deck = await this.findOne(id);

    if (currentUser.role !== Role.ADMIN && currentUser.id !== deck.userId) {
      throw new ForbiddenException('You do not have permission to delete this deck');
    }

    await this.deckRepository.remove(deck);
  }

  async addCardToDeck(currentUser: User, deckId: string, cardId: string): Promise<Deck> {
    const deck = await this.findOne(deckId);
    
    if (currentUser.role !== Role.ADMIN && currentUser.id !== deck.userId) {
      throw new ForbiddenException('You do not have permission to modify this deck');
    }

    const card = await this.userCardRepository.findOne({
      where: { id: cardId }
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    // Check if the card belongs to the user
    if (card.userId !== deck.userId) {
      throw new ForbiddenException('You can only add cards you own to your deck');
    }

    // Check if card is already in the deck
    const isCardInDeck = deck.cards.some(c => c.id === cardId);
    if (!isCardInDeck) {
      deck.cards.push(card);
      await this.deckRepository.save(deck);
    }

    return deck;
  }

  async removeCardFromDeck(currentUser: User, deckId: string, cardId: string): Promise<Deck> {
    const deck = await this.findOne(deckId);
    
    if (currentUser.role !== Role.ADMIN && currentUser.id !== deck.userId) {
      throw new ForbiddenException('You do not have permission to modify this deck');
    }

    deck.cards = deck.cards.filter(card => card.id !== cardId);
    return this.deckRepository.save(deck);
  }
}