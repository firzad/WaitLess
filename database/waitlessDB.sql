use Waitless;
-- Create Category Table
CREATE TABLE category(
category_id integer NOT NULL, 
category_name varchar(50) NOT NULL, 
visibility bool,  
position_in_menu integer UNIQUE,
primary key(category_id));
-- Create Ingredients Table
CREATE TABLE ingredients(
ingredient_id integer NOT NULL,
ingredient_name varchar(30) NOT NULL,  
price float, 
calorie float,
PRIMARY KEY(ingredient_id));
-- Create Menu Table
CREATE TABLE Menu(
menu_id integer NOT NULL,
category_id integer NOT NULL,
item_name varchar(50) NOT NULL, 
description varchar(150), 
price float NOT NULL, 
visibility bool, 
position_in_menu integer,  
date_added timestamp, 
total_calories float, 
discount float,
PRIMARY KEY(menu_id),
FOREIGN KEY(category_id) REFERENCES category(category_id) ON DELETE CASCADE);
-- Create itemdetails Table
CREATE TABLE itemdetails(
menu_id integer NOT NULL, 
ingredient_id integer NOT NULL, 
modifiable bool, 
quantity integer,  
default_ingredient bool NOT NULL,
PRIMARY KEY(menu_id,ingredient_id),
FOREIGN KEY(menu_id) REFERENCES Menu(menu_id) ON DELETE CASCADE,
FOREIGN KEY(ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE CASCADE);
-- Create table_details Table
CREATE TABLE table_details(
table_number BIGSERIAL NOT NULL UNIQUE , 
table_size integer, 
table_status varchar(50) NOT NULL,
PRIMARY KEY(table_number));
-- Create ticket Table
CREATE TABLE ticket(
serial_id serial,  
session_ID integer NOT NULL, 
ticket_id integer NOT NULL UNIQUE, 
menu_id integer NOT NULL, 
ticket_timestamp timestamp,
table_number integer, 
ingredients_added varchar(200),
ingredients_removed varchar(200), 
remark varchar(200), 
item_Status varchar(20) NOT NULL,
PRIMARY KEY(ticket_id),
FOREIGN KEY(table_number) REFERENCES table_details(table_number) ON DELETE CASCADE,
FOREIGN KEY(menu_id) REFERENCES Menu(menu_id) ON DELETE CASCADE);
-- Create Summary Table
CREATE TABLE summary(
summary_id serial, 
session_id integer NOT NULL UNIQUE, 
date_order timestamp NOT NULL, 
price float NOT NULL,
PRIMARY KEY(session_id));
