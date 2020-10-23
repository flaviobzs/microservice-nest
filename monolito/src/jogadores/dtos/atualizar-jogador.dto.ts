import { IsNotEmpty } from 'class-validator'

// validação no dto 
export class AtualizarJogadorDto {

    @IsNotEmpty()
    readonly telefoneCelular: string;
    
    @IsNotEmpty()
    readonly nome: string;
}