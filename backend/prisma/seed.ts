import {
  PrismaClient,
  OrderStatus,
  PaymentStatus,
  ProductCondition,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  const products = await prisma.product.createMany({
    data: [
      {
        name: "MacBook Pro 16",
        description: "Apple laptop M3 Pro",
        price: 2499.99,
        stock_quantity: 15,
        category: "Laptops",
        sku: "MAC-001",
        product_condition: ProductCondition.new,
      },
      {
        name: "Dell XPS 15",
        description: "Premium Windows laptop",
        price: 1899.99,
        stock_quantity: 8,
        category: "Laptops",
        sku: "DELL-001",
        product_condition: ProductCondition.new,
      },
      {
        name: "iPhone 15 Pro",
        description: "Apple smartphone",
        price: 999.99,
        stock_quantity: 25,
        category: "Phones",
        sku: "IPHONE-001",
        product_condition: ProductCondition.new,
      },
      {
        name: "Samsung Galaxy S24",
        description: "Android flagship phone",
        price: 899.99,
        stock_quantity: 20,
        category: "Phones",
        sku: "SAMSUNG-001",
        product_condition: ProductCondition.new,
      },
      {
        name: "LG UltraWide Monitor",
        description: "34 inch monitor",
        price: 599.99,
        stock_quantity: 12,
        category: "Monitors",
        sku: "LG-001",
        product_condition: ProductCondition.new,
      },
      {
        name: "Logitech MX Master 3",
        description: "Wireless mouse",
        price: 99.99,
        stock_quantity: 50,
        category: "Accessories",
        sku: "LOGI-001",
        product_condition: ProductCondition.new,
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB gaming keyboard",
        price: 129.99,
        stock_quantity: 35,
        category: "Accessories",
        sku: "KEY-001",
        product_condition: ProductCondition.new,
      },
      {
        name: "Used MacBook Air",
        description: "Second hand laptop",
        price: 700,
        stock_quantity: 3,
        category: "Laptops",
        sku: "MAC-USED-001",
        product_condition: ProductCondition.used,
      },
      {
        name: "AirPods Pro",
        description: "Wireless headphones",
        price: 249.99,
        stock_quantity: 40,
        category: "Audio",
        sku: "AIRPODS-001",
        product_condition: ProductCondition.new,
      },
      {
        name: "Sony Headphones",
        description: "Noise cancelling headphones",
        price: 349.99,
        stock_quantity: 15,
        category: "Audio",
        sku: "SONY-001",
        product_condition: ProductCondition.new,
      },
    ],
  });

  console.log(`Products created: ${products.count}`);


  const allProducts = await prisma.product.findMany();


  const customers = [
    {
      name: "John Smith",
      email: "john@example.com",
    },
    {
      name: "Anna Brown",
      email: "anna@example.com",
    },
    {
      name: "Michael Wilson",
      email: "michael@example.com",
    },
    {
      name: "David Miller",
      email: "david@example.com",
    },
    {
      name: "Emma Davis",
      email: "emma@example.com",
    },
  ];


  for (let i = 0; i < customers.length; i++) {
    const product1 = allProducts[i];
    const product2 = allProducts[i + 1];


    const total =
      Number(product1.price) +
      Number(product2.price);


    await prisma.order.create({
      data: {
        order_number: `ORD-${1000 + i}`,
        customer_name: customers[i].name,
        customer_email: customers[i].email,
        customer_phone: "+123456789",
        shipping_address: "New York, USA",
        billing_address: "New York, USA",
        total_amount: total,
        status:
          i % 2 === 0
            ? OrderStatus.delivered
            : OrderStatus.processing,
        payment_status:
          i % 2 === 0
            ? PaymentStatus.paid
            : PaymentStatus.pending,
        payment_method: "card",

        order_items: {
          create: [
            {
              product_id: product1.id,
              product_name: product1.name,
              product_price: product1.price,
              quantity: 1,
              subtotal: product1.price,
            },
            {
              product_id: product2.id,
              product_name: product2.name,
              product_price: product2.price,
              quantity: 1,
              subtotal: product2.price,
            },
          ],
        },
      },
    });
  }


  console.log("Orders created: 5");
  console.log("✅ Seed finished");
}


main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });