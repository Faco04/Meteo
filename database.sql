CREATE database IF NOT EXISTS 'Utenti'
use 'Utenti'

CREATE table userr (
    id int(11) NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    passw varchar(255) NOT NULL,
    PRIMARY KEY (id)

)


insert into userr (email, passw) values ('admin', 'admin');