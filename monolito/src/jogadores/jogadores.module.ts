import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { MongooseModule } from '@nestjs/mongoose'
import { JogadorSchema } from './interfaces/jogador.schema';

@Module({
  // registrar o repository/schema 
  imports: [MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorSchema}]) ],
  // injeção do controller 
  controllers: [JogadoresController],
  providers: [
    JogadoresService],
  exports: [JogadoresService]
})
export class JogadoresModule {}
