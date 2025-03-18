import { UserService } from './user.service';
import { Role } from './enums/role.enum';
import { UpdateUsernameDto } from './dto/update-username.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        picture: string;
        username: string;
        role: Role;
        createdAt: Date;
    }[]>;
    getAllUsernames(): Promise<{
        id: string;
        username: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        picture: string;
        username: string;
        role: Role;
        createdAt: Date;
    }>;
    findByUsername(username: string): Promise<{
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        picture: string;
    }>;
    updateUsername(req: any, updateUsernameDto: UpdateUsernameDto): Promise<{
        id: string;
        username: string;
        message: string;
    }>;
    updateUsernameByAdmin(id: string, updateUsernameDto: UpdateUsernameDto, req: any): Promise<{
        id: string;
        username: string;
        message: string;
    }>;
}
