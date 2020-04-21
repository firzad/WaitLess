INSERT INTO category VALUES(
	1,'Mains',TRUE,1);
INSERT INTO category VALUES(
	2,'Sides',TRUE,2);
INSERT INTO category VALUES(
	3,'Salads',TRUE,3);
INSERT INTO category VALUES(
	4,'Desserts',TRUE,4);
INSERT INTO category VALUES(
	5,'Drinks',TRUE,5);

------------------------
-------MENU ITEMS-------
------------------------
--mains
INSERT INTO menu VALUES	(
	1, 1,'Chicken Burger','100% Australian grown chicken', 12, TRUE, 1,
	current_timestamp, 206, 0, 'chicken_burger1.jpg'
);
INSERT INTO menu VALUES	(
	2, 1,'Double Chicken Burger','100% Australian grown chicken with 2 patties and salad', 15, TRUE, 2,
	current_timestamp, 206, 0, 'chicken_burger2.jpg'
);
INSERT INTO menu VALUES	(
	3, 1,'Deluxe Chicken Burger','Very large chicken burger with the works', 18, TRUE, 3,
	current_timestamp, 206, 0, 'chicken_burger3.jpg'
);
INSERT INTO menu VALUES	(
	4, 1,'Plain Veggie Burger','100% vegetarian lentil patty', 15, TRUE, 4,
	current_timestamp, 206, 0, 'veggie_burger1.jpg'
);
INSERT INTO menu VALUES	(
	5, 1,'Deluxe Veggie Burger','Veggie burger with a double patty ', 18, TRUE, 5,
	current_timestamp, 206, 0, 'veggie_burger1.jpg'
);
INSERT INTO menu VALUES	(
	6, 1,'Burger Combo 1','Chicken burger with chips ', 16, TRUE, 6,
	current_timestamp, 206, 0, 'burger_combo1.jpg'
);
INSERT INTO menu VALUES	(
	7, 1,'Burger Combo 2','Beef burger with Chips ', 17, TRUE, 7,
	current_timestamp, 206, 0, 'burger_combo2.jpg'
);
INSERT INTO menu VALUES	(
	8, 1,'Steak Roll','100% Australian steak in a sourdough roll ', 15, TRUE, 8,
	current_timestamp, 206, 0, 'steak_roll1.jpg'
);
INSERT INTO menu VALUES	(
	9, 1,'Chicken Wrap','Diced chicken in a salad wrap ', 13, TRUE, 9,
	current_timestamp, 206, 0, 'wrap1.jpg'
);
INSERT INTO menu VALUES	(
	10, 1,'Deluxe Chicken Wrap','Large chicken wrap with the works in homemade dressing ', 15, TRUE, 10,
	current_timestamp, 206, 0, 'wrap2.jpg'
);

--sides
INSERT INTO menu VALUES	(
	11, 2,'Wedges','Australian grown potato wedges', 6, TRUE, 1,
	current_timestamp, 206, 0, 'wedges1.jpg'
);
INSERT INTO menu VALUES	(
	12, 2,'Chips','Potato Chips', 5, TRUE, 2,
	current_timestamp, 206, 0, 'chips1.jpg'
);
INSERT INTO menu VALUES	(
	13, 2,'Onion Rings','Coated onion rings', 6, TRUE, 3,
	current_timestamp, 206, 0, 'onion_rings1.jpg'
);
INSERT INTO menu VALUES	(
	14, 2,'Potato Scallops','Battered and deep fried potato scallops', 6, TRUE, 4,
	current_timestamp, 206, 0, 'scallops1.jpg'
);

