USE meal_budgeter;

INSERT INTO users (username, password, createdAt, updatedAt) VALUES ('User1', '$2a$10$MtdGCk8X7B6dN.m21zmEoeK6AIqiHC0MwQxToCfKJcLK27P.UFwgi', NOW(), NOW());

INSERT INTO users (username, password, createdAt, updatedAt) VALUES ('User2', '$2a$10$MtdGCk8X7B6dN.m21zmEoeK6AIqiHC0MwQxToCfKJcLK27P.UFwgi', NOW(), NOW());

-- INSERT INTO measure (name) VALUES('CUP'), ('TEASPOON'), ('TABLESPOON');

INSERT INTO ingredients (item, price, createdAt, updatedAt) VALUES('egg', 0.50, NOW(), NOW()), ('salt', 0, NOW(), NOW()), ('sugar', 0, NOW(), NOW()), ('chocolate', 2.00, NOW(), NOW()), ('vanilla extract', 0, NOW(), NOW()), ('flour', 0, NOW(), NOW());

INSERT INTO recipes (title, method, createdAt, updatedAt, UserId) VALUES('Boiled Egg', 'Add egg to cold water. Bring water to boil. Cook.', NOW(), NOW(), 1);

INSERT INTO recipes (title, method, createdAt, updatedAt, UserId) VALUES('Chocolate Cake', 'Add eggs, flour, chocolate to pan. Bake at 350 for 1 hour', NOW(), NOW(), 2);

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

INSERT INTO recipe_ingredients (amount, createdAt, updatedAt, ingredient_id, measure_id, recipe_id) VALUES (1, NOW(), NOW(), 1, 1, 1);

INSERT INTO recipe_ingredients (amount, createdAt, updatedAt, ingredient_id, measure_id, recipe_id)  VALUES (1, NOW(), NOW(), 1, 1, 2);

INSERT INTO recipe_ingredients (amount, createdAt, updatedAt, ingredient_id, measure_id, recipe_id)  VALUES (0.5, NOW(), NOW(), 2, 3, 2);

INSERT INTO recipe_ingredients (amount, createdAt, updatedAt, ingredient_id, measure_id, recipe_id)  VALUES (1, NOW(), NOW(), 3, 2, 2);

INSERT INTO recipe_ingredients (amount, createdAt, updatedAt, ingredient_id, measure_id, recipe_id)  VALUES (100, NOW(), NOW(), 4, 5, 2);