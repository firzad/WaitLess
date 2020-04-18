---use Waitless;
-- Create Category Table
CREATE TABLE category(
category_id serial NOT NULL UNIQUE, 
category_name varchar(50) NOT NULL, 
visibility bool,  
position_in_menu integer UNIQUE,
PRIMARY KEY(category_id));
-- Create Ingredients Table
CREATE TABLE ingredients(
ingredient_id integer NOT NULL,
ingredient_name varchar(30) NOT NULL,  
price float, 
calorie float,
PRIMARY KEY(ingredient_id));
-- Create Menu Table
CREATE TABLE Menu(
menu_id serial NOT NULL UNIQUE,
category_id integer NOT NULL,
item_name varchar(50) NOT NULL, 
description varchar(150), 
price float NOT NULL, 
visibility bool, 
position_in_menu integer,  
date_added timestamp default current_timestamp, 
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
-- Create Summary Table
CREATE TABLE summary(
session_id bigserial NOT NULL UNIQUE, 
table_number integer NOT NULL,
date_order timestamp default current_timestamp NOT NULL,  
price float NOT NULL,
PRIMARY KEY(session_id));
-- Create table_details Table
CREATE TABLE table_details(
table_number serial NOT NULL UNIQUE, 
table_size integer, 
table_status varchar(50) NOT NULL,
current_session bigint,	
assistance bool,
PRIMARY KEY(table_number),
FOREIGN KEY(current_session) REFERENCES summary(session_id));
-- Create ticket Table
CREATE TABLE ticket(
ticket_id bigserial NOT NULL UNIQUE, 
session_id bigint NOT NULL, 
ticket_timestamp timestamp default current_timestamp,
table_number integer, 
ticket_status varchar(50) NOT NULL,
PRIMARY KEY(ticket_id),
FOREIGN KEY(table_number) REFERENCES table_details(table_number) ON DELETE CASCADE,
FOREIGN KEY(session_id) REFERENCES summary(session_id) ON DELETE CASCADE);
--- Create ticket order item table
CREATE TABLE ticket_item(
order_item_id bigserial NOT NULL UNIQUE,
ticket_id bigint NOT NULL,
menu_id integer NOT NULL,
ingredients_added varchar(200),
ingredients_removed varchar(200), 
remark varchar(200), 
item_status varchar(20) NOT NULL,
quantity integer NOT NULL,
PRIMARY KEY(order_item_id),
FOREIGN KEY(menu_id) REFERENCES Menu(menu_id) ON DELETE CASCADE,
FOREIGN KEY(ticket_id) REFERENCES ticket(ticket_id) ON DELETE CASCADE);