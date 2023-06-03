import { BadRequestException, Body, Controller, Delete, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateAccountDto from 'src/utils/dtos/CreateAccount.dto';
import { Public } from 'src/utils/public.metadata';
import { TodoDto } from '../utils/dtos/Todo.dto';
import { Todo } from '@prisma/client';

@Controller('users')
export class UsersController {

    constructor (private readonly usersService: UsersService){}

    @Public()
    @Post('create')
    async register(@Body() createAccount: CreateAccountDto) {
        return await this.usersService.createUser(createAccount);
    }

    @Get('todos')
    async getTodos(@Req() request) {
        return await this.usersService.retrieveTodos(request.user.sub);
    }

    @Post('todos')
    async addTodo(@Body() newTodo: TodoDto, @Req() request): Promise<Todo> {
        return await this.usersService.setTodos(newTodo, request.user.sub);
    }

    @Put('todos')
    async updateTodo(@Body('id') id: any, @Req() request) {
        if (id)
            return await this.usersService.updateTodos(id.id, request.user.sub);
        else
            throw new BadRequestException();
    }

    @Delete('todos/one')
    async deleteTodo(@Body('id') id: string, @Req() request) {
        if (id)
            await this.usersService.deleteTodo(id, request.user.sub);
        else
            throw new BadRequestException();
    }

    @Delete('todos/completed')
    async deleteCompleted(@Body('id') id: string, @Req() request) {
        if (id)
            await this.usersService.deleteCompleted(request.user.sub);
        else
            throw new BadRequestException();
    }
}
