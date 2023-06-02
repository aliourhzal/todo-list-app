import { Injectable } from '@nestjs/common';
import CreateAccountDto from 'src/utils/dtos/CreateAccount.dto';
import { PrismaClient, Todo, User } from '@prisma/client'
import { encodePasswd } from 'src/utils/bcrypt';
import { TodoDto } from 'src/utils/dtos/Todo.dto';


@Injectable()
export class UsersService {
    private prisma = new PrismaClient()

    async createUser(user: CreateAccountDto) {
        let createdUser: any;
        try {
            createdUser = await this.prisma.user.create({
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: encodePasswd(user.password)
                }
            })
        } catch(e) {
            return (null);
        }
        const {password, ...ret} = createdUser;
        return (ret);
    }

    async findOneByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async findOneById(id: string) {
        return await this.prisma.user.findUnique({
            where: {
                id
            },
            include: {
                todos: true
            }
        })
    }

    async retrieveTodos(id: string): Promise<Todo[]> {
        const user = await this.findOneById(id);
        return (user.todos)
    }

    async setTodos(newTodo: TodoDto,id: string): Promise<Todo> {
        const todo = await this.prisma.todo.create({
            data: {
                content: newTodo.content,
                completed: newTodo.completed,
                userId: id
            }
        })
        return (todo);
    }

    async updateTodos(toUpdate: string, id: string): Promise<Todo> {
        const target = await this.prisma.todo.findUnique({
            where: {
                id: toUpdate
            }
        })
        if (!target)
            return undefined;
        await this.prisma.todo.update({
            where: {
                id: target.id
            },
            data: {
                completed: !target.completed
            }
        })
        return target;
    }

    async deleteTodo(toDelete: string, id: string) {
        const userTarget = await this.findOneById(id);
        const todoTarget = userTarget.todos.find((todo) => todo.id === toDelete);
        if (todoTarget) {
            await this.prisma.todo.delete({
                where: {
                    id: toDelete
                }
            })
        }
    }

    async deleteCompleted(id: string) {
        const userTarget = await this.findOneById(id);
        await this.prisma.todo.deleteMany({
            where: {
                userId: userTarget.id,
                completed: true
            }
        })
    }
}
