import { User } from '../../user/entities/user.entity';
import { UserCard } from '../../user-card/entities/user-card.entity';
export declare class Deck {
    id: string;
    name: string;
    description: string;
    userId: string;
    user: User;
    userCards: UserCard[];
    createdAt: Date;
    updatedAt: Date;
}
