import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TeamService } from './team.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Team')
export class TeamController {
    constructor(private teamService:TeamService) {}

    //Create a team
    //@param name The name of the team
    //@returns The created team
    @Post("team")
    async createTeam(@Body('name') name:string) {
        return this.teamService.createTeam(name);
    }
    //Get all teams
    //@returns All teams
    @Get("teams")
    async getAllTeams() {
        return this.teamService.getAllTeams();
    }
    //Get a team by id
    //@param id The id of the team
    //@returns The team with the given id
    //@throws NotFoundException if the team doesn't exist
    @Get("team/:id")
    async getTeamById(@Param('id',new ParseIntPipe()) id:number) {
        return this.teamService.getTeamById(id);
    }
    //Get a team by name
    //@param name The name of the team
    //@returns The team with the given name
    //@throws NotFoundException if the team doesn't exist
    @Post("team/pokemon/:id")
    async setPokemonToTeam(@Param('id',new ParseIntPipe()) teamId:number, @Body('pokemonsIds') pokemonsIds:number[]) {
        return this.teamService.setPokemonToTeam(teamId, pokemonsIds);
    }
    //Delete a team by id
    //@param id The id of the team
    //@returns The deleted team
    //@throws NotFoundException if the team doesn't exist
    @Delete("team/:id")
    async deleteTeam(@Param('id',new ParseIntPipe()) id:number) {
        return this.teamService.deleteTeam(id);
    }
    //Delete Pokemon from a team
    //@param id The id of the team
    //@param pokemonsIds The id of the pokemon
    //@returns the team without the pokemons that have been deleted
    //@throws NotFoundException if the team doesn't exist
    @Delete("team/pokemon/:id")
    async removePokemonFromTeam(@Param('id',new ParseIntPipe()) teamId:number, @Body('pokemonsIds') pokemonsIds?:number[]) {
        if(pokemonsIds === undefined) return this.teamService.removeAllPokemonFromTeam(teamId);
        return this.teamService.removePokemonFromTeam(teamId, pokemonsIds);
    }
}
