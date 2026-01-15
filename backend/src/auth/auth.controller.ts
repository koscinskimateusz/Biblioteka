/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

interface LoginRequest {
    username: string;
    password: string;
}

interface RegisterRequest {
    username: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: LoginRequest) {
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) {
            throw new UnauthorizedException('B³êdne dane logowania');
        }
        return this.authService.login(user);
    }

    // Tymczasowy endpoint do stworzenia pierwszego admina
    @Post('register')
    async register(@Body() body: RegisterRequest) {
        return this.authService.register(body.username, body.password);
    }
}