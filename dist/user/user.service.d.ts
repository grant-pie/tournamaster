import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findOrCreateUser(userDetails: {
        googleId: string;
        email?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        picture?: string | null;
    }): Promise<User>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
}
