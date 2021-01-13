CREATE DATABASE MEDIALIBRARY;

USE MEDIALIBRARY;

CREATE TABLE USERS (
    user_ID int AUTO_INCREMENT NOT NULL,
    user_name varchar(63) NOT NULL,
    user_password varchar(63) NOT NULL,
    PRIMARY KEY (user_ID)
);

CREATE TABLE FILES (
    file_owner varchar(63) NOT NULL,
    file_name varchar(63) NOT NULL,
    file_URL varchar(63) NOT NULL,
    file_type varchar(63) NOT NULL
)