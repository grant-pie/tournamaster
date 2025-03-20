import { Repository } from 'typeorm';
import { UserCard } from './entities/user-card.entity';
import { User } from '../user/entities/user.entity';
import { CardService } from '../card/card.service';
export interface PaginationParams {
    page?: number;
    limit?: number;
}
export interface PaginatedResult<T> {
    items: T[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}
export declare class UserCardService {
    private userCardRepository;
    private cardService;
    constructor(userCardRepository: Repository<UserCard>, cardService: CardService);
    findAllByUserId(userId: string, paginationParams?: PaginationParams): Promise<PaginatedResult<UserCard>>;
    findById(id: string): Promise<UserCard | null>;
    searchUserCards(userId: string, query: any, paginationParams?: PaginationParams): Promise<PaginatedResult<UserCard>>;
    addCardToUser(currentUser: User, userId: string, scryfallId: string): Promise<UserCard>;
    removeCardFromUser(currentUser: User, cardId: string): Promise<void>;
}
