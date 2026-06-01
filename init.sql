CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price_from NUMERIC(10, 2),
    description TEXT
);


CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(100) NOT NULL
);


CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pet_id INT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    service_id INT NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    problem_description TEXT,
    status VARCHAR(50) DEFAULT 'pending'
);