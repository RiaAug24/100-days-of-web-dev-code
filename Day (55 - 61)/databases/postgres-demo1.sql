CREATE TABLE restaurant 
(
	R_ID SERIAL PRIMARY KEY,
	R_Name VARCHAR(30) NOT NULL,
	R_Type VARCHAR(20) NOT NULL
);


CREATE TABLE Addresses
(
	A_id INT PRIMARY KEY,
	Street VARCHAR(30) NOT NULL,
	Street_No INT NOT NULL,
	City VARCHAR(30) NOT NULL,
	Post_code INT NOT NULL,
	Country_name VARCHAR(30) NOT NULL
);

CREATE TABLE Rest_Types
(
	Type_id INT PRIMARY KEY,
	Type_name VARCHAR(30) NOT NULL
);




CREATE TABLE Reviews
(
	Review_id SERIAL UNIQUE,
	Reviewer_Name VARCHAR(30) NOT NULL,
	Rating REAL CHECK(Rating >=1 AND Rating <= 5),
	Description VARCHAR(200),
	Review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	R_id int NOT NULL,
	CONSTRAINT fk_restaurant FOREIGN KEY (R_id) REFERENCES restaurant(R_ID)
);

DROP TABLE reviews
ALTER TABLE restaurant
ADD COLUMN Address_Id INT UNIQUE;

ALTER TABLE restaurant
ADD COLUMN Type_id INT UNIQUE;

ALTER TABLE restaurant
ADD CONSTRAINT fk_address FOREIGN KEY (Address_id) REFERENCES addresses (A_id);

ALTER TABLE restaurant
ADD CONSTRAINT fk_type FOREIGN KEY (Type_id) REFERENCES rest_types (Type_id);



SELECT * FROM restaurant;
SELECT * FROM rest_types;
SELECT * FROM addresses;
SELECT * FROM reviews;

INSERT INTO addresses VALUES
(1231, 'Agolv Lane', 501, 'Vanchester', 56100, 'USA'),
(1232, 'Rangers Highline', 591, 'Maonglo', 56100, 'England'),
(1233, 'Mojo Street', 891, 'Besterile', 56100, 'Germany');


-- UPDATE addresses SET post_code = 82191 WHERE Street_No = 891;

INSERT INTO rest_types VALUES
(1001, 'Indian'),
(1002, 'American'),
(1003, 'German');

INSERT INTO restaurant(r_name, r_type, address_id, type_id) VALUES
('Crunchy Bites', 'Indian', 1232, 1001),
('TastaPasta', 'German', 1233, 1003),
('Gulp Cooks', 'American', 1231, 1002);

--Will not work! Foreign key constraint
--UPDATE restaurant SET address_id= 1931 WHERE r_type = 'American'

INSERT INTO reviews VALUES 
(19901, 'Riyaz Ahmed', 4, 'Tasty & Awesome Food!', default, 2);

INSERT INTO reviews VALUES 
(19902, 'Tony Stark', 5, 'Delighted with the service and Food Quality ^o^ !', default, 1),
(19903, 'John Doe', 3, 'Great !', default, 3);


SELECT rest.r_name, adrs.city, rt.type_name 
FROM restaurant AS rest
INNER JOIN addresses AS adrs ON rest.address_id = adrs.a_id
INNER JOIN rest_types AS rt ON rest.type_id = rt.type_id
WHERE R_id IN (1, 3);

