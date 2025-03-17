// src/user-card/user-card.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCard } from './entities/user-card.entity';
import { User } from '../user/entities/user.entity';
import { Role } from '../user/enums/role.enum';

@Injectable()
export class UserCardService {
  constructor(
    @InjectRepository(UserCard)
    private userCardRepository: Repository<UserCard>,
  ) {}

  async findAllByUserId(userId: string): Promise<UserCard[]> {
    return this.userCardRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async addCardToUser(currentUser: User, userId: string, multiverseId: string): Promise<UserCard> {
    // Only admins can add cards to any user
    // Regular users can only add cards to themselves (optional functionality)
    if (currentUser.role !== Role.ADMIN && currentUser.id !== userId) {
      throw new ForbiddenException('Only admins can add cards to other users');
    }

    const userCard = new UserCard();
    userCard.userId = userId;
    userCard.multiverseId = multiverseId;

    return this.userCardRepository.save(userCard);
  }

  async removeCardFromUser(currentUser: User, cardId: string): Promise<void> {
    const card = await this.userCardRepository.findOne({
      where: { id: cardId },
      relations: ['user'],
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    // Only admins or the card owner can remove the card
    if (currentUser.role !== Role.ADMIN && currentUser.id !== card.userId) {
      throw new ForbiddenException('You do not have permission to remove this card');
    }

    await this.userCardRepository.remove(card);
  }
}