import { Role } from '../enums/role.enum';
import { UserCard } from '../../user-card/entities/user-card.entity';
import { Deck } from '../../deck/entities/deck.entity';
export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    googleId: string;
    username: string;
    role: Role;
    cards: UserCard[];
    decks: Deck[];
    createdAt: Date;
    updatedAt: Date;
}
