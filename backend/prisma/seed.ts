import { PrismaClient, OrderStatus, PaymentStatus, ProductCondition } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // очистка (чтобы повторный seed не ломал unique)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  const products = await prisma.product.createMany({
    data: [
      {
        name: "MacBook Pro 16",
        description: "Apple laptop with M3 chip",
        price: 2499.99,
        stock_quantity: 15,
        category: "Laptops",
        image_url: "https://example.com/macbook.jpg",
        sku: "MACBOOK-PRO-16",
        product_condition: ProductCondition.new,
        is_active: true,
      },
      {
        name: "iPhone 15 Pro",
        description: "Apple smartphone",
        price: 999.99,
        stock_quantity: 30,
        category: "Phones",
        image_url: "https://example.com/iphone.jpg",
        sku: "IPHONE-15-PRO",
        product_condition: ProductCondition.new,
        is_active: true,
      },
      {
        name: "Used Monitor",
        description: "27 inch monitor",
        price: 199.99,
        stock_quantity: 5,
        category: "Monitors",
        sku: "MONITOR-27",
        product_condition: ProductCondition.used,
        is_active: true,
      },
    ],
  });

  console.log(`Created products: ${products.count}`);

  const macbook = await prisma.product.findUnique({
    where: {
      sku: "MACBOOK-PRO-16",
    },
  });

  const iphone = await prisma.product.findUnique({
    where: {
      sku: "IPHONE-15-PRO",
    },
  });


  if (!macbook || !iphone) {
    throw new Error("Products not found");
  }


  const order = await prisma.order.create({
    data: {
      order_number: "ORD-0001",
      customer_name: "John Smith",
      customer_email: "john@example.com",
      customer_phone: "+123456789",
      shipping_address: "New York, USA",
      billing_address: "New York, USA",
      total_amount: 3499.98,
      status: OrderStatus.processing,
      payment_status: PaymentStatus.paid,
      payment_method: "credit_card",
      notes: "Fast delivery",

      order_items: {
        create: [
          {
            product_id: macbook.id,
            product_name: macbook.name,
            product_price: macbook.price,
            quantity: 1,
            subtotal: macbook.price,
          },
          {
            product_id: iphone.id,
            product_name: iphone.name,
            product_price: iphone.price,
            quantity: 1,
            subtotal: iphone.price,
          },
        ],
      },
    },
  });


  console.log(`Created order: ${order.order_number}`);

  console.log("✅ Seed completed");
}


main()
  .catch((error) => {
    console.error("❌ Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });