-- Sample values into the static tables have been added
-- INSERT INTO CATEGORY
INSERT INTO category VALUES(
	101,'Mains',TRUE,1);
INSERT INTO category VALUES(
	102,'Tacos',TRUE,2);
INSERT INTO category VALUES(
	103,'Minis',TRUE,3);
INSERT INTO category VALUES(
	104,'Sides',TRUE,4);
INSERT INTO category VALUES(
	105,'Desserts',TRUE,5);
INSERT INTO category VALUES(
	106,'Kids',FALSE,6);
-- INSERT INTO MENU
INSERT INTO menu VALUES	(
	1001,101,'Burrito','With rice, cheese and beans', 14.9, TRUE, 1, '2020-3-26', 206, 0
);
INSERT INTO menu VALUES	(
	1002,101,'Burrito Bowl','With rice, cheese and beans', 14.9, TRUE, 2, '2020-3-26', 426, 0
);
INSERT INTO menu VALUES	(
	1003,102,'Three Soft Tacos','Mexican street style salsa in soft flour tortilla', 14.4, TRUE, 1, '2020-3-26', 469, 0
);
INSERT INTO menu VALUES	(
	1004,102,'Two Hard Tacos','Mexican street style salsa in soft flour tortilla', 11.9, TRUE, 2, '2020-3-26', 324, 0
);
INSERT INTO menu VALUES	(
	1005,103,'Mini Cali Burrito','With rice, cheese and beans', 10.3, TRUE, 1, '2020-3-27', 251, 0
);
INSERT INTO menu VALUES	(
	1006,103,'Mini Nachos','Corn chips, cheese and beans', 11.9, TRUE, 2, '2020-3-27', 347, 0
);
INSERT INTO menu VALUES	(
	1007,104,'Guacamole','', 3.8, TRUE, 1, '2020-3-28', 100, 0
);
INSERT INTO menu VALUES	(
	1008,105,'Churros','Churros rolled in cinnamon sugar', 3.8, TRUE, 1, '2020-3-28', 264, 0
);
-- INSERT INTO INGREDIENTS
INSERT INTO ingredients VALUES(
	101,'Rice',0.5,100
);
INSERT INTO ingredients VALUES(
	102,'Cheese',2.5,250
);
INSERT INTO ingredients VALUES(
	103,'Beans',1.5,347
);
INSERT INTO ingredients VALUES(
	104,'Grilled Chicken',1.5,226
);
INSERT INTO ingredients VALUES(
	105,'Jalapenos',0.5,28
);
-- INSERT INTO ITEMDETAILS
INSERT INTO itemdetails VALUES(
	1001,101,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1001,102,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1001,103,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1002,101,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1002,102,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1002,103,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1005,101,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1005,102,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1005,103,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1006,101,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1006,102,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1006,103,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1001,104,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	1002,104,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	1005,104,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	1003,102,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1003,103,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1003,105,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1004,102,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1004,103,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1004,104,TRUE,1,TRUE
);
