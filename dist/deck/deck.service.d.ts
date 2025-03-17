import { Repository } from 'typeorm';
import { Deck } from './entities/deck.entity';
import { User } from '../user/entities/user.entity';
import { Card } from '../card/entities/card.entity';
import { CardService } from '../card/card.service';
export declare class DeckService {
    private deckRepository;
    private cardRepository;
    private cardService;
    constructor(deckRepository: Repository<Deck>, cardRepository: Repository<Card>, cardService: CardService);
    findAllByUserId(userId: string): Promise<Deck[]>;
    findOne(id: string): Promise<Deck>;
    create(user: User, createDeckDto: {
        name: string;
        description?: string;
    }): Promise<Deck>;
    update(currentUser: User, deckId: string, updateDeckDto: {
        name?: string;
        description?: string;
    }): Promise<Deck>;
    delete(currentUser: User, deckId: string): Promise<void>;
    addCardToDeck(currentUser: User, deckId: string, multiverseId: string): Promise<Deck>;
    removeCardFromDeck(currentUser: User, deckId: string, cardId: string): Promise<Deck>;
}
