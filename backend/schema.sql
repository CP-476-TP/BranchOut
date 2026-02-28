-- DROP DATABASE IF EXISTS BranchOut;
CREATE DATABASE BranchOut;

DROP TYPE IF EXISTS tag_type CASCADE;
CREATE TYPE tag_type AS ENUM(
    'Language', -- Python, Javascript, C
    'Framework', -- React, Svelte
    'Tool', -- Node.js, PostgreSQL, MongoDB
    'Difficulty', -- BeginnerFriendly, Advanced
    'Topic' -- AI, SaaS, Environment
);

CREATE TABLE IF NOT EXISTS Users (
    ID INT NOT NULL,
    GitHub_Link VARCHAR(2048) NOT NULL,
    Time_Created TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Tags (
    ID INT NOT NULL,
    TagName VARCHAR(100) NOT NULL,
    Type tag_type NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Projects (
    ID INT NOT NULL,
    ProjectName VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    Last_Checked DATE NOT NULL DEFAULT CURRENT_DATE,
    Time_Uploaded TIMESTAMP NOT NULL DEFAULT NOW(),
    Last_Updated TIMESTAMP,
    Stars INT NOT NULL DEFAULT 0,
    Forks INT NOT NULL DEFAULT 0,
    GitHub_Link VARCHAR(2048) NOT NULL,
    Website_Link VARCHAR(2048),
    Communication_Link VARCHAR(2048),
    CreatorID INT NOT NULL,
    FOREIGN KEY (CreatorID) REFERENCES Users(ID) ON DELETE CASCADE,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Tag_Projects(
    Tag_ID INT NOT NULL,
    Project_ID INT NOT NULL,
    FOREIGN KEY(Tag_ID) REFERENCES Tags(ID) ON DELETE CASCADE,
    FOREIGN KEY(Project_ID) REFERENCES Projects(ID) ON DELETE CASCADE,
    PRIMARY KEY(Tag_ID, Project_ID)
);
