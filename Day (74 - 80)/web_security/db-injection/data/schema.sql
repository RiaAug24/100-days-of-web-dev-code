create table comments 
(
 id INT NOT NULL auto_increment PRIMARY KEY,
 author VARCHAR(255) NOT NULL,
 body TEXT NOT NULL
);

SELECT * FROM comments;