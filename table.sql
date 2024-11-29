CREATE DATABASE studentscore;

CREATE TABLE user(
    id int primary key AUTO_INCREMENT,
    username varchar(255),
    email varchar(255),
    password varchar(255),
    status varchar(10),
    UNIQUE (email,username)
);

CREATE TABLE userRole(
    id int primary key AUTO_INCREMENT,
    user_id int,
    user_role varchar(10)
);

CREATE TABLE student(
    id int primary key AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255),
    nick_name varchar(100),
    address varchar(100),
    status varchar(10) DEFAULT 'active'
);

CREATE TABLE studentScore(
    id int primary key AUTO_INCREMENT,
    student_id int UNIQUE,
    score float(3),
);