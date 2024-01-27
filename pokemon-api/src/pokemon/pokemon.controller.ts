import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res, SetMetadata, Version } from '@nestjs/common';
import { PokemonService, Sort } from './pokemon.service';
import { ApiAcceptedResponse, ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { PokemonDto } from 'src/components/schemas/PokemonDto';
import { ErrorDto } from 'src/components/schemas/ErrorDto';
import { PokemonDetailsDto } from 'src/components/schemas/PokemonDetailsDto';

@Controller()
@ApiTags('Pokemon')
@ApiExtraModels(PokemonDto)
@ApiExtraModels(ErrorDto)
@ApiExtraModels(PokemonDetailsDto)
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}
    @ApiQuery({name: 'sort',required: false, description: 'Sort the pokemons', schema: {type: 'string',enum : ['name-asc','name-desc','id-asc','id-desc']}})
    @ApiOkResponse({description: 'Successful operation', schema: {type: 'array', items: {$ref: getSchemaPath(PokemonDto)}}})
    @Get("pokemons")
    getAllPokemons(@Req() req){
        const { sort } = req.query;
        return this.pokemonService.getAllPokemons(sort);
    }
    @ApiParam({name: 'id',required: true, description: 'The id of the pokemon to retrieve', schema: {type: 'integer',format: 'int64'}})
    @ApiOkResponse({description: 'Successful operation', schema: {$ref: getSchemaPath(PokemonDetailsDto)}})
    @ApiNotFoundResponse({description: 'Pokemon not found',schema: {$ref: getSchemaPath(ErrorDto)}})
    @Get("pokemon/:id")
    getPokemonById(@Param('id',new ParseIntPipe()) id:number){
        if(id === undefined) return "Please provide an id";
        return this.pokemonService.getPokemonById(id);
    }

    //Get a pokemon by name
    //@param name The name of the pokemon
    //@returns The pokemon with the given name
    //@throws NotFoundException if the pokemon doesn't exist
    @ApiQuery({name: 'query',required: true, description: 'Name or Type of the pokemon', schema: {type: 'string'}})
    @ApiQuery({name: 'limit',required: false, description: 'Limit the number of results', schema: {type: 'integer',format: 'int64'}})
    @ApiOkResponse({description: 'Successful operation', schema: {type: 'array', items: {$ref: getSchemaPath(PokemonDto)}}})
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
    @ApiQuery({name: 'sort',required: false, description: 'Sort the pokemons', schema: {type: 'string',enum : ['name-asc','name-desc','id-asc','id-desc']}})
    @ApiQuery({name: 'limit',required: false, description: 'Limit the number of pokemons', schema: {type: 'integer',format: 'int32'}})
    @ApiQuery({name: 'offset',required: false, description: 'Offset the number of pokemons', schema: {type: 'integer',format: 'int32'}})
    @ApiOkResponse({description: 'Successful operation', schema: 
    {type: 'object', properties:{data:{type:"array",items:{$ref:getSchemaPath(PokemonDto)}},
    metadata:{type:'object',properties:{next:{type:'string',description:"Next page url"},previous:{type:'string',description:"Previous page url"},
    total:{type:'integer',description:"Total number of pokemons",format:"int32"},pages:{type:'integer',description:"Number of pages",format:"int32"},
    page:{type:'integer',description:"Current page",format:"int32"}}}}}})
    @Get("pokemons")
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
