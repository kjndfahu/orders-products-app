USE `orders_products_db`;

INSERT INTO `products` (`name`, `description`, `price`, `stock_quantity`, `category`, `sku`, `warranty_from`, `warranty_to`, `product_condition`, `is_active`) VALUES
('Laptop Pro 15"', 'High-performance laptop with 16GB RAM and 512GB SSD', 1299.99, 50, 'Electronics', 'LAPTOP-001', '2024-01-10', '2026-01-10', 'new', TRUE),
('Wireless Mouse', 'Ergonomic wireless mouse with USB receiver', 29.99, 150, 'Electronics', 'MOUSE-001', '2024-02-01', '2025-02-01', 'new', TRUE),
('Mechanical Keyboard', 'RGB mechanical keyboard with Cherry MX switches', 89.99, 75, 'Electronics', 'KEYBOARD-001', '2024-03-05', '2026-03-05', 'new', TRUE),
('USB-C Hub', '7-in-1 USB-C hub with HDMI and card reader', 49.99, 100, 'Electronics', 'HUB-001', '2024-01-20', '2025-01-20', 'new', TRUE),
('Laptop Stand', 'Aluminum laptop stand with adjustable height', 39.99, 80, 'Accessories', 'STAND-001', '2023-12-15', '2025-12-15', 'used', TRUE),
('Webcam HD', '1080p webcam with built-in microphone', 69.99, 60, 'Electronics', 'WEBCAM-001', '2024-02-10', '2025-08-10', 'new', TRUE),
('Headphones Premium', 'Noise-cancelling wireless headphones', 199.99, 45, 'Electronics', 'HEADPHONE-001', '2024-04-01', '2026-04-01', 'new', TRUE),
('Monitor 27"', '4K IPS monitor with USB-C connectivity', 449.99, 30, 'Electronics', 'MONITOR-001', '2023-11-01', '2026-11-01', 'used', TRUE),
('Desk Lamp LED', 'Adjustable LED desk lamp with USB charging port', 34.99, 120, 'Accessories', 'LAMP-001', '2024-01-05', '2025-01-05', 'new', TRUE),
('Cable Organizer', 'Cable management box for desk organization', 19.99, 200, 'Accessories', 'CABLE-001', '2024-03-01', '2026-03-01', 'new', TRUE),
('External SSD 1TB', 'Portable SSD with USB 3.2 Gen 2', 129.99, 90, 'Electronics', 'SSD-001', '2024-02-12', '2027-02-12', 'new', TRUE),
('Phone Stand', 'Adjustable phone stand for desk', 14.99, 150, 'Accessories', 'PHONE-STAND-001', '2024-03-18', '2025-03-18', 'new', TRUE),
('Bluetooth Speaker', 'Portable Bluetooth speaker with 10h battery', 59.99, 85, 'Electronics', 'SPEAKER-001', '2024-04-05', '2026-04-05', 'new', TRUE),
('Laptop Bag', 'Premium laptop bag with multiple compartments', 79.99, 65, 'Accessories', 'BAG-001', '2024-01-25', '2026-01-25', 'new', TRUE),
('Screen Protector', 'Tempered glass screen protector for laptops', 24.99, 180, 'Accessories', 'SCREEN-001', '2024-02-20', '2026-02-20', 'new', TRUE);

INSERT INTO `orders` (`order_number`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `total_amount`, `status`, `payment_status`, `payment_method`) VALUES
('ORD-2026-001', 'John Smith', 'john.smith@example.com', '+1-555-0101', '123 Main St, New York, NY 10001, USA', '123 Main St, New York, NY 10001, USA', 1419.97, 'delivered', 'paid', 'credit_card'),
('ORD-2026-002', 'Maria Garcia', 'maria.garcia@example.com', '+1-555-0102', '456 Oak Ave, Los Angeles, CA 90001, USA', '456 Oak Ave, Los Angeles, CA 90001, USA', 159.97, 'shipped', 'paid', 'paypal'),
('ORD-2026-003', 'David Chen', 'david.chen@example.com', '+1-555-0103', '789 Pine Rd, San Francisco, CA 94102, USA', '789 Pine Rd, San Francisco, CA 94102, USA', 579.97, 'processing', 'paid', 'credit_card'),
('ORD-2026-004', 'Sarah Johnson', 'sarah.j@example.com', '+1-555-0104', '321 Elm St, Chicago, IL 60601, USA', '321 Elm St, Chicago, IL 60601, USA', 269.96, 'pending', 'pending', 'bank_transfer'),
('ORD-2026-005', 'Michael Brown', 'mbrown@example.com', '+1-555-0105', '654 Maple Dr, Boston, MA 02101, USA', '654 Maple Dr, Boston, MA 02101, USA', 1829.93, 'delivered', 'paid', 'credit_card'),
('ORD-2026-006', 'Emma Wilson', 'emma.w@example.com', '+1-555-0106', '987 Cedar Ln, Seattle, WA 98101, USA', '987 Cedar Ln, Seattle, WA 98101, USA', 84.98, 'cancelled', 'refunded', 'paypal'),
('ORD-2026-007', 'James Martinez', 'jmartinez@example.com', '+1-555-0107', '147 Birch St, Miami, FL 33101, USA', '147 Birch St, Miami, FL 33101, USA', 449.99, 'shipped', 'paid', 'credit_card'),
('ORD-2026-008', 'Lisa Anderson', 'lisa.a@example.com', '+1-555-0108', '258 Spruce Ave, Denver, CO 80201, USA', '258 Spruce Ave, Denver, CO 80201, USA', 119.98, 'delivered', 'paid', 'debit_card');

INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `product_price`, `quantity`, `subtotal`) VALUES
(1, 1, 'Laptop Pro 15"', 1299.99, 1, 1299.99),
(1, 2, 'Wireless Mouse', 29.99, 1, 29.99),
(1, 4, 'USB-C Hub', 49.99, 1, 49.99),
(1, 5, 'Laptop Stand', 39.99, 1, 39.99);

INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `product_price`, `quantity`, `subtotal`) VALUES
(2, 3, 'Mechanical Keyboard', 89.99, 1, 89.99),
(2, 2, 'Wireless Mouse', 29.99, 1, 29.99),
(2, 5, 'Laptop Stand', 39.99, 1, 39.99);

INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `product_price`, `quantity`, `subtotal`) VALUES
(3, 8, 'Monitor 27"', 449.99, 1, 449.99),
(3, 11, 'External SSD 1TB', 129.99, 1, 129.99);

INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `product_price`, `quantity`, `subtotal`) VALUES
(4, 7, 'Headphones Premium', 199.99, 1, 199.99),
(4, 6, 'Webcam HD', 69.99, 1, 69.99);

INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `product_price`, `quantity`, `subtotal`) VALUES
(5, 1, 'Laptop Pro 15"', 1299.99, 1, 1299.99),
(5, 8, 'Monitor 27"', 449.99, 1, 449.99),
(5, 14, 'Laptop Bag', 79.99, 1, 79.99);

INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `product_price`, `quantity`, `subtotal`) VALUES
(6, 13, 'Bluetooth Speaker', 59.99, 1, 59.99),
(6, 15, 'Screen Protector', 24.99, 1, 24.99);

INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `product_price`, `quantity`, `subtotal`) VALUES
(7, 8, 'Monitor 27"', 449.99, 1, 449.99);

INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `product_price`, `quantity`, `subtotal`) VALUES
(8, 9, 'Desk Lamp LED', 34.99, 2, 69.98),
(8, 10, 'Cable Organizer', 19.99, 1, 19.99),
(8, 2, 'Wireless Mouse', 29.99, 1, 29.99);
