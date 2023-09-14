/*
  Warnings:

  - Added the required column `adress` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adressComplement` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthCountry` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDay` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "adress" VARCHAR(255) NOT NULL,
ADD COLUMN     "adressComplement" VARCHAR(255) NOT NULL,
ADD COLUMN     "birthCountry" VARCHAR(255) NOT NULL,
ADD COLUMN     "birthDay" VARCHAR(255) NOT NULL,
ADD COLUMN     "city" VARCHAR(255) NOT NULL,
ADD COLUMN     "firstName" VARCHAR(255) NOT NULL,
ADD COLUMN     "gender" VARCHAR(255) NOT NULL,
ADD COLUMN     "lastName" VARCHAR(255) NOT NULL,
ADD COLUMN     "phone" VARCHAR(255) NOT NULL,
ADD COLUMN     "zipCode" VARCHAR(255) NOT NULL;
