import { Controller, Post, Body, Get, Delete, UsePipes, ValidationPipe, Param, Put, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto'
import { JogadoresService } from './jogadores.service'
import { Jogador } from './interfaces/jogador.interface'
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe'

// anotação para controler e path da rota 
@Controller('api/v1/jogadores')
export class JogadoresController {

//  midleware intercepta e  transformação de dados ou validação de dados   
// ValidationPipe
// ParseIntPipe
// ParseBoolPipe
// ParseArrayPipe
// ParseUUIDPipe
// DefaultValuePipe

    // passar instancia do service no contrutor 
    constructor(private readonly jogadoresService: JogadoresService) {}

    // criar jogador 
    @Post()
    // passado o tipo do pipe (validação)
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadoresService.criarJogador(criarJogadorDto)
    }

    // atualizar dados jogador 
    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        // dados que vem no body da requisição 
        @Body() atualizarJogadorDto: AtualizarJogadorDto,
        // validação com um pipe customizado no query paramn  
        @Param('_id', ValidacaoParametrosPipe) _id: string): Promise<void> {
        await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto)
    }
   
    // tras o jogador indicado pelo id, ou retorna todos (MESMO METODO)
    @Get()
    async consultarJogadores(
        @Query('idJogador') _id: string): Promise<Jogador[] | Jogador> {
        
        if (_id) {
            return await this.jogadoresService.consultarJogadorPeloId(_id);
        }
            
        return await this.jogadoresService.consultarTodosJogadores();      
    }

    /*
    !!!!!!!!!!!!!! metodo acima faz isso aqui tambem !!!!!!!!!!!!!
    @Get('/:_id')
    async consultarJogadorPeloId(
        @Param('_id', ValidacaoParametrosPipe) _id: string): Promise<Jogador> {
                return await this.jogadoresService.consultarJogadorPeloId(_id);    
    }
    */


    @Delete('/:_id')
    async deletarJogador(
        @Param('_id', ValidacaoParametrosPipe) _id: string): Promise<void> {
            await this.jogadoresService.deletarJogador(_id)
        }

}
