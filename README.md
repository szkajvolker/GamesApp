# GamesApp

A modern React-based game search app powered by the RAWG API.

Project Progress Description:
This project was created mainly to practice working with REST APIs. The application integrates the RAWG REST API to fetch video game data.
Initially, the project was built as a frontend-only application. However, due to security concerns (such as exposing API keys), a backend was later implemented using Express.js and MongoDB for secure data handling and storage.
Through this project, I gained hands-on experience with how data flows between the API → backend → frontend, as well as building a more secure full-stack architecture.

## Main Features

-  Search for games
-  Dark mode (toggle between light/dark theme)
-  Filter by genre
-  Filter by platform
-  Display detailed info about games (metacritic score,ratings,genres,developers,platforms,screenshots)
-  Pagination
-  Lazy loading
-  Responsive, mobile-friendly UI (WIP)
-  Registration/Login

## Tech Stack

- **React** (Vite)
- **RAWG API** (game data)
- **Zustand** (state management)
- **Tailwind CSS** (modern, responsive design)
- **Session/local storage** (reduce API calls, cache)
- **FontAwesome** (icons)
- MongoDB(store API calls) (reduce API calls,cache)
- Render (Run backend for deploy)
- Netlify (Run deployed project)

##Future Plans

Backend
- User login and registration (implemented)
- Authentication (implemented)
- Admin page (WIP)
- User able to save favourite into collection,rate it etc. (WIP)

Frontend
- Login and registration UI (implemented)
- Loading UI (implemented)
---------------------------

Testing
- just for test account
email:user@test.com
password:User12345!

Created by: Istvan Szabo
##  Live Demo
[https://games-store-db.netlify.app/]

---

Built with using React & GSAP With TailwindCSS
