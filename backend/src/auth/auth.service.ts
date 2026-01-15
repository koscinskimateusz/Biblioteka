/* eslint-disable prettier/prettier */
import { Injectable} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface AuthUser {
    id: string;
    username: string;
}

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<Omit<AuthUser, 'password'> | null> {
        const user = await this.usersService.findOne(username);
        if (user && (await bcrypt.compare(pass, user.password))) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result as AuthUser;
        }
        return null;
    }

    login(user: AuthUser) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(username: string, pass: string) {
        const hashedPassword = await bcrypt.hash(pass, 10);
        return this.usersService.create({ username, password: hashedPassword });
    }
}