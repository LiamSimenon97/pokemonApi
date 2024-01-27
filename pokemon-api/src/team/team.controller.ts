import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller()
export class TeamController {
    constructor(private teamService:TeamService) {}

    @Post("team")
    async createTeam(@Body('name') name:string) {
        return this.teamService.createTeam(name);
    }

    @Get("teams")
    async getAllTeams() {
        return this.teamService.getAllTeams();
    }

    @Get("team/:id")
    async getTeamById(@Param('id',new ParseIntPipe()) id:number) {
        return this.teamService.getTeamById(id);
    }

    @Post("team/pokemon/:id")
    async setPokemonToTeam(@Param('id',new ParseIntPipe()) teamId:number, @Body('pokemonsIds') pokemonId:number[]) {
        return this.teamService.setPokemonToTeam(teamId, pokemonId);
    }

    @Delete("team/:id")
    async deleteTeam(@Param('id',new ParseIntPipe()) id:number) {
        return this.teamService.deleteTeam(id);
    }

    @Delete("team/pokemon/:id")
    async removePokemonFromTeam(@Param('id',new ParseIntPipe()) teamId:number, @Body('pokemonsIds') pokemonId?:number[]) {
        if(pokemonId === undefined) return this.teamService.removeAllPokemonFromTeam(teamId);
        return this.teamService.removePokemonFromTeam(teamId, pokemonId);
    }
}
