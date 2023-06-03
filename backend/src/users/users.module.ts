import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthGuard } from 'src/auth/auth.authguard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
