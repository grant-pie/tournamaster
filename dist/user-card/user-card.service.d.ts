import { Repository } from 'typeorm';
import { UserCard } from './entities/user-card.entity';
import { User } from '../user/entities/user.entity';
import { CardService } from '../card/card.service';
export declare class UserCardService {
    private userCardRepository;
    private cardService;
    constructor(userCardRepository: Repository<UserCard>, cardService: CardService);
    findAllByUserId(userId: string): Promise<UserCard[]>;
    searchUserCards(userId: string, query: any): Promise<UserCard[]>;
    addCardToUser(currentUser: User, userId: string, multiverseId: string): Promise<UserCard>;
    removeCardFromUser(currentUser: User, cardId: string): Promise<void>;
}
