-- CREATE DATABASE meal_budgeter;

USE meal_budgeter;

INSERT INTO users (username, password, createdAt, updatedAt) VALUES ('User1', '$2a$10$MtdGCk8X7B6dN.m21zmEoeK6AIqiHC0MwQxToCfKJcLK27P.UFwgi', NOW(), NOW());

INSERT INTO users (username, password, createdAt, updatedAt) VALUES ('User2', '$2a$10$MtdGCk8X7B6dN.m21zmEoeK6AIqiHC0MwQxToCfKJcLK27P.UFwgi', NOW(), NOW());

INSERT INTO ingredients (item, price, createdAt, updatedAt) VALUES('egg', 0.50, NOW(), NOW()), ('salt', 0, NOW(), NOW()), ('sugar', 0, NOW(), NOW()), ('chocolate', 2.00, NOW(), NOW()), ('vanilla extract', 0, NOW(), NOW()), ('flour', 0, NOW(), NOW());

INSERT INTO recipes (title, method, image, createdAt, updatedAt, UserId) VALUES('Boiled Egg', 'Add egg to cold water. Bring water to boil. Cook.', 'https://cdn.pixabay.com/photo/2019/06/03/22/06/breakfast-4250077_960_720.jpg', NOW(), NOW(), 1);

INSERT INTO recipes (title, method, image, createdAt, updatedAt, UserId) VALUES('Chocolate Cake', 'Add eggs, flour, chocolate to pan. Bake at 350 for 1 hour', 'https://cdn.pixabay.com/photo/2016/11/22/18/52/cake-1850011_1280.jpg', NOW(), NOW(), 2);

INSERT INTO measures (measure_metric, createdAt, updatedAt) VALUES ("unit", NOW(), NOW());

INSERT INTO measures (measure_metric, createdAt, updatedAt) VALUES ("cup", NOW(), NOW());

INSERT INTO measures (measure_metric, createdAt, updatedAt) VALUES ("tsp", NOW(), NOW());

INSERT INTO measures (measure_metric, createdAt, updatedAt) VALUES ("tbsp", NOW(), NOW());

INSERT INTO measures (measure_metric, createdAt, updatedAt) VALUES ("g", NOW(), NOW());

INSERT INTO measures (measure_metric, createdAt, updatedAt) VALUES ("kg", NOW(), NOW());

INSERT INTO measures (measure_metric, createdAt, updatedAt) VALUES ("ml", NOW(), NOW());

INSERT INTO measures (measure_metric, createdAt, updatedAt) VALUES ("litre", NOW(), NOW());

INSERT INTO measures (measure_metric, createdAt, updatedAt) VALUES ("unit", NOW(), NOW());

INSERT INTO measures (measure_metric, createdAt, updatedAt) VALUES ("mg", NOW(), NOW());

INSERT INTO measures (measure_metric, createdAt, updatedAt) VALUES ("lb", NOW(), NOW());

INSERT INTO measures (measure_metric, createdAt, updatedAt) VALUES ("oz", NOW(), NOW());

INSERT INTO measures (measure_metric, createdAt, updatedAt) VALUES ("fl oz", NOW(), NOW());

INSERT INTO measures (measure_metric, createdAt, updatedAt) VALUES ("cm", NOW(), NOW());

INSERT INTO ratings (rating, createdAt, updatedAt, recipe_id, user_id) VALUES (2, NOW(), NOW(), 1, 1);

INSERT INTO ratings (rating, createdAt, updatedAt, recipe_id, user_id) VALUES (3, NOW(), NOW(), 1, 2);

INSERT INTO ratings (rating, createdAt, updatedAt, recipe_id, user_id) VALUES (4, NOW(), NOW(), 2, 1);

INSERT INTO ratings (rating, createdAt, updatedAt, recipe_id, user_id) VALUES (5, NOW(), NOW(), 2, 2);

INSERT INTO recipe_ingredients (quantity, createdAt, updatedAt, measure_id, recipe_id, ingredient_id) VALUES (2, NOW(), NOW(), 1, 1, 1);

INSERT INTO recipe_ingredients (quantity, createdAt, updatedAt, measure_id, recipe_id, ingredient_id)  VALUES (2, NOW(), NOW(), 1, 2, 1);

INSERT INTO recipe_ingredients (quantity, createdAt, updatedAt, measure_id, recipe_id, ingredient_id)  VALUES (2, NOW(), NOW(),2, 2, 2);

INSERT INTO recipe_ingredients (quantity, createdAt, updatedAt, measure_id, recipe_id, ingredient_id)  VALUES (5, NOW(), NOW(), 2, 2, 3);

INSERT INTO recipe_ingredients (quantity, createdAt, updatedAt, measure_id, recipe_id, ingredient_id)  VALUES (10, NOW(), NOW(), 2, 2, 4);


SELECT * FROM recipe_ingredients;
SELECT * FROM ingredients;
SELECT * FROM measures;
SELECT * FROM recipes;
SELECT * FROM users;