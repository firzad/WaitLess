-- Creates a sample order scenario. 
-- NOTE requires running the insertIntoTables script atul wrote to generate a menu
-- Create 4 empty tables in the restaurant
insert into table_details (table_size, table_status) 
	values (2, 'Empty');
insert into table_details (table_size, table_status) 
	values (3, 'Empty');
insert into table_details (table_size, table_status) 
	values (2, 'Empty');
insert into table_details (table_size, table_status) 
	values (4, 'Empty');

---Customer enters and is seated, create a new session (IMPORTANT!! RENAME DATE_ORDER TO DATE_SEATED!! remind james <-)
insert into summary (table_number, date_order, price)
	values (1,'2020-04-08 10:00:00',0);
update table_details set table_status='Seated', current_session='1' where table_number=1;


---customer is now seated and places an order of 2 meals
insert into ticket (session_id, ticket_timestamp, table_number)
	values (1, '2020-04-08 10:30:00', 1); --create the ticket
insert into ticket_item(ticket_id, menu_id, remark, item_status)
	values (1, 1001, 'Extra hot', 'Delivered'); --create the food item
insert into ticket_item(ticket_id, menu_id, remark, item_status)
	values (1, 1002, 'Not very hot', 'Delivered');
update table_details set table_status='Ordered' where table_number=1;

---customer places a second order containing 3 meals
insert into ticket (session_id, ticket_timestamp, table_number)
	values (1, '2020-04-08 11:00:00', 1); --create the ticket
insert into ticket_item(ticket_id, menu_id, remark, item_status)
	values (2, 1001, '', 'Delivered'); --create the food item
insert into ticket_item(ticket_id, menu_id, remark, item_status)
	values (2, 1003, 'extra pepper', 'Delivered');
insert into ticket_item(ticket_id, menu_id, remark, item_status)
	values (2, 1004, 'no salt thanks', 'Delivered');
