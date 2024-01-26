import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PokemonService, Sort } from './pokemon.service';

@Controller("api/v1")
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}
    
    @Get("pokemons")
    getAllPokemons(@Body('sort') sort: Sort ) {
        return this.pokemonService.getAllPokemons(sort);
    }

    @Get("pokemon")
    getPokemonById(@Body('id') id:number){
        if(id === undefined) return "Please provide an id";
        return this.pokemonService.getPokemonById(id);
    }

}
