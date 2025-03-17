// src/deck/deck.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckController } from './deck.controller';
import { DeckService } from './deck.service';
import { Deck } from './entities/deck.entity';
import { UserCard } from '../user-card/entities/user-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deck, UserCard])],
  controllers: [DeckController],
  providers: [DeckService],
  exports: [DeckService],
})
export class DeckModule {}