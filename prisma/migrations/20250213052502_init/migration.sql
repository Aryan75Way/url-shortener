-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "clickCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClickAnalytics" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "ip" TEXT,
    "location" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClickAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortUrl_key" ON "Url"("shortUrl");

-- CreateIndex
CREATE INDEX "Url_shortUrl_idx" ON "Url"("shortUrl");

-- AddForeignKey
ALTER TABLE "ClickAnalytics" ADD CONSTRAINT "ClickAnalytics_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
