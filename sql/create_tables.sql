CREATE TABLE Users (
           id varchar(255) unique primary key,
           email varchar(255) unique,
           password varchar(255),
           salt varchar(255),
           session_id varchar(255),
           session_expiration int
);

