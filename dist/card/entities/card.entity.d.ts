import { UserCard } from '../../user-card/entities/user-card.entity';
export declare class Card {
    id: string;
    multiverseId: string;
    name: string;
    manaCost: string;
    convertedManaCost: number;
    type: string;
    colors: string[];
    rarity: string;
    set: string;
    setName: string;
    text: string;
    artist: string;
    power: string;
    toughness: string;
    imageUrl: string;
    userCards: UserCard[];
    createdAt: Date;
    updatedAt: Date;
}
