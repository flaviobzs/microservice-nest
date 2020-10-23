import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";

// criação de um pipe customizado 
export class ValidacaoParametrosPipe implements PipeTransform {

    // implementação do meto da interface PipeTransform 
    transform (value: any, metadata: ArgumentMetadata) {

        // value no caso é o _id do query paramns 
        if(!value) {
            throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser informado`)
        }

        return value

    }

}