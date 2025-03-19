import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
export declare class CardService {
    private cardRepository;
    constructor(cardRepository: Repository<Card>);
    findAll(): Promise<Card[]>;
    findOne(id: string): Promise<Card>;
    findByScryfallId(scryfallId: string): Promise<Card | null>;
    createOrUpdate(scryfallId: string): Promise<Card>;
    search(query: any): Promise<Card[]>;
}
