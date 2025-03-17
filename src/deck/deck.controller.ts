// src/deck/deck.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeckService } from './deck.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../user/enums/role.enum';

@Controller('decks')
@UseGuards(AuthGuard('jwt'))
export class DeckController {
  constructor(private deckService: DeckService) {}

  @Get('user/:userId')
  async getUserDecks(@Req() req, @Param('userId') userId: string) {
    // If not admin and not requesting own decks, throw error
    if (req.user.role !== Role.ADMIN && req.user.id !== userId) {
      return { error: 'Access denied' };
    }
    
    const decks = await this.deckService.findAllByUserId(userId);
    return { decks };
  }

  @Get(':id')
  async getDeck(@Req() req, @Param('id') id: string) {
    const deck = await this.deckService.findOne(id);
    
    // Check if user has permission to view this deck
    if (req.user.role !== Role.ADMIN && req.user.id !== deck.userId) {
      return { error: 'Access denied' };
    }
    
    return { deck };
  }

  @Post()
  async createDeck(@Req() req, @Body() createDeckDto: CreateDeckDto) {
    const deck = await this.deckService.create(req.user, createDeckDto);
    return { deck };
  }

  @Put(':id')
  async updateDeck(
    @Req() req,
    @Param('id') id: string,
    @Body() updateDeckDto: UpdateDeckDto
  ) {
    const deck = await this.deckService.update(req.user, id, updateDeckDto);
    return { deck };
  }

  @Delete(':id')
  async removeDeck(@Req() req, @Param('id') id: string) {
    await this.deckService.delete(req.user, id);
    return { success: true };
  }

  @Post(':deckId/cards')
  async addCardToDeck(
    @Req() req,
    @Param('deckId') deckId: string,
    @Body() body: { multiverseId: string }
  ) {
    const deck = await this.deckService.addCardToDeck(
      req.user, 
      deckId, 
      body.multiverseId
    );
    return { deck };
  }

  @Delete(':deckId/cards/:cardId')
  async removeCardFromDeck(
    @Req() req,
    @Param('deckId') deckId: string,
    @Param('cardId') cardId: string
  ) {
    const deck = await this.deckService.removeCardFromDeck(req.user, deckId, cardId);
    return { deck };
  }
}