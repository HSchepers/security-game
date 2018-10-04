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
-- Table `securitygame`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `securitygame`.`roles` (
  `id` INT NOT NULL,
  `declaration` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '	';


-- -----------------------------------------------------
-- Table `securitygame`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `securitygame`.`users` (
  `user` VARCHAR(30) NOT NULL,
  `mail` VARCHAR(50) NOT NULL,
  `auth_string` VARCHAR(100) NOT NULL,
  `F_roles_id` INT NOT NULL,
  PRIMARY KEY (`user`),
  INDEX `fk_users_roles1_idx` (`F_roles_id` ASC),
  CONSTRAINT `fk_users_roles1`
    FOREIGN KEY (`F_roles_id`)
    REFERENCES `securitygame`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `securitygame`.`scores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `securitygame`.`scores` (
  `id` INT NOT NULL,
  `F_users_user` VARCHAR(30) NOT NULL,
  `score` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_scores_users_idx` (`F_users_user` ASC),
  CONSTRAINT `fk_scores_users`
    FOREIGN KEY (`F_users_user`)
    REFERENCES `securitygame`.`users` (`user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Add guest user
-- -----------------------------------------------------
GRANT select 
  ON securitygame.*
  TO guest@localhost
  IDENTIFIED BY "login";