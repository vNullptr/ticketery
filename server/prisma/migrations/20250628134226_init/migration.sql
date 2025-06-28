-- CreateTable
CREATE TABLE "Ticket" (
    "orderID" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "qrToken" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("orderID")
);
