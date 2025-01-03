# PassBox - Password Manager

**PassBox** is a password management application built using the **MERN stack** (MongoDB, Express, React, Node.js) and styled with **Tailwind CSS**. This app allows users to securely store and manage their passwords along with associated URLs and usernames.

## Features

- **Save Passwords**: Store passwords securely with associated URLs and usernames.
- **Database Integration**: Save data to a MongoDB database for persistent storage.
- **Responsive Design**: Optimized for all screen sizes using Tailwind CSS.
- **Toast Notifications**: Alerts users about important actions like successful saves or errors.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Other Libraries**:
  - `react-toastify`: For toast notifications.
  - `uuidv4`: For generating unique IDs.

## Screenshot

![Screenshot 2024-12-12 181521](https://github.com/user-attachments/assets/b2142bf2-33aa-40ae-9023-384c598c96b3)




---

## How to Run

To set up and run this project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/RohithGYadav/passbox.git
2. Navigate to the Project Directory
cd passbox

3. Set Up Environment Variables
Create a .env file in the backend folder and add your MongoDB connection string. Replace <your-mongodb-uri> with your actual MongoDB URI:
MONGO_URI=<your-mongodb-uri>

4. Install Dependencies
Install dependencies for the frontend:
npm install

Navigate to the backend folder and install dependencies for the backend:
cd backend
npm install

5. Start the Application
Start the frontend by running the following command in the root directory:
npm run dev

Simultaneously, start the backend server by running the following command in the backend folder:
node --watch server.js

6. Access the App
Once the servers are running, you can access the app in your browser at:
http://localhost:5173
