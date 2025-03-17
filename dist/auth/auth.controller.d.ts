import { Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(): void;
    googleAuthCallback(req: any, res: Response): Promise<void>;
    getProfile(req: any): any;
}
