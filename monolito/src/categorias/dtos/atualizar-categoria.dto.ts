import { IsString, IsOptional, IsArray, ArrayMinSize } from "class-validator";
import { Evento } from "../interfaces/categoria.interface";


export class AtualizarCategoriaDto {

    @IsString()
    @IsOptional()
    descricao: string;

    @IsArray()
    // se existe pelo menos um evento 
    @ArrayMinSize(1)
    eventos: Array<Evento>

}