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

### Notes (Things i wish i had more time to implement) 

1. Implement unit test.
2. Better loading to the components and faster client-side response.
3. A better country name filter to diplay information on screen (venezuela, for example).
4. Screen response when fail to fetch information.
5. Better Adpation of the layout to diferrent sizes os screen.
6. Ensure that environment variables are loaded and used securely in the application.

