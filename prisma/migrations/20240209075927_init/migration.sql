/*
  Warnings:

  - You are about to drop the `Flavors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CoffeeToFlavors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CoffeeToFlavors" DROP CONSTRAINT "_CoffeeToFlavors_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoffeeToFlavors" DROP CONSTRAINT "_CoffeeToFlavors_B_fkey";

-- AlterTable
ALTER TABLE "Coffee" ADD COLUMN     "flavors" TEXT[];

-- DropTable
DROP TABLE "Flavors";

-- DropTable
DROP TABLE "_CoffeeToFlavors";
