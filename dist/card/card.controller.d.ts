import { CardService } from './card.service';
import { Card } from './entities/card.entity';
export declare class CardController {
    private readonly cardService;
    constructor(cardService: CardService);
    findAll(query: any): Promise<Card[]>;
    findOne(id: string): Promise<Card>;
    findByscryfallId(scryfallId: string): Promise<Card>;
}
