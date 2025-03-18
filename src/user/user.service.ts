// src/user/user.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';
import { UpdateUsernameDto } from './dto/update-username.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOrCreateUser(userDetails: {
    googleId: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    picture?: string | null;
  }): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { googleId: userDetails.googleId },
    });

    if (existingUser) {
      return existingUser;
    }

    // Create a new user with the provided details
    const newUser = new User();
    newUser.googleId = userDetails.googleId;
    newUser.email = userDetails.email || '';
    newUser.firstName = userDetails.firstName || '';
    newUser.lastName = userDetails.lastName || '';
    newUser.picture = userDetails.picture || '';
    newUser.role = Role.USER; // Set default role to USER
    
    return this.userRepository.save(newUser);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUsername(userId: string, updateUsernameDto: UpdateUsernameDto): Promise<User> {
    // Check if username is already taken
    const existingUserWithUsername = await this.userRepository.findOne({
      where: { username: updateUsernameDto.username }
    });

    if (existingUserWithUsername && existingUserWithUsername.id !== userId) {
      throw new ConflictException('Username is already taken');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.username = updateUsernameDto.username;
    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }
}