--salads
INSERT INTO menu VALUES	(
	15, 3,'Caesar Salad','Fresh salad with homemade caesar dressing', 7, TRUE, 1,
	current_timestamp, 206, 0, 'salad1.jpg'
);
INSERT INTO menu VALUES	(
	16, 3,'Ranch Salad','Fresh salad with homemade ranch dressing', 7, TRUE, 2,
	current_timestamp, 206, 0, 'salad2.jpg'
);
INSERT INTO menu VALUES	(
	17, 3,'Greek Salad','Fresh greek salad', 7, TRUE, 3,
	current_timestamp, 206, 0, 'salad3.jpg'
);

--desserts
INSERT INTO menu VALUES	(
	18, 4,'Ice-Cream','Double scoop ice cream in a cone', 4, TRUE, 1,
	current_timestamp, 206, 0, 'icecream1.jpg'
);
INSERT INTO menu VALUES	(
	19, 4,'Large Ice-Cream','Triple scoop ice cream in a cone', 7, TRUE, 2,
	current_timestamp, 206, 0, 'icecream2.jpg'
);
INSERT INTO menu VALUES	(
	20, 4,'Cinnamon Donut','Freshly baked cinnamon donuts ', 4, TRUE, 3,
	current_timestamp, 206, 0, 'donut1.jpg'
);
INSERT INTO menu VALUES	(
	21, 4,'churros1','Freshly baked churros with chocolate dip ', 7, TRUE, 4,
	current_timestamp, 206, 0, 'donut1.jpg'
);

--drinks
INSERT INTO menu VALUES	(
	22, 5,'Coke','600ml coke ', 4, TRUE, 1,
	current_timestamp, 206, 0, 'coke.jpg'
);
INSERT INTO menu VALUES	(
	23, 5,'Sprite','600ml sprite ', 5, TRUE, 2,
	current_timestamp, 206, 0, 'sprite.jpg'
);
INSERT INTO menu VALUES	(
	24, 5,'Milkshake','Dairy and soy options ', 7, TRUE, 3,
	current_timestamp, 206, 0, 'milkshake.jpg'
);
INSERT INTO menu VALUES	(
	25, 5,'Latte','With freshly ground beans', 3.5, TRUE, 4,
	current_timestamp, 206, 0, 'latte.jpg'
);
------------------------
------------------------



-------------------------
-------INGREDIENTS-------
INSERT INTO ingredients VALUES(
	1,'Glutton Free',0,100
);
INSERT INTO ingredients VALUES(
	2,'Chili',0,100
);
INSERT INTO ingredients VALUES(
	3,'Pickles',0,100
);
INSERT INTO ingredients VALUES(
	4,'Egg',2,100
);
INSERT INTO ingredients VALUES(
	5,'Olives',0,100
);
INSERT INTO ingredients VALUES(
	6,'Soy Milk',0,100
);
INSERT INTO ingredients VALUES(
	7,'Almond Milk',0,100
);
INSERT INTO ingredients VALUES(
	8,'Extra Cheese',0,100
);
INSERT INTO ingredients VALUES(
	9,'Tomato',0,100
);
INSERT INTO ingredients VALUES(
	10,'Capsicum',0,100
);
INSERT INTO ingredients VALUES(
	11,'Tomato Sauce',0,100
);
INSERT INTO ingredients VALUES(
	12,'Barbeque Sauce',0,100
);
INSERT INTO ingredients VALUES(
	13,'Vegan',0,100
);
INSERT INTO ingredients VALUES(
	14,'Chicken Salt',0,100
);
INSERT INTO ingredients VALUES(
	15,'100% Australian Chicken Patty',0,100
);
INSERT INTO ingredients VALUES(
	16,'Sesame Seed Bun',0,100
);
INSERT INTO ingredients VALUES(
	17,'Lentil Patty',0,100
);
INSERT INTO ingredients VALUES(
	18,'100% Australian Beef Patty',0,100
);
INSERT INTO ingredients VALUES(
	19,'Sourdough Bun',0,100
);
INSERT INTO ingredients VALUES(
	20,'Bread Wrap',0,100
);
INSERT INTO ingredients VALUES(
	21,'Chicken Strips',0,100
);
INSERT INTO ingredients VALUES(
	22,'Potato Wedges',0,100
);
INSERT INTO ingredients VALUES(
	23,'Potato Chips',0,100
);
INSERT INTO ingredients VALUES(
	24,'Extra Chocolate',0,100
);
------------------------------------
------------------------------------


