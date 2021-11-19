create database redlink_blog;
use redlink_blog;

create table authors(
author_id int primary key auto_increment,
first_name varchar(20),
last_name varchar(20),
email varchar(100)
);

create table blogs(
blog_id int primary key auto_increment,
blog_title varchar(250) not null,
blog_description varchar(500),
blog_author int,
foreign key (blog_author) references authors(author_id)
);