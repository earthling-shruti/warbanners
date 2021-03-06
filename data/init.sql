DELETE FROM alliances;
DELETE FROM armies;
DELETE FROM board;
DELETE FROM cities;
DELETE FROM houses;
DELETE FROM players;

INSERT INTO players (name, house)
VALUES ("Sansa Stark", 1),
	("The Blackfish", 2);

INSERT INTO alliances (house_id, ally_id)
VALUES (1, 2);

INSERT INTO armies (city_id, x, y)
VALUES (1, 0, 2);

INSERT INTO board (x, y, t)
VALUES
	(0, 0, 4), (1, 0, 4), (2, 0, 4),
	(0, 1, 1), (1, 1, 0), (2, 1, 0),
	(0, 2, 1), (1, 2, 0), (2, 2, 0),
	(0, 3, 5), (1, 3, 0), (2, 3, 0),
	(0, 4, 3), (1, 4, 0), (2, 4, 0)
;

INSERT INTO cities (name, player_id, x, y)
VALUES ("Holy Terra", 1, 0, 0);

INSERT INTO houses (name, player_id)
VALUES ("Stark", 1),
	("Tully", 2);