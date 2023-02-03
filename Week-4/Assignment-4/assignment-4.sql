-- 1. Write an SQL statement to select all articles with their author’s email.

SELECT
    articleID,
    title,
    user.email
FROM article
    INNER JOIN user ON user.id = article.userID
ORDER BY articleID;

-- 2. Write another SQL statement to select articles from 7th to 12th sorted by id.

SELECT * FROM article ORDER BY articleID LIMIT 6 OFFSET 6;