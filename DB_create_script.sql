-- MySQL Script generated by MySQL Workbench
-- Thu Sep 13 22:36:30 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema securitygame
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema securitygame
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `securitygame` DEFAULT CHARACTER SET utf8 ;
USE `securitygame` ;

-- -----------------------------------------------------
-- Table `securitygame`.`game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `securitygame`.`games` (
  `id` INT NOT NULL,
  `user` VARCHAR(30) NOT NULL,
  `score` INT,
  `time` time,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `securitygame`.`answers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `securitygame`.`answers` (
  `f_game_id` INT NOT NULL,
  `question_id` INT NOT NULL,
  `answer` BOOLEAN NOT NULL,
  PRIMARY KEY (`f_game_id`, `question_id`),
  INDEX `fk_games_answers_idx` (`f_game_id` ASC),
  CONSTRAINT `fk_games_answers1`
    FOREIGN KEY (`f_game_id`)
    REFERENCES `securitygame`.`games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Add guest user
-- -----------------------------------------------------
GRANT select, insert, update
  ON securitygame.*
  TO guest@localhost
  IDENTIFIED BY "login";