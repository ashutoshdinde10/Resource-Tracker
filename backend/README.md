# Spring Boot Backend

Backend API for Project Allocation Tracker.

## 🚀 Run

```bash
mvn spring-boot:run
```

Runs on: http://localhost:8080

## 🗄️ Database

**PostgreSQL Database**

Setup required (first time only):
```bash
psql -U postgres -f setup-postgres.sql
```

Connection details:
- Database: `allocation_tracker_db`
- Username: `allocation_user`
- Password: `allocation_pass`
- Port: `5432`

See: `../POSTGRES_SETUP.md` for detailed instructions

## 📊 Data

Starts with empty tables. Add data through the frontend UI.

## 📡 API Endpoints

- `/api/users` - Users CRUD
- `/api/projects` - Projects CRUD
- `/api/allocations` - Allocations CRUD
- `/api/dashboard/stats` - Dashboard statistics

## ⚙️ Configuration

`src/main/resources/application.properties`

## 🏗️ Build

```bash
mvn clean package
```

Creates JAR in `target/` folder.

