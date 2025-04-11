# 🎥 YouTube Clone (MERN Stack)

A full-featured YouTube-like video sharing platform built with the **MERN stack** (MongoDB, Express, React, Node.js). Users can upload, watch, like, comment on videos, manage profiles, and more — with a modern, responsive UI and Cloudinary integration for media hosting.

 This project was built as a capstone project for a 9-month Full Stack Development course by Internshala Training, based on the MERN stack.

---
## GitHub Repo link:
[Maithon921/Youtube-clone](https://github.com/Maithon921/Youtube-clone)

## Features of viewTube

- Authentication with JWT
- Video upload with Cloudinary
- Thumbnail + profile image uploads
- Search videos by title and category
- Video filtering (Trending, Subscriptions, Categories)
- Video recomendation based on tags 
- Comment system with edit/delete
- Unique view tracking: user-based
- User profile edit/delete with media replacement
- Fully responsive design (mobile-first)
- 404 and error page handling
- Toast notifications for user feedback
- Lazy loading with React.lazy and Suspense for faster initial load

---

## Technologies used:

**Frontend:**
- React + Vite
- Redux Toolkit + Persist
- Tailwind CSS
- React Router
- Axios
- Context API
- React.lazy + Suspense (code splitting)

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Cloudinary (video/image uploads)
- JWT (authentication)

---

## Installation
### Clone the repo
### Backend setup:
- Move to the `backend/` folder
- Install dependencies
- Set up your `.env` file:
```
PORT=5000
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```
### Frontend setup:
- Move to the `frontend/` folder
- Install dependencies
- Update `axiosInstance.js` with your backend base URL
- update `.env` file

---

## How to Use

1. Start both frontend and backend servers
2. Register or sign in to your account
3. Upload a video with a thumbnail (via Cloudinary)
4. Explore features like:
   - Search and filter videos
   - Like/dislike and comment
   - Edit/delete your own videos and comments
   - Visit user channels
   - Edit your profile (with avatar support)

Lazy loading ensures that only the components needed at the moment are loaded, improving initial load time and overall performance.

---

## Video link

[ Demo Video](https://drive.google.com/file/d/1hr2fh8YOSXwZbEKaXGYrzoXhMM8uxLPI/view?usp=sharing)

---

## Author

Built by [Maithonkambou Abonmai](https://github.com/Maithon921)

