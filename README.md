# Movie Search App

A simple React application that lets users search for movies, view search results, and see detailed information about a selected movie using the TMDB API.

---

## Features

- Search movies by title.
- View search results with poster, title, and release year.
- Click a movie to see detailed information (title, synopsis, rating, year, poster).
- “Back” button to return to search results.
- Handles interface states:
  - Before searching: welcome message.
  - Loading: displays “Loading…”.
  - Errors: displays network or not-found messages.
- Uses React Router for navigation between pages.
- TMDB API key stored securely in `.env`.

---

## Setup & Running the Project

1. **Clone the repository and install dependencies:**

```bash
git clone https://github.com/your-username/movie-search-app.git
cd movie-search-app
npm install


Create a .env file in the project root with your TMDB API key:
VITE_TMDB_API_KEY=your_api_key_here

Start the development server:
npm run dev

Open the URL displayed in the terminal (usually http://localhost:5173) in your browser.