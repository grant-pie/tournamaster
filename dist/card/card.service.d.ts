import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
export declare class CardService {
    private cardRepository;
    constructor(cardRepository: Repository<Card>);
    findAll(): Promise<Card[]>;
    findOne(id: string): Promise<Card>;
    findByMultiverseId(multiverseId: string): Promise<Card | null>;
    createOrUpdate(multiverseId: string): Promise<Card>;
    search(query: any): Promise<Card[]>;
}
