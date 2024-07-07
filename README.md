# Football Data Project

## Description

This project consists of a web application that allows importing football league data from the [football-data.org](http://www.football-data.org/) API and displaying it in a web interface built with Angular. The application includes a backend in Node.js/Express with TypeScript and a database configured with Sequelize and SQLite.




## Table of Contents

- [Requirements](#requirements)
- [Environment Configuration](#environment-configuration)
- [Database Initialization](#database-initialization)
- [Installation and Execution](#installation-and-execution)
- [Docker Setup](#docker-setup)
- [Project Structure](#project-structure)
- [Technical Decisions](#technical-decisions)
- [Application Usage](#application-usage)
- [Considerations](#considerations)



## Requirements

- Node.js (v16 o superior)
- npm o yarn




## Environment Variables

Environment variables are essential for configuring the application. You can use the `.env.template` file as a reference to create your own `.env` file.

1. Rename `.env.template` to `.env`.
2. Fill in the necessary values in the `.env` file.

```bash
API_TOKEN=your_football_data_api_token
```



## Environment Setup

1. Backend Dependencies:
To install the necessary dependencies, run the following command in the project's root directory:

```bash
cd api
npm install
```

2. Frontend Dependencies:
To install the necessary dependencies, run the following command in the project's root directory:

```bash
cd ui
npm install
```



## Database Initialization

The database can be populated using the league import endpoint. Follow these steps:

Start the backend server (see Backend section).
Make a POST request to the /import-league endpoint with the code of the league you want to import.
For example, using curl:

```bash
curl -X POST http://localhost:3000/api/import-league -H "Content-Type: application/json" -d '{"leagueCode": "PL"}'
```

The backend will import the data of the PL league, its teams, and players from the football-data.org API.
Check the football-data.org API to see more available leagues.



## Installation and Execution

1. Backend

To start the backend server, navigate to the api directory and run the following command:

```bash
cd api
npm run start
```

2. Frontend

To start the frontend application, navigate to the ui directory and run the following command:


```bash
cd ui
npm run start
```

The application will be available at http://localhost:4200.


## Docker Setup

You can use Docker to run both the backend and frontend services. Follow these steps:

### Building and Running the Containers

1. Build and start the Docker containers:

```bash
docker-compose up --build
```

2. The backend will be available at http://localhost:3000.

3. The frontend will be available at http://localhost:4200.







# Project Structure

```
football-data-project/
├── api/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── leagueController.ts
│   │   ├── entities/
│   │   │   ├── Competition.ts
│   │   │   ├── Team.ts
│   │   │   └── Player.ts
│   │   ├── routes/
│   │   │   └── leagueRoutes.ts
│   │   ├── services/
│   │   │   └── footballService.ts
│   │   ├── utils/
│   │   │   └── db.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── tsconfig.json
│   ├── package.json
│   ├── ormconfig.json
│   └── README.md
├── ui/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── team-list/
│   │   │   │   │   ├── team-list.component.ts
│   │   │   │   │   ├── team-list.component.html
│   │   │   │   │   ├── team-list.component.css
│   │   │   └── player-list/
│   │   │       ├── player-list.component.ts
│   │   │       ├── player-list.component.html
│   │   │       ├── player-list.component.css
│   │   ├── services/
│   │   │   └── football.service.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
├── .gitignore
└── README.md
```




## Technical Decisions

1. Backend

* Node.js and Express: Chosen for their efficiency and ease of handling HTTP requests.
* TypeScript: Adds static typing, which helps catch errors during development.
* Sequelize: ORM to interact with SQLite efficiently and in a structured manner.

2. Frontend

* Angular: Robust framework for SPA web applications. Facilitates modular and scalable development.
* SweetAlert2: For displaying elegant and user-friendly alerts.



# Note on Technologies Used

The technologies and tools used were specified in the challenge to ensure compliance with the project's requirements.




## Application Usage

View Teams: After importing a league, you can view the participating teams.

View Players: By selecting a team, you can view the team's details and player list.



# Considerations

* Error Handling: The application handles errors appropriately by displaying clear messages to the user.

* Rate Limiting: The free API from football-data.org has rate limiting. Delays and retries were implemented to handle these limitations.

* Documentation: Ensure to review the football-data.org API documentation to understand the limitations and additional features.

