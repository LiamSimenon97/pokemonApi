import { Controller, Get, Param, ParseIntPipe, Req, Res, Version } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { PokemonDto } from '../../src/components/schemas/PokemonDto';
import { ErrorDto } from '../../src/components/schemas/ErrorDto';
import { PokemonDetailsDto } from '../../src/components/schemas/PokemonDetailsDto';

@Controller()
@ApiTags('Pokemons')
@ApiExtraModels(PokemonDto)
@ApiExtraModels(ErrorDto)
@ApiExtraModels(PokemonDetailsDto)
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}

    //Get all pokemons
    //@returns All pokemons
    @ApiQuery({name: 'sort',required: false, description: 'Sort the pokemons', schema: {type: 'string',enum : ['name-asc','name-desc','id-asc','id-desc']}})
    @ApiOkResponse({description: 'Successful operation', schema: {type: 'array', items: {$ref: getSchemaPath(PokemonDto)}}})
    @ApiOperation({summary: 'Get all pokemons'})
    @Get("pokemons")
    getAllPokemons(@Req() req){
        const { sort } = req.query;
        return this.pokemonService.getAllPokemons(sort);
    }
    //Get a pokemon by id
    //@param id The id of the pokemon
    //@returns The pokemon with the given id
    //@throws NotFoundException if the pokemon doesn't exist
    @ApiParam({name: 'id',required: true, description: 'The id of the pokemon to retrieve', schema: {type: 'integer',format: 'int64'}})
    @ApiOkResponse({description: 'Successful operation', schema: {$ref: getSchemaPath(PokemonDetailsDto)}})
    @ApiNotFoundResponse({description: 'Pokemon not found',schema: {$ref: getSchemaPath(ErrorDto)}})
    @ApiOperation({summary: 'Get a pokemon by id'})
    @Get("pokemon/:id")
    getPokemonById(@Param('id',new ParseIntPipe()) id:number){
        if(id === undefined) return "Please provide an id";
        return this.pokemonService.getPokemonById(id);
    }

    //Get pokemon(s) by name or type
    //@req The name or type of the pokemon
    //@req the limit of the results
    //@returns The pokemon with the given name
    //@throws NotFoundException if the pokemon doesn't exist
    @ApiTags("Search")
    @ApiQuery({name: 'query',required: true, description: 'Name or Type of the pokemon', schema: {type: 'string'}})
    @ApiQuery({name: 'limit',required: false, description: 'Limit the number of results', schema: {type: 'integer',format: 'int64'}})
    @ApiOkResponse({description: 'Successful operation', schema: {type: 'array', items: {$ref: getSchemaPath(PokemonDto)}}})
    @ApiOperation({summary: 'Get pokemon(s) by name or type with an optional limit'})
    @Get("search")
    searchPokemon(@Req() req) {
        const { name, type,limit} = req.query;
        if(name) {
            return this.pokemonService.getPokemonByName(name)
        } else if(type) {
            return this.pokemonService.getPokemonByType(type,Number(limit))
        }
    }
    // get all pokemons paginated
    // @param limit The number of pokemons per page
    // @param sort The sorting criteria
    // @param offset The offset
    // @returns The pokemons paginated
    @Version('2')
    @ApiQuery({name: 'sort',required: false, description: 'Sort the pokemons', schema: {type: 'string',enum : ['name-asc','name-desc','id-asc','id-desc']}})
    @ApiQuery({name: 'limit',required: false, description: 'Limit the number of pokemons', schema: {type: 'integer',format: 'int32'}})
    @ApiQuery({name: 'offset',required: false, description: 'Offset the number of pokemons', schema: {type: 'integer',format: 'int32'}})
    @ApiOkResponse({description: 'Successful operation', schema: 
    {type: 'object', properties:{data:{type:"array",items:{$ref:getSchemaPath(PokemonDto)}},
    metadata:{type:'object',properties:{next:{type:'string',description:"Next page url"},previous:{type:'string',description:"Previous page url"},
    total:{type:'integer',description:"Total number of pokemons",format:"int32"},pages:{type:'integer',description:"Number of pages",format:"int32"},
    page:{type:'integer',description:"Current page",format:"int32"}}}}}})
    @ApiOperation({summary: 'Get all pokemons paginated'})
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