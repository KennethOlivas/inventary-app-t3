-- CreateEnum
CREATE TYPE "Cities" AS ENUM ('Chinandega', 'Esteli', 'Leon', 'Managua', 'Masaya', 'Matagalpa', 'Rivas', 'Granada', 'Jinotega', 'Carazo', 'Boaco', 'Madriz', 'Chontales', 'NuevaSegovia', 'RioSanJuan');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "city" "Cities";
