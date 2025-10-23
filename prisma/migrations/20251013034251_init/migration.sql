-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isAccountActivated" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "public"."Temple" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "county" TEXT,
    "city" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "dateDedicated" DATE,
    "templeStatusId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Temple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TempleStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "TempleStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ordinance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Ordinance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Visit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "templeId" INTEGER NOT NULL,
    "sessionDate" TIMESTAMP NOT NULL,
    "userNote" VARCHAR(10000) NOT NULL,
    "userFiles" BYTEA[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VisitOrdinance" (
    "visitId" TEXT NOT NULL,
    "ordinanceId" INTEGER NOT NULL,
    "count" INTEGER,

    CONSTRAINT "VisitOrdinance_pkey" PRIMARY KEY ("visitId","ordinanceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Temple_slug_key" ON "public"."Temple"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Temple_name_key" ON "public"."Temple"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TempleStatus_name_key" ON "public"."TempleStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ordinance_name_key" ON "public"."Ordinance"("name");

-- CreateIndex
CREATE INDEX "Visit_userId_idx" ON "public"."Visit"("userId");

-- CreateIndex
CREATE INDEX "Visit_templeId_sessionDate_idx" ON "public"."Visit"("templeId", "sessionDate");

-- CreateIndex
CREATE UNIQUE INDEX "Visit_userId_templeId_sessionDate_key" ON "public"."Visit"("userId", "templeId", "sessionDate");

-- CreateIndex
CREATE INDEX "VisitOrdinance_ordinanceId_idx" ON "public"."VisitOrdinance"("ordinanceId");

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Temple" ADD CONSTRAINT "Temple_templeStatusId_fkey" FOREIGN KEY ("templeStatusId") REFERENCES "public"."TempleStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Visit" ADD CONSTRAINT "Visit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Visit" ADD CONSTRAINT "Visit_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "public"."Temple"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VisitOrdinance" ADD CONSTRAINT "VisitOrdinance_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "public"."Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VisitOrdinance" ADD CONSTRAINT "VisitOrdinance_ordinanceId_fkey" FOREIGN KEY ("ordinanceId") REFERENCES "public"."Ordinance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
