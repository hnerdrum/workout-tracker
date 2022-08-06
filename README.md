# Workout tracker

This is an application for registering workouts in a web application.
The frontend is written in React with TypeScript and Vite as the build tool.
The backend is written in Scala with http4s as the HTTP library and PostgreSQL for persistence.

## Backend

### Prerequisites
To run the backend you must have `gradle` installed, in addition to `Scala 2.13` and `JDK 11`

### Setup

#### Start server
`./gradlew clean run`

## Frontend

### Setup

#### Install dependencies
`npm install`

#### Start server
`npm run dev`

Open `http://localhost:5173/` in your browser to see the application running.

## Database

Install PostgreSQL using your favorite installation tool. Then run the following:

```
psql -c 'CREATE DATABASE "workout-tracker";'
psql -h localhost -p 5432 -d workout-tracker
CREATE TABLE IF NOT EXISTS "testy" (
    workout_id int not null,
    date timestamp,
    rating int,
    duration double precision,
    distance double precision,
    average_speed double precision,
    heart_rate int,
    mode varchar(255),
    description varchar(255),
    PRIMARY KEY(workout_id)
);
```