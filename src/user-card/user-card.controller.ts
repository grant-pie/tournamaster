// src/user-card/user-card.controller.ts
import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserCardService } from './user-card.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../user/enums/role.enum';

@Controller('user-cards')
@UseGuards(AuthGuard('jwt'))
export class UserCardController {
  constructor(private userCardService: UserCardService) {}

  @Get(':userId')
  async getUserCards(@Req() req, @Param('userId') userId: string, @Query() query) {
    // If not admin and not requesting own cards, throw error
    if (req.user.role !== Role.ADMIN && req.user.id !== userId) {
      return { error: 'Access denied' };
    }
    
    // If there are search parameters, use search function
    let userCards;
    if (Object.keys(query).length > 0) {
      userCards = await this.userCardService.searchUserCards(userId, query);
    } else {
      userCards = await this.userCardService.findAllByUserId(userId);
    }
    
    // Format the response to include card details
    const cards = userCards.map(userCard => ({
      id: userCard.id,
      userId: userCard.userId,
      cardDetails: userCard.card,
      createdAt: userCard.createdAt
    }));
    
    return { cards };
  }

  @Post(':userId')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async addCardToUser(
    @Req() req,
    @Param('userId') userId: string,
    @Body() body: { multiverseId: string }
  ) {
    const userCard = await this.userCardService.addCardToUser(
      req.user,
      userId,
      body.multiverseId
    );
    
    return { 
      userCard: {
        id: userCard.id,
        userId: userCard.userId,
        cardId: userCard.cardId,
        createdAt: userCard.createdAt
      }
    };
  }

  @Delete(':cardId')
  async removeCard(@Req() req, @Param('cardId') cardId: string) {
    await this.userCardService.removeCardFromUser(req.user, cardId);
    return { success: true };
  }
}