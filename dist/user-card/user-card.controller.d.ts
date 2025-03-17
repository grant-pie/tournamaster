import { UserCardService } from './user-card.service';
export declare class UserCardController {
    private userCardService;
    constructor(userCardService: UserCardService);
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
