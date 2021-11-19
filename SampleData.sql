use redlink_blog;

-- Add email as well
insert into authors(first_name, last_name, email) values("Austin", "Grant", "");
insert into authors(first_name, last_name, email) values("Dustin", "Grant", "");
insert into authors(first_name, last_name, email) values("Lewis", "Hamilton", "");
insert into authors(first_name, last_name, email) values("Sooraj", "Jayachandran", "");
insert into authors(first_name, last_name, email) values("Rupesh", "Kumar", "");

insert into blogs(blog_title, blog_description, blog_author) values("My first blog", "My first blog", 1);
insert into blogs(blog_title, blog_description, blog_author) values("Hello World", "My first blog", 5);
insert into blogs(blog_title, blog_description, blog_author) values("Getting started with Node.Js", "Hello Node", 2);
insert into blogs(blog_title, blog_description, blog_author) values("Express", "Sample Express program", 3);
insert into blogs(blog_title, blog_description, blog_author) values("MySQL Hacks!", "Have you heard of SQLInjection???", 1);