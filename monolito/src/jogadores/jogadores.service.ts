import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// torna o service um provide 
@Injectable()
export class JogadoresService {

    // private jogadores: Jogador[] = [];

    // injetar uma instancia do repository 
    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

    private readonly logger = new Logger(JogadoresService.name)
    

    async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {

        const { email } = criaJogadorDto

        // const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (jogadorEncontrado) {
            throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado`)
        } 
            
        // salvar em memoria dando um push no array 
        const jogadorCriado = new this.jogadorModel(criaJogadorDto)
        return await jogadorCriado.save()

        // só existia um metodo para criar ou atualizar (dados em memoria)
        // if (jogadorEncontrado) {
        //     this.atualizar(jogadorEncontrado, criaJogadorDto)
        // } else {
        //     this.criar(criaJogadorDto)
        // }    
    }


    async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {

        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogadodor com id ${_id} não econtrado`)
        }

        await this.jogadorModel.findOneAndUpdate({_id}, 
                {$set: atualizarJogadorDto}).exec()
 
    }


    async consultarTodosJogadores(): Promise<Jogador[]> {
        // return await this.jogadores;
        return await this.jogadorModel.find().exec()
    }

    // async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
    //     const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)
    //     if (!jogadorEncontrado) {
    //         throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
    //     }
    //     return jogadorEncontrado
    // }


    async consultarJogadorPeloId(_id: string): Promise<Jogador> {

        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        }
        
        return jogadorEncontrado

    }

    async deletarJogador(_id): Promise<any> {
         // const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)
        // this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email)

        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        }

        return await this.jogadorModel.deleteOne({_id}).exec();
    }

}
