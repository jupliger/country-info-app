# Country Info App

This project is a Full-Stack JavaScript application that provides information about countries. It includes a Backend built with Nest.js and a Frontend  built with Next.js

## Project Overview
**Tech Stack:**
- Nest.js
- Next.js
- React.js
- TypeScript

## Setup Instructions

### Backend
1. Navigate to the frontend directory:
  cd country-info-app/backend
   
2. Install the dependencies:
  npm install

5. Start the backend server:
  npm run start
  
### Frontend
1.Navigate to the frontend directory:
 cd country-info-app/frontend

2. Install the dependencies:
npm install --force

4. Create a .env file and add the necessary environment variables:
.env.local
  NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api

5. Start the frontend server:
  npm run dev

Open your browser and go to http://localhost:3000 to access the frontend application. 
The frontend application should communicate with the backend to fetch the necessary data.
