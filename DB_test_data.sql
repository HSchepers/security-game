insert into securitygame.roles values
	(1, "Admin"),
	(2, "User");

insert into securitygame.users values
	("HSchepers", password("Password123"), 1),
	("HHoffmann", password("Password123"), 1),
	("LTwenning", password("Password123"), 2),
	("CHohmann", password("Password123"), 2);

insert into securitygame.scores values
	(1, "HSchepers", 100),
	(2, "HSchepers", 200),
	(3, "HHoffmann", 300),
	(4, "LTwenning", 400),
	(5, "LTwenning", 150),
	(6, "HSchepers", 720),
	(7, "CHohmann", 430),
	(8, "HHoffmann", 290),
	(9, "HSchepers", 370),
	(10, "CHohmann", 130);