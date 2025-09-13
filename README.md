# CrowdSolve Platform

A community-driven platform where users can post real-world problems and suggest solutions. Built with the MERN (MongoDB, Express, React, Node.js) stack, this application allows users to authenticate using JWT, contribute problems, comment, upvote solutions, and collaborate effectively.

---

## ✅ Features

### Core Functionality

- ✅ User Authentication (JWT-based login/signup)
- ✅ Users can post problems with location, description, and images
- ✅ Users can suggest solutions to problems
- ✅ Upvote and comment on solutions
- ✅ View popular problems and solutions
- ✅ Manage own problems and contributions in the dashboard

### Additional Highlights

- ✅ Token stored securely in HttpOnly cookies
- ✅ Protected routes with middleware verification
- ✅ Responsive UI using React and Tailwind CSS
- ✅ Persistent user sessions with context and localStorage
- ✅ RESTful API structure for scalability

---

## 📂 Project Structure

```
crowdsolve/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── index.js
|   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
|   |   ├── layouts/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
|   ├── .env
|   ├── README.md
|   └── package.json
│── └── vite.config.js


```

---

## 🚀 Tech Stack

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Frontend   | React, Tailwind CSS, React Router, Vite                |
| Backend    | Node.js, Express.js                                    |
| Database   | MongoDB with Mongoose                                  |
| Auth       | JWT, Cookies                                           |
| Deployment |Not Deployed |

---

## 📦 Installation

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following content:
   ```
   MONGODB_URI=mongodb_url
   DB_NAME=db_name 
   SECRET_KEY=secretkey
   JWT_EXPIRY=7d
   PORT=4000
   ```
4. Run the server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following content:
   ```
   VITE_API_URL=http://localhost:4000/api/v1
   ```
4. Run the frontend:
   ```bash
   npm run dev
   ```

---

## 🔑 Environment Variables

### Backend `.env`

```

MONGODB_URI=mongodb://localhost:27017
DB_NAME=bookswap
SECRET_KEY=secretkey
JWT_EXPIRY=7d
PORT=4000
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:5000/api/v1
```

---

## ✅ API Endpoints

### Auth Routes

- `POST /api/v1/auth/register` – Register a new user
- `POST /api/v1/auth/login` – Login user
- `POST /api/v1/auth/logout` – Logout user (clears cookies)
- `GET /api/v1/auth/profile` – Get user profile (protected)

### Problems Routes

- `POST /api/v1/problems` – Create a problem (protected)
- `GET /api/v1/problems` – Get all problems

- `POST /api/v1/problems/:id/solutions` – Add a solution (protected)
- `POST /api/v1/solutions/:id/upvote` – Upvote a solution (protected)

---

## 📖 Usage

1. Users can view problems and solutions on the homepage.
2. Register or login to contribute solutions or post new problems.
3. Use the dashboard to view your own problems and suggested solutions.
4. Upvote useful solutions and engage with the community.

---

## 🛠 Limitations

- Limited Features 
- One user can comment multiple times  
- Upvote can be done multiple times 
- Authentication Issues 
- Dashboard not provided yet 
- More API to update specific problem and solution

---
## 🛠 Future Improvements

- Improvement in UI and UX
- Advance filter and searching 
- Admin panel for moderation
- Mobile-friendly layout and PWA support
- Integration with cloud image storage (like AWS S3)

---




