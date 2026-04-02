# BranchOut
A platform for programmers of all skill levels to create or collaborate on new or existing open source projects!

## Getting Started

### Prerequisites
- Docker
- Docker Compose
- node.js
- npm

### Installation & Setup

Note: I know its bad security practice to upload the environment variables into the compose.yaml but for simplicities sake in marking and deployment I kept it that way, in a real scenario I would have not done this.

How to set up the backend:
- Make sure you are within the cloned BranchOut repo directory.
- cd ./backend
- docker-compose up --build

Now running the docker container will run the backend and database, wahoo!
