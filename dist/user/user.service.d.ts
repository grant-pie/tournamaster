import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUsernameDto } from './dto/update-username.dto';
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
    updateUsername(userId: string, updateUsernameDto: UpdateUsernameDto): Promise<User>;
    findByUsername(username: string): Promise<User | null>;
}
