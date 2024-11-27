CREATE TABLE user(
    id int primary key AUTO_INCREMENT,
    username varchar(255),
    email varchar(255),
    password varchar(255),
    status varchar(10),
    UNIQUE (email,username)
);

INSERT INTO user(username, email, password, status)
VALUES ('admin', 'admin@email.com', 'admin', 'active');

CREATE TABLE student