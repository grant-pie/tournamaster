import { DeckService } from './deck.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { UserService } from '../user/user.service';
import { UserCardService } from '../user-card/user-card.service';
export declare class DeckController {
    private deckService;
    private userService;
    private userCardService;
    constructor(deckService: DeckService, userService: UserService, userCardService: UserCardService);
    addUserCardToDeck(req: any, deckId: string, userCardId: string): Promise<{
        deck: import("./entities/deck.entity").Deck;
    }>;
    addUserCardToDeckForUser(req: any, userId: string, deckId: string, body: {
        userCardId: string;
    }): Promise<{
        error: string;
        deck?: undefined;
    } | {
        deck: import("./entities/deck.entity").Deck;
        error?: undefined;
    }>;
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
    createDeckForUser(req: any, createDeckDto: CreateDeckDto, userId: string): Promise<{
        error: string;
        deck?: undefined;
    } | {
        deck: import("./entities/deck.entity").Deck;
        error?: undefined;
    }>;
    updateDeck(req: any, id: string, updateDeckDto: UpdateDeckDto): Promise<{
        deck: import("./entities/deck.entity").Deck;
    }>;
    removeDeck(req: any, id: string): Promise<{
        success: boolean;
    }>;
    removeUserCardFromDeck(req: any, deckId: string, userCardId: string): Promise<{
        deck: import("./entities/deck.entity").Deck;
    }>;
}
