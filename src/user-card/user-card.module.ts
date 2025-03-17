// src/user-card/user-card.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCardController } from './user-card.controller';
import { UserCardService } from './user-card.service';
import { UserCard } from './entities/user-card.entity';
import { CardModule } from '../card/card.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCard]),
    CardModule,
  ],
  controllers: [UserCardController],
  providers: [UserCardService],
  exports: [UserCardService],
})
export class UserCardModule {}