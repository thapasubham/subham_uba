import chalk from 'chalk';

export class Logger{
    static Warn(message: string){
        console.log(chalk.yellow(message))
    }
    static Info(message: string){
        console.log(chalk.blue(message))
    }
    static Success(message: string){
        console.log(chalk.green(message))
    }
    static Error(message: string){
        console.log(chalk.red(message))
    }
}