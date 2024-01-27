import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res, SetMetadata, Version } from '@nestjs/common';
import { PokemonService, Sort } from './pokemon.service';
import { ApiAcceptedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}
    @ApiQuery({name: 'sort',required: false, description: 'Sort the pokemons', schema: {type: 'string',enum : ['name-asc','name-desc','id-asc','id-desc']}})
    @ApiOkResponse({description: 'Successful operation', schema: {type: 'array', items: {$ref: '#/components/schemas/Pokemon'}}})
    @Get("pokemons")
    getAllPokemons(@Req() req){
        const { sort } = req.query;
        return this.pokemonService.getAllPokemons(sort);
    }
    @ApiParam({name: 'id',required: true, description: 'The id of the pokemon to retrieve', schema: {type: 'integer',format: 'int64'}})
    @ApiOkResponse({description: 'Successful operation', schema: {$ref: '#/prisma/schema.prisma/PokemonDetails'}})
    @ApiNotFoundResponse({description: 'Pokemon not found',schema: {$ref: '#/prisma/schemas/Error'}})
    @Get("pokemon/:id")
    getPokemonById(@Param('id',new ParseIntPipe()) id:number){
        if(id === undefined) return "Please provide an id";
        return this.pokemonService.getPokemonById(id);
    }

    //Get a pokemon by name
    //@param name The name of the pokemon
    //@returns The pokemon with the given name
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
    @SetMetadata('isV2',["pagination"])
    async getAllPokemonsV2(@Req() req, @Res() res) {
        const { sort,limit,offset } = req.query;
        const pokemons = await this.pokemonService.getPokemonsPaginated(Number(limit),sort,Number(offset));
        const nextpageUrl = `http://localhost:3000/api/v2/pokemons?limit=${limit}&offset=${Number(offset)+Number(limit)}&sort=${sort}`
        const prevpageUrl = `http://localhost:3000/api/v2/pokemons?limit=${limit}&offset=${Number(offset)-Number(limit)}&sort=${sort}`
        const totalPokemonsLength = (await this.pokemonService.getAllPokemons()).length;
        res.send({
            data: pokemons,
            metadata: {
                next: nextpageUrl,
                previous: prevpageUrl,
                total: totalPokemonsLength,
                pages: Math.ceil(totalPokemonsLength/Number(limit)),
                page: Math.ceil(Number(offset)/Number(limit))+1
            }
        });
    }
}
