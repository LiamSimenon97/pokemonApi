import { Injectable, NotFoundException } from '@nestjs/common';
import { off } from 'process';
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
        const pokemon = await this.prisma.pokemonDetails.findUnique({
            where: {
                id: id
            },
            include: {
                types: {
                    include: {
                        type: true
                    }
                },
                sprites: true,
                stats: true,
                abilities: true,
                moves:true

            }
        })
        if(!pokemon) throw new NotFoundException(`Pokemon with id ${id} not found`);
        return pokemon;
    }

    async getPokemonByName(name:string) {
        const pokemon = await this.prisma.pokemon.findUnique({
            where: {
                name: name
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
        if(!pokemon) throw new NotFoundException(`Pokemon with name ${name} not found`);
        return pokemon;
    }

    async getPokemonByType(type:string,limit?:number) {
        const pokemon = await this.prisma.pokemonDetails.findMany({
            where: {
                types: {
                    some: {
                        type: {
                            some: {
                                name: type
                            }
                        }
                    }
                }
            },
            include: {
                types: {
                    include: {
                        type: true
                    }
                },
                sprites: true,
                stats: true,
                abilities: true,
                moves:true

            },
            take: limit > 0 ? limit : undefined
        })
        if(!pokemon) throw new NotFoundException(`Pokemons with type ${type} not found`);
        return pokemon;
    }

    getPokemonsPaginated(limit?:number,sort?:Sort,offset?:number) {
        return this.prisma.pokemon.findMany({
            orderBy: {
                name: sort === Sort.NAME_ASC ? 'asc' : sort === Sort.NAME_DESC ? 'desc' : undefined,
                id: sort === Sort.ID_ASC ? 'asc' : sort === Sort.ID_DESC ? 'desc' : undefined
            },
            skip: offset,
            take: limit,
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
}

export enum Sort {
    NAME_ASC = 'name-asc',
    NAME_DESC = 'name-desc',
    ID_ASC = 'id-asc',
    ID_DESC = 'id-desc'
}
