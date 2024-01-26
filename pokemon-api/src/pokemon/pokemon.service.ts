import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PokemonService {
    constructor(private prisma:PrismaService) {}
    
    getAllPokemons(sort?:Sort) {
        return this.prisma.pokemon.findMany({
            orderBy: {
                name: sort === Sort.NAME_ASC ? 'asc' : sort === Sort.NAME_DESC ? 'desc' : undefined,
                id: sort === Sort.ID_ASC ? 'asc' : sort === Sort.ID_DESC ? 'desc' : undefined
            },
            include: {
                types: {
                    include: {
                        type: true
                    }
                },
                sprites: true
            }
        })
    }

    async getPokemonById(id:number) {
        const pokemon = await this.prisma.pokemon.findUnique({
            where: {
                id: id
            },
            include: {
                types: {
                    include: {
                        type: true
                    }
                },
                sprites: true
            }
        })
        if(!pokemon) throw new NotFoundException(`Pokemon with id ${id} not found`);
        console.log(pokemon.name);
        return pokemon;
    }
}

export enum Sort {
    NAME_ASC = 'name-asc',
    NAME_DESC = 'name-desc',
    ID_ASC = 'id-asc',
    ID_DESC = 'id-desc'
}
