// src/user-card/user-card.controller.ts
import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
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
  async getUserCards(@Req() req, @Param('userId') userId: string) {
    // If not admin and not requesting own cards, throw error
    if (req.user.role !== Role.ADMIN && req.user.id !== userId) {
      return { error: 'Access denied' };
    }
    
    const cards = await this.userCardService.findAllByUserId(userId);
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
    const card = await this.userCardService.addCardToUser(
      req.user,
      userId,
      body.multiverseId
    );
    return { card };
  }

  @Delete(':cardId')
  async removeCard(@Req() req, @Param('cardId') cardId: string) {
    await this.userCardService.removeCardFromUser(req.user, cardId);
    return { success: true };
  }
}