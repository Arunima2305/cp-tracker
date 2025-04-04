# 💻 CodeFlow – Competitive Programming Tracker

CodeFlow is a full-stack web app that helps users track their Competitive Programming progress. Users can add problems, tag them, take notes, and mark them for revisit. Problems can be added manually or fetched automatically by pasting a URL (from Codeforces, LeetCode, etc.).

---



## 🧠 Tech Stack

- **Frontend**: React.js, Material UI, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Token (JWT)
- **Web Scraping**: Custom scraper with Puppeteer
- **Deployment**: Vercel (frontend), Railway (backend + MongoDB)

---

## ✨ Features

- 🔐 User authentication with JWT
- ➕ Add questions manually or from problem URLs
- 📝 Save notes and tags for each question
- ✅ Toggle problem status (Solved / Unsolved)
- 📌 Bookmark problems to revisit later
- 🧠 Filter by difficulty, tags, and revisit (Upcoming)
- 📊 Progress tracker with stats (Upcoming)
- 📤 Export questions to CSV (Upcoming)
- 🕶️ Dark mode toggle (Upcoming)

---


## ⚙️ Local Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/cp-tracker.git
cd cp-tracker
```

---

### 2. Backend Setup (`/backend`)

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```

Then start the server:

```bash
npm run dev
```

---

### 3. Frontend Setup (`/frontend`)

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` with:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Then run the app:

```bash
npm run dev
```

---

## 📅 Upcoming Features

- 🔍 Search & tag-based filtering
- 📈 Progress analytics dashboard
- 🖨️ Export to CSV/PDF
- 🧠 AI-based smart suggestion for next questions
- 🌍 Public profile with shared question list

---



## 🛡 License

This project is open-source and available under the [MIT License](LICENSE).

