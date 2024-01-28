import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';

@Injectable()
export class PokemonService {
    constructor(private prisma:PrismaService) {}
    //Get all pokemons
    //@returns All pokemons
    getAllPokemons(sort?:Sort){
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
    //Get a pokemon by id
    //@param id The id of the pokemon
    //@returns The pokemon with the given id
    //@throws NotFoundException if the pokemon doesn't exist
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
    //Get a pokemon by name
    //@param name The name of the pokemon
    //@returns The pokemon with the given name
    //@throws NotFoundException if the pokemon doesn't exist
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
    //Get pokemons by type
    //@param type The type of the pokemon
    //@returns The pokemons with the given type
    //@throws NotFoundException if the pokemons don't exist
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
    //Get pokemons paginated
    //@param limit The limit of pokemons per page
    //@param sort The sorting method
    //@param offset The offset of the page
    //@returns The pokemons paginated with metadata for pagination
    getPokemonsPaginated(limit?:number,sort?:Sort,offset?:number) {
        return this.prisma.pokemon.findMany({
            orderBy: {
                name: sort === Sort.NAME_ASC ? 'asc' : sort === Sort.NAME_DESC ? 'desc' : undefined,
                id: sort === Sort.ID_ASC ? 'asc' : sort === Sort.ID_DESC ? 'desc' : undefined
            },
            skip: offset ? offset : undefined,
            take: limit ? limit : undefined,
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
