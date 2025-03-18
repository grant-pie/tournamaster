import { Repository } from 'typeorm';
import { Deck } from './entities/deck.entity';
import { User } from '../user/entities/user.entity';
import { UserCard } from '../user-card/entities/user-card.entity';
export declare class DeckService {
    private deckRepository;
    private userCardRepository;
    constructor(deckRepository: Repository<Deck>, userCardRepository: Repository<UserCard>);
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
    addUserCardToDeck(currentUser: User, deckId: string, userCardId: string): Promise<Deck>;
    removeUserCardFromDeck(currentUser: User, deckId: string, userCardId: string): Promise<Deck>;
}
