import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    login(user: User): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            picture: string;
        };
    }>;
}
