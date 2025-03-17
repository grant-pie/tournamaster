import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCardService } from './user-card.service';
import { UserCardController } from './user-card.controller';
import { UserCard } from './entities/user-card.entity';
import { User } from '../user/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserCard, User]),
  ],
  controllers: [UserCardController],
  providers: [UserCardService],
  exports: [UserCardService],
})
export class UserCardModule {}