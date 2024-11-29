/*
  Warnings:

  - The primary key for the `assessments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `modules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `progress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `topics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `Credit` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `Introduction` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assessments" DROP CONSTRAINT "assessments_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "modules" DROP CONSTRAINT "modules_courseId_fkey";

-- DropForeignKey
ALTER TABLE "progress" DROP CONSTRAINT "progress_courseId_fkey";

-- DropForeignKey
ALTER TABLE "progress" DROP CONSTRAINT "progress_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "topics" DROP CONSTRAINT "topics_moduleId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "Credit" SET NOT NULL;

-- AlterTable
ALTER TABLE "assessments" DROP CONSTRAINT "assessments_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "moduleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "assessments_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "assessments_id_seq";

-- AlterTable
ALTER TABLE "courses" DROP CONSTRAINT "courses_pkey",
ADD COLUMN     "Archive" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Introduction" TEXT NOT NULL,
ADD COLUMN     "ModuleCreated" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "domain" TEXT NOT NULL,
ADD COLUMN     "subtopics" TEXT[],
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "courses_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "courses_id_seq";

-- AlterTable
ALTER TABLE "modules" DROP CONSTRAINT "modules_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "courseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "modules_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "modules_id_seq";

-- AlterTable
ALTER TABLE "progress" DROP CONSTRAINT "progress_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "courseId" SET DATA TYPE TEXT,
ALTER COLUMN "moduleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "progress_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "progress_id_seq";

-- AlterTable
ALTER TABLE "topics" DROP CONSTRAINT "topics_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "moduleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "topics_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "topics_id_seq";

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress" ADD CONSTRAINT "progress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress" ADD CONSTRAINT "progress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
