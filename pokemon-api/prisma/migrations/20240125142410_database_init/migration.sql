-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "spritesId" INTEGER NOT NULL,
    "typesId" INTEGER NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sprites" (
    "id" SERIAL NOT NULL,
    "front_default" TEXT NOT NULL,
    "front_female" TEXT,
    "front_shiny" TEXT,
    "front_shiny_female" TEXT,
    "back_default" TEXT,
    "back_female" TEXT,
    "back_shiny" TEXT,
    "back_shiny_female" TEXT,

    CONSTRAINT "Sprites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Types" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "slot" INTEGER NOT NULL,

    CONSTRAINT "Types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonDetails" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "spritesId" INTEGER NOT NULL,
    "typesId" INTEGER NOT NULL,
    "height" DECIMAL(65,30) NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "order" INTEGER NOT NULL,
    "species" TEXT NOT NULL,
    "form" TEXT NOT NULL,

    CONSTRAINT "PokemonDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moves" (
    "id" SERIAL NOT NULL,
    "move" TEXT NOT NULL,

    CONSTRAINT "Moves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "version_group_details" (
    "id" SERIAL NOT NULL,
    "move_learn_method" TEXT NOT NULL,
    "version_group" TEXT NOT NULL,
    "level_learned_at" INTEGER NOT NULL,

    CONSTRAINT "version_group_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "stat" TEXT NOT NULL,
    "base_stat" INTEGER NOT NULL,
    "effort" INTEGER NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Abilities" (
    "id" SERIAL NOT NULL,
    "ability" TEXT NOT NULL,
    "is_hidden" BOOLEAN NOT NULL,
    "slot" INTEGER NOT NULL,

    CONSTRAINT "Abilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Error" (
    "id" SERIAL NOT NULL,
    "error" TEXT NOT NULL,
    "error_message" TEXT NOT NULL,

    CONSTRAINT "Error_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PokemonToTypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PokemonToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PokemonDetailsToTypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PokemonDetailsToStats" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MovesToPokemonDetails" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MovesToversion_group_details" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AbilitiesToPokemonDetails" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PokemonToTypes_AB_unique" ON "_PokemonToTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_PokemonToTypes_B_index" ON "_PokemonToTypes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PokemonToTeam_AB_unique" ON "_PokemonToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_PokemonToTeam_B_index" ON "_PokemonToTeam"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PokemonDetailsToTypes_AB_unique" ON "_PokemonDetailsToTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_PokemonDetailsToTypes_B_index" ON "_PokemonDetailsToTypes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PokemonDetailsToStats_AB_unique" ON "_PokemonDetailsToStats"("A", "B");

-- CreateIndex
CREATE INDEX "_PokemonDetailsToStats_B_index" ON "_PokemonDetailsToStats"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MovesToPokemonDetails_AB_unique" ON "_MovesToPokemonDetails"("A", "B");

-- CreateIndex
CREATE INDEX "_MovesToPokemonDetails_B_index" ON "_MovesToPokemonDetails"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MovesToversion_group_details_AB_unique" ON "_MovesToversion_group_details"("A", "B");

-- CreateIndex
CREATE INDEX "_MovesToversion_group_details_B_index" ON "_MovesToversion_group_details"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AbilitiesToPokemonDetails_AB_unique" ON "_AbilitiesToPokemonDetails"("A", "B");

-- CreateIndex
CREATE INDEX "_AbilitiesToPokemonDetails_B_index" ON "_AbilitiesToPokemonDetails"("B");

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_spritesId_fkey" FOREIGN KEY ("spritesId") REFERENCES "Sprites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Types" ADD CONSTRAINT "Types_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonDetails" ADD CONSTRAINT "PokemonDetails_spritesId_fkey" FOREIGN KEY ("spritesId") REFERENCES "Sprites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToTypes" ADD CONSTRAINT "_PokemonToTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToTypes" ADD CONSTRAINT "_PokemonToTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "Types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToTeam" ADD CONSTRAINT "_PokemonToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToTeam" ADD CONSTRAINT "_PokemonToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonDetailsToTypes" ADD CONSTRAINT "_PokemonDetailsToTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "PokemonDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonDetailsToTypes" ADD CONSTRAINT "_PokemonDetailsToTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "Types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonDetailsToStats" ADD CONSTRAINT "_PokemonDetailsToStats_A_fkey" FOREIGN KEY ("A") REFERENCES "PokemonDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonDetailsToStats" ADD CONSTRAINT "_PokemonDetailsToStats_B_fkey" FOREIGN KEY ("B") REFERENCES "Stats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovesToPokemonDetails" ADD CONSTRAINT "_MovesToPokemonDetails_A_fkey" FOREIGN KEY ("A") REFERENCES "Moves"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovesToPokemonDetails" ADD CONSTRAINT "_MovesToPokemonDetails_B_fkey" FOREIGN KEY ("B") REFERENCES "PokemonDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovesToversion_group_details" ADD CONSTRAINT "_MovesToversion_group_details_A_fkey" FOREIGN KEY ("A") REFERENCES "Moves"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovesToversion_group_details" ADD CONSTRAINT "_MovesToversion_group_details_B_fkey" FOREIGN KEY ("B") REFERENCES "version_group_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilitiesToPokemonDetails" ADD CONSTRAINT "_AbilitiesToPokemonDetails_A_fkey" FOREIGN KEY ("A") REFERENCES "Abilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilitiesToPokemonDetails" ADD CONSTRAINT "_AbilitiesToPokemonDetails_B_fkey" FOREIGN KEY ("B") REFERENCES "PokemonDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
