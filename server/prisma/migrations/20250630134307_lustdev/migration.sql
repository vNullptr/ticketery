-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "orderID" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "qrToken" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_qrToken_key" ON "Ticket"("qrToken");
