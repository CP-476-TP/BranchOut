# BranchOut
A platform for programmers of all skill levels to create or collaborate on new or existing open source projects!

## How to setup locally as of Milestone #2.
 
### Frontend
Frontend is comprised of plain html, css, and javascript so no dependencies are required, open main-page.html in any web browser.

### Backend
Dependencies:

- [node.js](https://nodejs.org/en/download)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Run the following in the root folder of BranchOut:
```bash

cd ./backend
npm install
npm run start

```

## Planned Technologies
Currently there is no database implementation, the planned schema is located at BranchOut/backend/schema.sql and will be used with PostgreSQL@18 in the future. 

The finished product will use BetterAuth for authentication and Docker containers for the backend.

## Deliverable 2 Contribtuons
- Kevin: main page, post-project page, edit-post page.
- Aaron: register page, login page, view-post page
- Omar: Back-end setup, SQL tables, Database-design package
