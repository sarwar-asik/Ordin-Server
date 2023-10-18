-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "portal" TEXT NOT NULL,
    "publishedTime" TIMESTAMP(3) NOT NULL,
    "postBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_postBy_fkey" FOREIGN KEY ("postBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
