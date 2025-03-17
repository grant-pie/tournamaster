import { UserService } from './user.service';
import { Role } from './enums/role.enum';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        picture: string;
        role: Role;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        picture: string;
        role: Role;
        createdAt: Date;
    }>;
}
