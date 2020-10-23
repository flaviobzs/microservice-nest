import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [
    // npm i @nestjs/mongoose 
    // npm i mongoose 
    // npm i @types/mongoose -D
    // liberar acesso ao ip da aplicação no cluster e ele libera a URL de conexao 
    MongooseModule.forRoot('mongodb+srv://admin_sr:7Fo50X1WDaCtasB6@clustermogodb-79l5n.mongodb.net/smartranking?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

// instalar cli 
// npm i -g @nestjs/cli

// criar novo projeto 
// nest new apiexemplo

// criar estrutura de modulo 
// nest g module nome 

// criar controller 
// nest g controller nome 

