import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { comparePasswd } from 'src/utils/bcrypt';
import { SignInDto } from 'src/utils/dtos/SignIn.dto';
import { JwtService } from '@nestjs/jwt';
import { Todo } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor (
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
        ) {}

    async signIn(credentials: SignInDto) {
        const user = await this.usersService.findOneByEmail(credentials.email);
        if (!user || !comparePasswd(credentials.password, user.password))
            throw new UnauthorizedException();
        const payload = {
            sub: user.id,
            email: user.email
        }
        return await this.jwtService.signAsync(payload)
    }
}
