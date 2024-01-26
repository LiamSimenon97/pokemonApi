/*
  Warnings:

  - A unique constraint covering the columns `[ability]` on the table `Abilities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[error]` on the table `Error` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[move]` on the table `Moves` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Abilities_ability_key" ON "Abilities"("ability");

-- CreateIndex
CREATE UNIQUE INDEX "Error_error_key" ON "Error"("error");

-- CreateIndex
CREATE UNIQUE INDEX "Moves_move_key" ON "Moves"("move");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");
