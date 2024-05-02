-- CreateTable
CREATE TABLE "excel_items" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(64) NOT NULL DEFAULT '',
    "description" VARCHAR(255) NOT NULL DEFAULT '',
    "quantity" DECIMAL(18,6) NOT NULL DEFAULT 0.0,
    "price" DECIMAL(18,6) NOT NULL DEFAULT 0.0,
    "total_price" DECIMAL(18,6) NOT NULL DEFAULT 0.0,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "excel_items_pkey" PRIMARY KEY ("id")
);
