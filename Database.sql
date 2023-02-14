-- create database
DROP DATABASE IF EXISTS NMCCinema;
CREATE DATABASE IF NOT EXISTS NMCCinema;
USE NMCCinema;

-- create table: User
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User`(
	id 				INT AUTO_INCREMENT PRIMARY KEY,
	`username`	 	CHAR(50) NOT NULL UNIQUE CHECK (LENGTH(`username`) >= 6 AND LENGTH(`username`) <= 50),
	`email` 		CHAR(50) NOT NULL UNIQUE CHECK (LENGTH(`email`) >= 6 AND LENGTH(`email`) <= 50),
    `phone_number`	VARCHAR(20),
	`password` 		VARCHAR(800) NOT NULL,
    `firstName` 	NVARCHAR(50) NOT NULL,
    `lastName` 		NVARCHAR(50) NOT NULL,
    `role` 			ENUM('Admin','Client') DEFAULT 'Client',
	`status`   		TINYINT DEFAULT 0 -- 0: Not Active, 1: Active
);

-- create table: Movies
DROP TABLE IF EXISTS `Movie`;
CREATE TABLE `Movie`(
	id				INT AUTO_INCREMENT PRIMARY KEY,
    `title`			VARCHAR(1024) NOT NULL,
    `theater`		CHAR(10) NOT NULL,
    `poster_url`	VARCHAR(512),
    `banner_url`	VARCHAR(512),
    `director`		NVARCHAR(50),
    `overview`		TEXT,
    `genre`			NVARCHAR(100),
    `rated`			CHAR(10),
    `released_date`	DATE,
    `duration`		INT
);

-- create table: Tickets
DROP TABLE IF EXISTS `Ticket`;
CREATE TABLE `Ticket`(
	id				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `code`			INT NOT NULL UNIQUE,
    `seat`			CHAR(50) NOT NULL,
    `date`			DATE NOT NULL,
    `time`			TIME NOT NULL,
    `price`			FLOAT NOT NULL,
    `user_id`		INT,
    `movie_id`		INT
);

-- Create table Registration_User_Token
DROP TABLE IF EXISTS 	`Registration_User_Token`;
CREATE TABLE IF NOT EXISTS `Registration_User_Token` ( 	
	id 				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`token`	 		CHAR(36) NOT NULL UNIQUE,
	`user_id` 		SMALLINT UNSIGNED NOT NULL,
	`expiryDate` 	DATETIME NOT NULL
);

-- Create table Reset_Password_Token
DROP TABLE IF EXISTS 	`Reset_Password_Token`;
CREATE TABLE IF NOT EXISTS `Reset_Password_Token` ( 	
	id 				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`token`	 		CHAR(36) NOT NULL UNIQUE,
	`user_id` 		SMALLINT UNSIGNED NOT NULL,
	`expiryDate` 	DATETIME NOT NULL
);

ALTER TABLE `ticket` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `ticket` ADD FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);

-- Add Data User
-- password: 123456
INSERT INTO `User`	(`username`,		`email`, 						`phone_number`, `password`,														`firstName`,	`lastName`,		`role`,	`status`)
VALUE				('chuongnguyen', 	'chuongnguyen.dc@gmail.com',	'0908070605',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',	'Chương',		'Nguyễn Minh',	'Admin',	1),
					('ironman',		 	'ironman@gmail.com',			'0954615485',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',	'Tony',			'Stack',		'Client',	1),
                    ('doctorstrange', 	'doctorstrange@gmail.com',		'0946048468',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',	'Stephen',		'Strange',		'Client',	1),
                    ('minion',		 	'minion@gmail.com',				'0948437613',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',	'Minion',		'',				'Client',	1),
                    ('harrypotter',		'harrypotter@gmail.com',		'0913548331',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',	'Harry',		'Potter',		'Client',	1),
                    ('batman', 			'batman@gmail.com',				'0987468134',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',	'Bruce',		'Wayne',		'Client',	1),
                    ('sherlockhomes',	'sherlockhomes@gmail.com',		'0948498454',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',	'Sherlock',		'Homes',		'Client',	1),
                    ('optimusprime',	'optimusprime@gmail.com',		'0946873315',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',	'Optimus',		'Prime',		'Client',	1),
                    ('megatron',		'megatron@gmail.com',			'0987901502',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',	'MegaTron',		'',				'Client',	1),
                    ('kingkong',	 	'kingkong@gmail.com',			'0926808460',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',	'King Kong',	'',				'Client',	1),
                    ('superman',	 	'superman@gmail.com',			'0926615484',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',	'Clart',		'Kent',			'Client',	1);

-- Add Data Movie
INSERT INTO `Movie`(`title`,								`theater`,	`poster_url`,																`banner_url`, 																	`director`, 						`genre`,											`rated`,	`released_date`,	`duration`,	`overview`)
VALUE				('Avengers: Endgame', 					'01',		'https://i.pinimg.com/564x/95/26/68/9526684fe11e38cf6bb6fbd48e37de6a.jpg',	'https://i.pinimg.com/originals/c8/4a/bd/c84abdb49c3e2e65b514774179f6f064.jpg',	'Anthony Russo, Joe Russo',			'Action, Adventure, Fantasy, Sci-fi',				'C13',		'2019-04-26',		182,		"After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe."),
					('Minions: The Rise of Gru', 			'02',		'https://i.pinimg.com/564x/d6/6e/aa/d66eaad21b53fcfb2939162887865d25.jpg',	'https://i.pinimg.com/originals/d6/4d/85/d64d851afa20e9fc2f69bfa2204a8e07.jpg',	'Kyle Balda',						'Kids & family, Comedy, Adventure, Animation',		'P',		'2022-07-01',		90,			"The untold story of one twelve-year-old's dream to become the world's greatest supervillain."),
                    ('Puss in Boots: The Last Wish', 		'03',		'https://i.pinimg.com/564x/4c/ce/4a/4cce4a3f0ae38c6c4e652e5e4f4322ff.jpg',	'https://i.pinimg.com/originals/13/ac/50/13ac50af5e6a9930a577c60f7df8ffe6.jpg',	'Joel Crawford, Januel Mercado',	'Adventure, Animation, Comedy',						'P',		'2022-12-21',		102,		'When Puss in Boots discovers that his passion for adventure has taken its toll and he has burned through eight of his nine lives, he launches an epic journey to restore them by finding the mythical Last Wish.'),
                    ('The Batman', 							'04',		'https://i.pinimg.com/564x/b6/bd/b4/b6bdb4f8a420e991cfcecd5346bbe063.jpg',	'https://i.pinimg.com/originals/2d/72/eb/2d72ebffed0510165c9483339e6559a7.jpg',	'Matt Reeves',						'Action, Adventure, Crime, Drama',					'C13',		'2022-03-04',		175,		"When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement."),
                    ('Black Adam', 							'05',		'https://i.pinimg.com/564x/f4/c0/6a/f4c06aef8b20bfa5dd2f8f7f29775f0a.jpg',	'https://i.pinimg.com/originals/0d/9d/35/0d9d354067423c5a0b46024009654bcf.jpg',	'Jaume Collet-Serra',				'Action, Adventure, Fantasy',						'C13',		'2022-10-20',		120,		'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods--and imprisoned just as quickly--Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.'),
                    ('Pacific Rim: Uprising', 				'06',		'https://i.pinimg.com/564x/62/0e/72/620e72893ebe64b52bd577ef17ef1ca3.jpg',	'https://i.pinimg.com/originals/7d/f5/f8/7df5f850a4d5a98f1d4652b73c217453.jpg',	'Steven S. DeKnight',				'Action, Adventure, Fantasy, Sci-fi',				'C13',		'2018-03-23',		111,		'Jake Pentecost, son of Stacker Pentecost, reunites with Mako Mori to lead a new generation of Jaeger pilots, including rival Lambert and 15-year-old hacker Amara, against a new Kaiju threat.'),
                    ('Transformers 5: The Last Knight', 	'07',		'https://i.pinimg.com/564x/dc/88/2f/dc882f3d285b801e2b7ec7c85744c13c.jpg',	'https://i.pinimg.com/originals/03/cc/f8/03ccf8b250f4458f74b11e43d4b5acec.jpg',	'Michael Bay',						'Action, Adventure, Fantasy, Sci-fi',				'C13',		'2017-06-23',		175,		"A deadly threat from Earth's history reappears and a hunt for a lost artifact takes place between Autobots and Decepticons, while Optimus Prime encounters his creator in space."),
                    ('Avatar: The Way of Water', 			'08',		'https://i.pinimg.com/564x/bb/90/ec/bb90ec49477beb6888b8641ea3b0e2fa.jpg',	'https://i.pinimg.com/originals/76/b1/eb/76b1ebe10bf65ebdf0c8f3c70f08d35a.jpg',	'James Cameron',					'Action, Adventure, Fantasy, Sci-fi',				'C13',		'2022-12-16',		162,		"Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home."),
                    ('Jurassic World: Dominion', 			'09',		'https://i.pinimg.com/564x/80/e4/93/80e493749695d8cec2cb6d0b56e7c7c7.jpg',	'https://i.pinimg.com/originals/7b/d1/4d/7bd14dd36abe79cde0e7e9e437022769.jpg',	'Colin Trevorrow',					'Action, Adventure, Sci-fi, Mystery & thriller',	'C13',		'2022-10-06',		147,		'Four years after the destruction of Isla Nublar, Biosyn operatives attempt to track down Maisie Lockwood, while Dr Ellie Sattler investigates a genetically engineered swarm of giant insects.'),
                    ('Spider-Man: No Way Home', 			'10',		'https://i.pinimg.com/564x/47/c5/0e/47c50eb7c96e42d725f60c92caeab65d.jpg',	'https://i.pinimg.com/originals/0e/91/23/0e9123e418a461a480828008c161bebc.jpg',	'Jon Watts',						'Action, Adventure, Fantasy',						'C13',		'2021-12-16',		148,		"With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.");
                    
-- Add Data Ticket
INSERT INTO `Ticket`(`code`,		`seat`, `date`, 		`time`,		`price`,	`user_id`, `movie_id`)
VALUE				('0123456789', 	'A01',	'2022-11-02',	'20:00',	125000,		1,			1),
					('0123458789', 	'A01',	'2022-11-02',	'20:00',	125000,		1,			2),
					('0123456584', 	'A02',	'2022-11-03',	'20:00',	125000,		3,			2)