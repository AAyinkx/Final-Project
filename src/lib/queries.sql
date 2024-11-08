CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  clerk_id TEXT UNIQUE,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  date_of_birth DATE,
  parent_name TEXT,
  bio TEXT,
  image_src TEXT
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  clerk_id TEXT REFERENCES users(clerk_id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  date DATE,
  image_src TEXT
)

CREATE TABLE IF NOT EXISTS comments(
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  comment TEXT,
  date DATE,
  posts_id INTEGER REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS follows (
  following_clerk_id TEXT REFERENCES users(clerk_id),
  followed_clerk_id TEXT REFERENCES users(clerk_id), 
  PRIMARY KEY (following_clerk_id,followed_clerk_id)
  
);