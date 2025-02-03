-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "type" BOOLEAN NOT NULL DEFAULT true,
    "categories" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);
