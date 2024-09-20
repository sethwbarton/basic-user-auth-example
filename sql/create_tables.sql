CREATE TABLE Users (
                       id int primary key,
                       email varchar(255) unique,
                       password varchar(255),
                       salt varchar(255),
                       password_reset_token varchar(255)
);