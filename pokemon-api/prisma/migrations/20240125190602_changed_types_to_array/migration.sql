-- DropForeignKey
ALTER TABLE "Types" DROP CONSTRAINT "Types_typeId_fkey";

-- CreateTable
CREATE TABLE "_TypeToTypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TypeToTypes_AB_unique" ON "_TypeToTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_TypeToTypes_B_index" ON "_TypeToTypes"("B");

-- AddForeignKey
ALTER TABLE "_TypeToTypes" ADD CONSTRAINT "_TypeToTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TypeToTypes" ADD CONSTRAINT "_TypeToTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "Types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
