// comportamento para falar com o DB 
import { Document } from 'mongoose'

// forma com todos os dados do recurso 
export interface Jogador extends Document {
    // _id gerado automaticamente  
    readonly telefoneCelular: string;
    readonly email: string;
    nome: string;  
    ranking: string;
    posicaoRanking: number;
    urlFotoJogador: string;
}