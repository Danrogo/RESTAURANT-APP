-- =============================================
-- DATABASE: Restaurant Ordering System
-- =============================================
DROP TABLE IF EXISTS OrderItems, Orders, MenuItems, Categories, Restaurants, Users;
GO

-- 1️⃣ USERS
CREATE TABLE Users1 (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name NVARCHAR(50) NOT NULL,
    last_name NVARCHAR(50) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    phone_number NVARCHAR(15),
    password NVARCHAR(255) NOT NULL,
    user_type NVARCHAR(20) NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
);

INSERT INTO Users1 (first_name, last_name, email, phone_number, password, user_type)
VALUES
('John', 'Doe', 'john@example.com', '0712345678', 'pass123', 'customer'),
('Jane', 'Smith', 'jane@example.com', '0723456789', 'pass456', 'customer'),
('Mike', 'Johnson', 'mike@burgerhouse.com', '0734567890', 'admin123', 'restaurant_owner');

-- 2️⃣ RESTAURANTS
CREATE TABLE Restaurants (
    restaurant_id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(500),
    address NVARCHAR(200),
    city NVARCHAR(50),
    phone_number NVARCHAR(15),
    email NVARCHAR(100),
    opening_time TIME,
    closing_time TIME,
    cuisine_type NVARCHAR(50),
    is_active BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE()
);

INSERT INTO Restaurants (name, description, address, city, phone_number, email, opening_time, closing_time, cuisine_type)
VALUES
('Burger House', 'Best burgers in town', '123 High Street', 'Nairobi', '0711223344', 'info@burgerhouse.com', '09:00', '22:00', 'Fast Food'),
('Mama Mia Pizza', 'Authentic Italian Pizza', '45 Pizza Ave', 'Nakuru', '0722556677', 'contact@mamamia.com', '10:00', '23:00', 'Italian');

-- 3️⃣ CATEGORIES
CREATE TABLE Categories (
    category_id INT IDENTITY(1,1) PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name NVARCHAR(50) NOT NULL,
    description NVARCHAR(255),
    is_active BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);

INSERT INTO Categories (restaurant_id, name, description)
VALUES
(1, 'Burgers', 'Delicious beef and chicken burgers'),
(1, 'Drinks', 'Soft drinks and milkshakes'),
(2, 'Pizzas', 'All kinds of pizzas'),
(2, 'Sides', 'Garlic bread and fries');

-- 4️⃣ MENU ITEMS
CREATE TABLE MenuItems (
    menu_item_id INT IDENTITY(1,1) PRIMARY KEY,
    restaurant_id INT NOT NULL,
    category_id INT NOT NULL,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(500),
    price DECIMAL(10,2) NOT NULL,
    is_available BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

INSERT INTO MenuItems (restaurant_id, category_id, name, description, price)
VALUES
(1, 1, 'Classic Beef Burger', 'Juicy grilled beef patty with cheese', 650.00),
(1, 1, 'Chicken Burger', 'Crispy fried chicken burger', 600.00),
(1, 2, 'Chocolate Milkshake', 'Rich chocolate shake', 300.00),
(2, 3, 'Pepperoni Pizza', 'Mozzarella and pepperoni', 900.00),
(2, 3, 'Veggie Pizza', 'Topped with fresh vegetables', 850.00),
(2, 4, 'Garlic Bread', 'Crispy garlic bread with butter', 250.00);

-- 5️⃣ ORDERS
CREATE TABLE Orders (
    order_id INT IDENTITY(1,1) PRIMARY KEY,
    restaurant_id INT NOT NULL,
    customer_id INT NOT NULL,
    order_type NVARCHAR(20),
    status NVARCHAR(20) DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id),
    FOREIGN KEY (customer_id) REFERENCES Users(user_id)
);

INSERT INTO Orders (restaurant_id, customer_id, order_type, status, total_amount)
VALUES
(1, 1, 'pickup', 'completed', 950.00),
(2, 2, 'delivery', 'pending', 1150.00);

-- 6️⃣ ORDER ITEMS
CREATE TABLE OrderItems (
    order_item_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (menu_item_id) REFERENCES MenuItems(menu_item_id)
);

INSERT INTO OrderItems (order_id, menu_item_id, quantity, unit_price, total_price)
VALUES
(1, 1, 1, 650.00, 650.00),
(1, 3, 1, 300.00, 300.00),
(2, 4, 1, 900.00, 900.00),
(2, 6, 1, 250.00, 250.00)