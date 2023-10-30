-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "paymentGatewayData" JSONB,
ADD COLUMN     "transactionId" TEXT;
