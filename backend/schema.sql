CREATE DATABASE BranchOut; 

CREATE TYPE tag_type AS ENUM (
    'Language', \ Python, Javascript, C
    'Framework', \ React, Svelte
    'Tool', \ Node.js, PostgreSQL, MongoDB
);

CREATE TABLE Users (
    ID INT NOT NULL,
    GitHub_Link VARCHAR(2048) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE Tags (
    ID INT NOT NULL,
    Tag VARCHAR(100) NOT NULL,
    Type tag_type NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE Projects (
    ID INT NOT NULL,
    ProjectName VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    Last_Checked DATE NOT NULL DEFAULT CURRENT_DATE,
    GitHub_Link VARCHAR(2048) NOT NULL,
    Website_Link VARCHAR(2048),
    Communication_Link VARCHAR(2048),
    CreatorID INT NOT NULL, 
    FOREIGN KEY (CreatorID) REFERENCES Persons(UserID) ON DELETE CASCADE,
    PRIMARY KEY (ID)
);

CREATE TABLE Tag_Projects(
    Tag_ID INT NOT NULL,
    Project_ID INT NOT NULL,
    FOREIGN KEY(Tag_ID) REFERENCES Tags(ID) ON DELETE CASCADE,
    FOREIGN KEY(Project_ID) REFERENCES Projects(ID) ON DELETE CASCADE,
    PRIMARY KEY(Tag_ID, Project_ID)
);
