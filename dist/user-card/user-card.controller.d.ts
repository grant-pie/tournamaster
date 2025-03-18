import { UserCardService } from './user-card.service';
import { UserService } from '../user/user.service';
export declare class UserCardController {
    private userCardService;
    private userService;
    constructor(userCardService: UserCardService, userService: UserService);
    getCardsByUsername(username: string, query: any): Promise<{
        cards: any;
    }>;
    getUserCards(req: any, userId: string, query: any): Promise<{
        error: string;
        cards?: undefined;
    } | {
        cards: any;
        error?: undefined;
    }>;
    addCardToUser(req: any, userId: string, body: {
        multiverseId: string;
    }): Promise<{
        userCard: {
            id: string;
            userId: string;
            cardId: string;
            createdAt: Date;
        };
    }>;
    removeCard(req: any, cardId: string): Promise<{
        success: boolean;
    }>;
}
