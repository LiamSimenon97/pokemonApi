import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TeamService } from './team.service';
import { ApiBody, ApiCreatedResponse, ApiExtraModels, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ErrorDto } from 'src/components/schemas/ErrorDto';
import { TeamDto } from 'src/components/schemas/TeamDto';

@Controller()
@ApiTags('Team')
@ApiExtraModels(ErrorDto)
@ApiExtraModels(TeamDto)
export class TeamController {
    constructor(private teamService:TeamService) {}

    //Create a team
    //@param name The name of the team
    //@returns The created team
    @ApiCreatedResponse({description: 'Successful operation', schema: {type:"object",$ref: getSchemaPath(TeamDto)}})
    @Post("team")
    async createTeam(@Body('name') name:string) {
        return this.teamService.createTeam(name);
    }
    //Get all teams
    //@returns All teams
    @ApiOkResponse({description: 'Successful operation', schema: {type: 'array', items: {$ref: getSchemaPath(TeamDto)}}})
    @Get("teams")
    async getAllTeams() {
        return this.teamService.getAllTeams();
    }
    //Get a team by id
    //@param id The id of the team
    //@returns The team with the given id
    //@throws NotFoundException if the team doesn't exist
    @ApiParam({name: 'id',required: true, description: 'The id of the team to retrieve', schema: {type: 'integer',format: 'int64'}})
    @ApiOkResponse({description: 'Successful operation', schema: {$ref: getSchemaPath(TeamDto)}})
    @ApiNotFoundResponse({description: 'Team not found',schema: {$ref: getSchemaPath(ErrorDto)}})
    @Get("team/:id")
    async getTeamById(@Param('id',new ParseIntPipe()) id:number) {
        return this.teamService.getTeamById(id);
    }
    //Get a team by name
    //@param name The name of the team
    //@returns The team with the given name
    //@throws NotFoundException if the team doesn't exist
    @ApiParam({name: 'id',required: true, description: 'The id of the team to set pokemons', schema: {type: 'integer'}})
    @ApiBody({description: "Array of pokemon id's to set", required:true,schema: {type: 'object',properties : {pokemons: {type: 'array',items: {type: 'integer'}}}}})
    @ApiOkResponse({description: 'Successful operation', schema: {$ref: getSchemaPath(TeamDto)}})
    @ApiNotFoundResponse({description: 'Team not found',schema: {$ref: getSchemaPath(ErrorDto)}})
    @ApiNotFoundResponse({description: 'Pokemon not inside the existing team',schema: {$ref: getSchemaPath(ErrorDto)}})
    @ApiForbiddenResponse({description: 'Team is full (Limit is 6)',schema: {$ref: getSchemaPath(ErrorDto)}})
    @ApiExtraModels(ErrorDto)
    @ApiExtraModels(TeamDto)
    @Post("team/pokemon/:id")
    async setPokemonToTeam(@Param('id',new ParseIntPipe()) teamId:number, @Body('pokemonsIds') pokemonsIds:number[]) {
        return this.teamService.setPokemonToTeam(teamId, pokemonsIds);
    }
    //Delete a team by id
    //@param id The id of the team
    //@returns The deleted team
    //@throws NotFoundException if the team doesn't exist
    @ApiParam({name: 'id',required: true, description: 'The id of the team to delete', schema: {type: 'integer',format: 'int64'}})
    @ApiOkResponse({description: 'Successful operation', schema: {$ref: getSchemaPath(TeamDto)}})
    @ApiNotFoundResponse({description: 'Team not found',schema: {$ref: getSchemaPath(ErrorDto)}})
    @Delete("team/:id")
    async deleteTeam(@Param('id',new ParseIntPipe()) id:number) {
        return this.teamService.deleteTeam(id);
    }
    //Delete Pokemon from a team
    //@param id The id of the team
    //@param pokemonsIds The id of the pokemon
    //@returns the team without the pokemons that have been deleted
    //@throws NotFoundException if the team doesn't exist
    @ApiParam({name: 'id',required: true, description: 'The id of the team to delete pokemons', schema: {type: 'integer',format: 'int64'}})
    @ApiBody({description: "Array of pokemon id's to delete", required:true,schema: {type: 'object',properties : {pokemons: {type: 'array',items: {type: 'integer'}}}}})
    @ApiOkResponse({description: 'Successful operation', schema: {$ref: getSchemaPath(TeamDto)}})
    @ApiNotFoundResponse({description: 'Team not found',schema: {$ref: getSchemaPath(ErrorDto)}})
    @Delete("team/pokemon/:id")
    async removePokemonFromTeam(@Param('id',new ParseIntPipe()) teamId:number, @Body('pokemonsIds') pokemonsIds?:number[]) {
        if(pokemonsIds === undefined) return this.teamService.removeAllPokemonFromTeam(teamId);
        return this.teamService.removePokemonFromTeam(teamId, pokemonsIds);
    }
}
