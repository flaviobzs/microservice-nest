// instalação npm i class-validator
import { IsNotEmpty, IsEmail } from 'class-validator'

// validação realizada no dto 
export class CriarJogadorDto {

    @IsNotEmpty()
    readonly telefoneCelular: string;
    
    @IsEmail()
    readonly email: string;
    
    @IsNotEmpty()
    readonly nome: string;
}