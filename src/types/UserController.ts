import {user } from './user.type.js'
export abstract class User{
    abstract CreateUser(user: user):Promise<boolean>;
    abstract DeleteUser(query: number|string):Promise<boolean>;
    abstract ReadUser(): Promise<boolean>;
    abstract Update(user: user): Promise<boolean>;
}
