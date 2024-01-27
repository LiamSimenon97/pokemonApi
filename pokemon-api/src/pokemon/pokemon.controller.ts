import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res, Version } from '@nestjs/common';
import { PokemonService, Sort } from './pokemon.service';

@Controller()
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}
    @Get("pokemons")
    getAllPokemons(@Body('sort') sort: Sort ) {
        return this.pokemonService.getAllPokemons(sort);
    }

    @Get("pokemon/:id")
    getPokemonById(@Param('id',new ParseIntPipe()) id:number){
        if(id === undefined) return "Please provide an id";
        return this.pokemonService.getPokemonById(id);
    }

    @Get("search")
    searchPokemon(@Req() req) {
        const { name, type,limit} = req.query;
        if(name) {
            return this.pokemonService.getPokemonByName(name)
        } else if(type) {
            return this.pokemonService.getPokemonByType(type,Number(limit))
        }
    }
    @Version('2')
    @Get("pokemons")
    getAllPokemonsV2(@Req() req, @Res() res) {
        const { sort,limit,offset } = req.query;
        const pokemons = this.pokemonService.getPokemonsPaginated(Number(limit),sort,Number(offset));
    }
}
