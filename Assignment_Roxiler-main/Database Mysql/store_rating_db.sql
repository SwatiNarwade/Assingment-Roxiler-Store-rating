CREATE TABLE roles (
    roleId INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(15) NOT NULL,
    createdBy CHAR(7) DEFAULT 'SYSTEM',
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    modifiedDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    activeState BOOLEAN DEFAULT TRUE
);


CREATE TABLE Users (
    UserId INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(10) NOT NULL,
    MiddleName VARCHAR(10),
    LastName VARCHAR(10) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Phone VARCHAR(10) NOT NULL,
    Address VARCHAR(100),
    IsRegistered BOOLEAN DEFAULT TRUE,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    ModifiedDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ActiveState BOOLEAN DEFAULT TRUE,	
    roleId INT,
    FOREIGN KEY (roleId) REFERENCES Roles(roleId)
);


CREATE TABLE stores (
    StoreId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    UserId INT NOT NULL,  -- Foreign key for the store owner
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES users(UserId)
);

CREATE TABLE ratings (
    ratingId INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT,
    StoreId INT,
    rating TINYINT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    rated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES users(UserId),
    FOREIGN KEY (StoreId) REFERENCES stores(StoreId)
);

ALTER TABLE roles
MODIFY COLUMN role VARCHAR(25) NOT NULL;



-- Sample data

INSERT INTO Roles (Role) VALUES 
('System Administrator'),
('Normal User'),
('Store Owner');


ALTER TABLE ratings
ADD CONSTRAINT unique_user_store_rating UNIQUE (UserId, StoreId);




