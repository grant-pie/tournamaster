// src/deck/entities/deck.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { UserCard } from '../../user-card/entities/user-card.entity';

@Entity('decks')
export class Deck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, default: '' })
  description: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.decks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => UserCard)
  @JoinTable({
    name: 'deck_cards',
    joinColumn: { name: 'deckId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userCardId', referencedColumnName: 'id' }
  })
  cards: UserCard[];

  @CreateDateColumn()
  createdAt: Date;
}