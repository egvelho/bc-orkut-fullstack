/*
  Warnings:

  - You are about to drop the column `idade` on the `users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "passwd" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("avatar", "created_at", "first_name", "id", "last_name", "passwd") SELECT "avatar", "created_at", "first_name", "id", "last_name", "passwd" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
