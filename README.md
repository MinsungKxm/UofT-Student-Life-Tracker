# UofT Student Life Tracker

A full-stack web application designed to help **University of Toronto students** organize their academic life, manage deadlines, and quickly access essential campus resources—all from one centralized dashboard.

🌐 **Live Demo:** https://uoft-student-life-tracker.onrender.com/

---

## Overview

University of Toronto students regularly use multiple platforms to manage their courses, assignments, grades, and campus opportunities. Switching between these systems can be time-consuming and disorganized.

The **UofT Student Life Tracker** consolidates these resources into a single dashboard where students can:

* Manage academic events and deadlines
* Keep track of their daily schedule
* Access frequently used UofT platforms
* Explore student guides and opportunities
* Monitor personal academic tasks

---

## Features

### Authentication

* Secure user registration and login
* Passwords encrypted using **bcrypt**
* Session-based authentication with **Express Session**

### Dashboard

* Personalized dashboard for each user
* Quick overview of academic information
* Easy navigation to important student services

### Calendar & Event Management

* Create and store academic events
* Track assignment deadlines
* View events by date
* Persistent event storage using PostgreSQL

### Student Resources

Quick access to commonly used University of Toronto platforms, including:

* ACORN
* Quercus
* Crowdmark
* MarkUs
* CLNx
* Folio

### Student Guides

Centralized guides covering:

* Arts & Science Internship Program (ASIP)
* Research Opportunities (ROP)
* Work Study & Campus Jobs
* General UofT student resources

### Task Checklist

* Track important academic tasks
* Mark completed items
* Monitor overall progress

### Fitness Tracker

* Log workouts
* Track recent activity
* Monitor weekly exercise minutes

---

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Express Session
* bcrypt
* CORS

### Database

* PostgreSQL
* Neon Database

### Deployment

* Render
* GitHub

---

## Project Structure

```text
UofT-Student-Life-Tracker/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── api.js
│
├── index.js              # Express backend
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/MinsungKxm/UofT-Student-Life-Tracker.git
cd UofT-Student-Life-Tracker
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
DATABASE_URL=your_neon_database_url
SESSION_SECRET=your_session_secret
```

### Run the application

Frontend:

```bash
npm run dev
```

Backend:

```bash
npm start
```

The application will then be available locally.

---

## Future Improvements

Planned features include:

* Event editing and deletion with database persistence
* Weekly and monthly calendar views
* Email reminders for deadlines
* Google Calendar integration
* AI-powered study planner
* Mobile-responsive improvements
* Dark mode
* Password reset functionality
* OAuth login (Google / UofT)

---

GitHub: https://github.com/MinsungKxm
