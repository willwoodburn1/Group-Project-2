USE meal_budgeter;

INSERT INTO users (name, email, password, createdAt, updatedAt) VALUES ('User1', 'user1@email.com', '$2a$10$MtdGCk8X7B6dN.m21zmEoeK6AIqiHC0MwQxToCfKJcLK27P.UFwgi', NOW(), NOW());

INSERT INTO users (name, email, password, createdAt, updatedAt) VALUES ('User2', 'user2@email.com', '$2a$10$MtdGCk8X7B6dN.m21zmEoeK6AIqiHC0MwQxToCfKJcLK27P.UFwgi', NOW(), NOW());

-- INSERT INTO measure (name) VALUES('CUP'), ('TEASPOON'), ('TABLESPOON');

INSERT INTO ingredients (item, price, createdAt, updatedAt) VALUES('egg', 0.50, NOW(), NOW()), ('salt', 0, NOW(), NOW()), ('sugar', 0, NOW(), NOW()), ('chocolate', 2.00, NOW(), NOW()), ('vanilla extract', 0, NOW(), NOW()), ('flour', 0, NOW(), NOW());

INSERT INTO recipes (title, method, createdAt, updatedAt, UserId) VALUES('Boiled Egg', 'Add egg to cold water. Bring water to boil. Cook.', NOW(), NOW(), 1);

INSERT INTO recipes (title, method, createdAt, updatedAt, UserId) VALUES('Chocolate Cake', 'Add eggs, flour, chocolate to pan. Bake at 350 for 1 hour', NOW(), NOW(), 2);

INSERT INTO recipe_ingredients (createdAt, updatedAt, recipe_id, ingredient_id) VALUES (NOW(), NOW(), 1, 1);

INSERT INTO recipe_ingredients (createdAt, updatedAt, recipe_id, ingredient_id)  VALUES (NOW(), NOW(), 2, 1);

INSERT INTO recipe_ingredients (createdAt, updatedAt, recipe_id, ingredient_id)  VALUES (NOW(), NOW(), 2, 2);

INSERT INTO recipe_ingredients (createdAt, updatedAt, recipe_id, ingredient_id)  VALUES (NOW(), NOW(), 2, 3);

INSERT INTO recipe_ingredients (createdAt, updatedAt, recipe_id, ingredient_id)  VALUES (NOW(), NOW(), 2, 4);