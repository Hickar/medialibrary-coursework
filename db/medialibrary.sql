CREATE DATABASE MEDIALIBRARY;

USE MEDIALIBRARY;

CREATE TABLE USERS (
    UserID int AUTO_INCREMENT NOT NULL,
    UserName varchar(63) NOT NULL,
    UserPassword varchar(63) NOT NULL,
    PRIMARY KEY (UserID)
);

CREATE TABLE USERSMEDIA (
    OwnerName varchar(63) NOT NULL,
    MediaCaption varchar(63) NOT NULL,
    MediaURL varchar(63) NOT NULL,
    MediaType varchar(63) NOT NULL,
    DateAdded varchar(63) NOT NULL
)