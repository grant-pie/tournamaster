import { User } from '../../user/entities/user.entity';
import { Card } from '../../card/entities/card.entity';
export declare class Deck {
    id: string;
    name: string;
    description: string;
    userId: string;
    user: User;
    cards: Card[];
    createdAt: Date;
    updatedAt: Date;
}
