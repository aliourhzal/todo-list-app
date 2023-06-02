import { Body, Controller, Post, Req, UseGuards, Get, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/utils/dtos/SignIn.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}

    @Post('login')
    async signIn(@Body() credentials: SignInDto, @Res() res: Response) {
        const accessToken = await this.authService.signIn(credentials);
        res.cookie('accessToken', accessToken, {
            httpOnly: true
        })
        res.status(200);
        res.end();
    }
}
