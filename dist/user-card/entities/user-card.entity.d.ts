import { User } from '../../user/entities/user.entity';
import { Card } from '../../card/entities/card.entity';
import { Deck } from '../../deck/entities/deck.entity';
export declare class UserCard {
    id: string;
    userId: string;
    cardId: string;
    user: User;
    card: Card;
    decks: Deck[];
    createdAt: Date;
}
