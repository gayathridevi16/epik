CREATE DATABASE epik_task;


CREATE table student_details(
	std_id SERIAL PRIMARY KEY,
	std_name VARCHAR NOT NULL,
	std_address VARCHAR NOT NULL,
	std_class VARCHAR NOT NULL,
	created_on TIMESTAMP DEFAULT now()
);

CREATE TABLE student_parent_details(
	pd_id SERIAL PRIMARY KEY,
	pd_name VARCHAR NOT NULL,
	pd_phone_no NUMERIC NOT NULL,
	created_on TIMESTAMP DEFAULT now()
);

INSERT INTO student_details (std_id, std_name, std_address, std_class)
VALUES (1, 'Jacob', 'NY', '10A'),(2, 'Emily', 'FR', '9B');

INSERT INTO student_parent_details (pd_id, pd_name, pd_phone_no)
VALUES (1, 'Wilston', 9876543210),(2, 'Cooper', 9876501234);

