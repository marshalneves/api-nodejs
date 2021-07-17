CREATE TABLE "tb_users" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
	"email"	NUMERIC NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"created_at" REAL DEFAULT CURRENT_TIMESTAMP,
	"role" TEXT NOT NULL
);

CREATE TABLE "tb_posts" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"user_id"	INTEGER NOT NULL,
	"amount"	NUMERIC NOT NULL,
	"description" TEXT NOT NULL,
	"date"	REAL NOT NULL,
	"dc"	TEXT NOT NULL,
	"created_at"	REAL DEFAULT CURRENT_TIMESTAMP,
	"deleted_at" REAL,
	FOREIGN KEY('user_id') REFERENCES tb_users(id)
);

select * from tb_users

insert into tb_posts (id, user_id, amount, dc) values ('asa','aa1',0,'C')