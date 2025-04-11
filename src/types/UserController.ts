import {user } from './user.type.js'
export abstract class User{
    abstract CreateUser(user: user):void;
    abstract DeleteUser(user:user):void;
    abstract ReadUser(): void;
    abstract Update(oldUser :user, user: user): void;
}
