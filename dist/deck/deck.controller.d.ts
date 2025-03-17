import { DeckService } from './deck.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
export declare class DeckController {
    private deckService;
    constructor(deckService: DeckService);
    getUserDecks(req: any, userId: string): Promise<{
        error: string;
        decks?: undefined;
    } | {
        decks: import("./entities/deck.entity").Deck[];
        error?: undefined;
    }>;
    getDeck(req: any, id: string): Promise<{
        error: string;
        deck?: undefined;
    } | {
        deck: import("./entities/deck.entity").Deck;
        error?: undefined;
    }>;
    createDeck(req: any, createDeckDto: CreateDeckDto): Promise<{
        deck: import("./entities/deck.entity").Deck;
    }>;
    updateDeck(req: any, id: string, updateDeckDto: UpdateDeckDto): Promise<{
        deck: import("./entities/deck.entity").Deck;
    }>;
    removeDeck(req: any, id: string): Promise<{
        success: boolean;
    }>;
    addCardToDeck(req: any, deckId: string, body: {
        multiverseId: string;
    }): Promise<{
        deck: import("./entities/deck.entity").Deck;
    }>;
    removeCardFromDeck(req: any, deckId: string, cardId: string): Promise<{
        deck: import("./entities/deck.entity").Deck;
    }>;
}
