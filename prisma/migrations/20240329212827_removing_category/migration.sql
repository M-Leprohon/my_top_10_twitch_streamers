/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_categoryId_fkey";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "categoryId",
ALTER COLUMN "familiarity" DROP NOT NULL,
ALTER COLUMN "familiarity" SET DEFAULT 0;

-- DropTable
DROP TABLE "Category";
