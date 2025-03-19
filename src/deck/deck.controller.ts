import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeckService } from './deck.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../user/enums/role.enum';
import { UserService } from '../user/user.service';
import { UserCardService } from '../user-card/user-card.service';

@Controller('decks')
@UseGuards(AuthGuard('jwt'))
export class DeckController {
  constructor(
    private deckService: DeckService,
    private userService: UserService,
    private userCardService: UserCardService,
  ) {}

  @Post(':deckId/user-cards/:userCardId')
  async addUserCardToDeck(
    @Req() req,
    @Param('deckId') deckId: string,
    @Param('userCardId') userCardId: string,
  ) {
  
    const userCard = await this.userCardService.findById(userCardId);
    
    if (!userCard) {
      
      throw new NotFoundException(`UserCard with id ${userCardId} not found`);
      
    }
    
    const deck = await this.deckService.addUserCardToDeck(
      req.user, 
      deckId, 
      userCardId
    );
    
    return { deck };
  }
  
  @Post('/user/:userId/:deckId/user-cards')
  async addUserCardToDeckForUser(
    @Req() req,
    @Param('userId') userId: string,
    @Param('deckId') deckId: string,
    @Body() body: { userCardId: string }
  ) {
    console.log(`deck controller - attempting to add card with id: ${body.userCardId} to deck with id: ${deckId} for user with id: ${userId}`);
    if (req.user.role !== Role.ADMIN) {
      console.log('access denied');
      return { error: 'Access denied' };
    }
    console.log('access granted');
    const user = await this.userService.findById(userId);
    
    if (!user) {
      console.log('user not found');
      throw new NotFoundException(`User with user id ${userId} not found`);
    }
    console.log('user found granted');
    const userCard = await this.userCardService.findById(body.userCardId);
    
    if (!userCard) {
      console.log('card not found');
      throw new NotFoundException(`UserCard with id ${body.userCardId} not found`);
    }
    console.log('card found');
    // Verify that the user card belongs to the user
    if (userCard.userId !== userId) {
      console.log('card does not belong to user');
      return { error: 'UserCard does not belong to this user' };
    }
    console.log('card belongs to user');
    const deck = await this.deckService.addUserCardToDeck(
      user, 
      deckId, 
      body.userCardId
    );
    console.log('card added to deck');
    console.log(deck);
    return { deck };
  }

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

  @Post('user/:userId')
  async createDeckForUser(@Req() req, @Body() createDeckDto: CreateDeckDto, @Param('userId') userId: string) {
    if (req.user.role !== Role.ADMIN) {
      return { error: 'Access denied' };
    }

    const user = await this.userService.findById(userId);
    
    if (!user) {
      throw new NotFoundException(`User with user id ${userId} not found`);
    }
    const deck = await this.deckService.create(user, createDeckDto);
   
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


  @Delete(':deckId/user-cards/:userCardId')
  async removeUserCardFromDeck(
    @Req() req,
    @Param('deckId') deckId: string,
    @Param('userCardId') userCardId: string
  ) {
    const deck = await this.deckService.removeUserCardFromDeck(req.user, deckId, userCardId);
    return { deck };
  }
}