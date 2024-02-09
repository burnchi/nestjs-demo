/*
  Warnings:

  - You are about to drop the column `flavors` on the `Coffee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coffee" DROP COLUMN "flavors";

-- CreateTable
CREATE TABLE "Flavors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Flavors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CoffeeToFlavors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoffeeToFlavors_AB_unique" ON "_CoffeeToFlavors"("A", "B");

-- CreateIndex
CREATE INDEX "_CoffeeToFlavors_B_index" ON "_CoffeeToFlavors"("B");

-- AddForeignKey
ALTER TABLE "_CoffeeToFlavors" ADD CONSTRAINT "_CoffeeToFlavors_A_fkey" FOREIGN KEY ("A") REFERENCES "Coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoffeeToFlavors" ADD CONSTRAINT "_CoffeeToFlavors_B_fkey" FOREIGN KEY ("B") REFERENCES "Flavors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
