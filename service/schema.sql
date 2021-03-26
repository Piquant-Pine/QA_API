CREATE DATABASE IF NOT EXISTS question_answers;

USE question_answers;

-- ---
-- Globals
-- ---
--  SET GLOBAL local_infile = true;
-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- index the tables with product id
-- CREATE INDEX questionindex ON questions(id_product);

-- ---
-- Table 'questions'
--
-- ---

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_product` INTEGER NOT NULL,
  `question_body` TEXT(1000) NOT NULL,
  `question_date` DATE NOT NULL,
  `asker_name` VARCHAR(60) NOT NULL,
  `asker_email` VARCHAR(60) NOT NULL,
  `report_question` TINYINT(0) NOT NULL DEFAULT 0,
  `question_helpfulness` SMALLINT(255) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'answers'
--
-- ---

DROP TABLE IF EXISTS `answers`;

CREATE TABLE `answers` (
  `id_answer` INTEGER NOT NULL AUTO_INCREMENT,
  `id_question` INTEGER NOT NULL,
  `answer_body` TEXT(1000) NOT NULL,
  `answer_date` DATE NOT NULL,
  `answerer_name` VARCHAR(60) NOT NULL,
  `answerer_email` VARCHAR(60) NOT NULL,
  `report_answer` TINYINT(0) NOT NULL DEFAULT 0,
  `answer_helpfulness` SMALLINT(255) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_answer`),
  FOREIGN KEY (id_question) REFERENCES `questions` (`id`) ON DELETE CASCADE
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_answer` INTEGER NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (id_answer) REFERENCES `answers` (`id_answer`) ON DELETE CASCADE
);

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE `questions` ADD FOREIGN KEY (id_product) REFERENCES `product` (`id`);
-- ALTER TABLE `photos` ADD FOREIGN KEY (id_answer) REFERENCES `answers` (`id_answer`);
-- ALTER TABLE `answers` ADD FOREIGN KEY (id_question) REFERENCES `questions` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `answers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `questions` (`id`,`question_body`,`question_date`,`asker_name`,`question_helpfulness`,`reported`,`id_product`) VALUES
-- ('','','','','','','');
-- INSERT INTO `answers` (`id_answer`,`body`,`date`,`answerer_name`,`helpfulness`,`id_question`) VALUES
-- ('','','','','','');
-- INSERT INTO `photos` (`id`,`url`,`id_answer`) VALUES
-- ('','','');
-- INSERT INTO `product` (`id`,`name`) VALUES
-- ('','');


LOAD DATA LOCAL INFILE '/tmp/questions.csv'
INTO TABLE questions
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/tmp/answers.csv'
INTO TABLE answers
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/tmp/answers_photos.csv'
INTO TABLE photos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;