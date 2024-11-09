-- CREATE TABLE IF NOT EXISTS users(
--   id SERIAL PRIMARY KEY,
--   clerk_id TEXT UNIQUE,
--   username TEXT,
--   first_name TEXT,
--   last_name TEXT,
--   date_of_birth DATE,
--   parent_name TEXT,
--   bio TEXT,
--   image_src TEXT
-- );

-- CREATE TABLE IF NOT EXISTS posts (
--   id SERIAL PRIMARY KEY,
--   clerk_id TEXT REFERENCES users(clerk_id) ON DELETE CASCADE,
--   title TEXT,
--   content TEXT NOT NULL,
--   posted_at TIMESTAMP DEFAULT NOW(),
--   image_src TEXT
-- )

-- CREATE TABLE IF NOT EXISTS comments(
--   id SERIAL PRIMARY KEY,
--   username TEXT,
--   comment TEXT,
--   posted_at TIMESTAMP DEFAULT NOW(),
--   posts_id INTEGER REFERENCES posts(id) ON DELETE CASCADE
-- );

-- CREATE TABLE IF NOT EXISTS follows (
--   following_clerk_id TEXT REFERENCES users(clerk_id),
--   followed_clerk_id TEXT REFERENCES users(clerk_id), 
--   PRIMARY KEY (following_clerk_id,followed_clerk_id)
  
-- );



    `SELECT * 
    FROM follows 
    JOIN users 
    ON users.clerk_id = follows.followed_clerk_id
    WHERE follows.following_clerk_id ='${user.id}'`
  ;



    `SELECT * 
    FROM follows 
    JOIN posts 
    ON posts.clerk_id = follows.followed_clerk_id
    JOIN users 
    ON users.clerk_id = follows.followed_clerk_id
    WHERE follows.following_clerk_id ='${user.id}'`
 ;


 
    `SELECT * 
    FROM follows 
    JOIN posts 
    ON posts.clerk_id = follows.followed_clerk_id
    
    WHERE follows.following_clerk_id ='${user.id}'`
 ;