------------------------------------
-------MENU ITEM DEPENDENCIES-------
------------------------------------
---mains
--chicken burger
INSERT INTO itemdetails VALUES(
	1,1,TRUE,1,FALSE
); 
INSERT INTO itemdetails VALUES(
	1,2,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	1,15,FALSE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	1,16,FALSE,1,TRUE
);
-- double chicken burger
INSERT INTO itemdetails VALUES(
	2,1,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	2,2,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	2,15,FALSE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	2,16,FALSE,1,TRUE
);
--deluxe chicken burer
INSERT INTO itemdetails VALUES(
	3,1,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	3,2,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	3,15,FALSE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	3,16,FALSE,1,TRUE
);
--plain veggie burger
INSERT INTO itemdetails VALUES(
	4,1,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	4,2,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	4,13,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	4,17,FALSE,1,TRUE
);
--deluxe veggie burger
INSERT INTO itemdetails VALUES(
	5,1,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	5,2,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	5,13,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	5,17,FALSE,1,TRUE
);
--burger combo 1
INSERT INTO itemdetails VALUES(
	6,1,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	6,2,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	6,16,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	6,15,FALSE,1,TRUE
);
-- burger combo 2
INSERT INTO itemdetails VALUES(
	7,1,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	7,2,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	7,16,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	7,18,FALSE,1,TRUE
);
--steak roll
INSERT INTO itemdetails VALUES(
	8,2,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	8,19,FALSE,1,TRUE
);
--chicken wrap
INSERT INTO itemdetails VALUES(
	9,1,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	9,5,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	9,8,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	9,20,FALSE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	9,21,FALSE,1,TRUE
);
--deluxe chicken wrap
INSERT INTO itemdetails VALUES(
	10,1,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	10,5,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	10,8,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	10,20,FALSE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	10,21,FALSE,1,TRUE
);

---sides
--wedges
INSERT INTO itemdetails VALUES(
	11,14,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	11,22,FALSE,1,TRUE
);
--chips
INSERT INTO itemdetails VALUES(
	12,14,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	12,23,FALSE,1,TRUE
);
--onion rings
INSERT INTO itemdetails VALUES(
	13,14,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	13,14,TRUE,1,FALSE
);
--scallops
INSERT INTO itemdetails VALUES(
	14,14,TRUE,1,FALSE
);

---salads
--caesar salad
INSERT INTO itemdetails VALUES(
	15,5,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	15,9,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	15,10,TRUE,1,FALSE
);
--ranch salad
INSERT INTO itemdetails VALUES(
	16,5,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	16,9,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	16,10,TRUE,1,FALSE
);
--greek salad
INSERT INTO itemdetails VALUES(
	17,5,TRUE,1,TRUE
);
INSERT INTO itemdetails VALUES(
	17,9,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	17,10,TRUE,1,FALSE
);

---desserts
--icecream
INSERT INTO itemdetails VALUES(
	18,1,TRUE,1,FALSE
);
--large ice cream
INSERT INTO itemdetails VALUES(
	19,1,TRUE,1,FALSE
);
--donut
INSERT INTO itemdetails VALUES(
	20,1,TRUE,1,FALSE
);
--churros
INSERT INTO itemdetails VALUES(
	21,1,TRUE,1,FALSE
);
INSERT INTO itemdetails VALUES(
	21,24,TRUE,1,FALSE
);

---drinks
--coke
--sprite
--milkshake
INSERT INTO itemdetails VALUES(
	24,6,TRUE,1,FALSE
);
--latte
INSERT INTO itemdetails VALUES(
	25,6,TRUE,1,FALSE
);
