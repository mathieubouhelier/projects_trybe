-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Project_Spotify_Clone
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Project_Spotify_Clone
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Project_Spotify_Clone` DEFAULT CHARACTER SET big5 ;
USE `Project_Spotify_Clone` ;

-- -----------------------------------------------------
-- Table `Project_Spotify_Clone`.`plano`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_Spotify_Clone`.`plano` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `valor` DECIMAL NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `Project_Spotify_Clone`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_Spotify_Clone`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `idade` INT NULL,
  `plano_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_plano_id_idx` (`plano_id` ASC) VISIBLE,
  CONSTRAINT `fk_plano_id`
    FOREIGN KEY (`plano_id`)
    REFERENCES `Project_Spotify_Clone`.`plano` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `Project_Spotify_Clone`.`artista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_Spotify_Clone`.`artista` (
  `id` INT NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `Project_Spotify_Clone`.`album`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_Spotify_Clone`.`album` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `artista_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_artista_id_idx` (`artista_id` ASC) VISIBLE,
  CONSTRAINT `fk_artista_id`
    FOREIGN KEY (`artista_id`)
    REFERENCES `Project_Spotify_Clone`.`artista` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `Project_Spotify_Clone`.`cancoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_Spotify_Clone`.`cancoes` (
  `id` INT NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `album_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_album_id_idx` (`album_id` ASC) VISIBLE,
  CONSTRAINT `fk_album_id`
    FOREIGN KEY (`album_id`)
    REFERENCES `Project_Spotify_Clone`.`album` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `Project_Spotify_Clone`.`seguindo_artistas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_Spotify_Clone`.`seguindo_artistas` (
  `usuario_id` INT NOT NULL,
  `artista_id` INT NOT NULL,
  PRIMARY KEY (`usuario_id`, `artista_id`),
  INDEX `fk_usuario_has_artista_artista1_idx` (`artista_id` ASC) VISIBLE,
  INDEX `fk_usuario_has_artista_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_has_artista_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `Project_Spotify_Clone`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_artista_artista1`
    FOREIGN KEY (`artista_id`)
    REFERENCES `Project_Spotify_Clone`.`artista` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `Project_Spotify_Clone`.`historico_de_reproducoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_Spotify_Clone`.`historico_de_reproducoes` (
  `usuario_id` INT NOT NULL,
  `cancoes_id` INT NOT NULL,
  PRIMARY KEY (`usuario_id`, `cancoes_id`),
  INDEX `fk_usuario_has_cancoes_cancoes1_idx` (`cancoes_id` ASC) VISIBLE,
  INDEX `fk_usuario_has_cancoes_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_has_cancoes_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `Project_Spotify_Clone`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_cancoes_cancoes1`
    FOREIGN KEY (`cancoes_id`)
    REFERENCES `Project_Spotify_Clone`.`cancoes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
