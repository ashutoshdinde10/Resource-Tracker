# 📊 Project Allocation Tracker

A full-stack application for tracking user allocations across multiple projects with SOW (Statement of Work) and team management.

## 🏗️ Project Structure

```
POC/
├── backend/              # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/    # Java source files
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── data.sql  # Sample data
│   │   │       └── static/   # React build output
│   └── pom.xml
│
└── frontend/            # React Frontend
    ├── src/
    │   ├── components/  # React components
    │   ├── services/    # API services
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## 🚀 Quick Start

### Prerequisites
- **Java 17+** and Maven
- **Node.js 16+** and npm (for React frontend)
- **PostgreSQL 12+** (database server)

### Database Setup

**First time only - Setup PostgreSQL:**

1. Install PostgreSQL from https://www.postgresql.org/download/
2. Run the setup script:
```bash
psql -U postgres -f backend/setup-postgres.sql
```

Or see detailed instructions: **[POSTGRES_SETUP.md](POSTGRES_SETUP.md)**

---

### Running the Application

#### Option 1: Development Mode (Recommended)

**Terminal 1 - Start Backend:**
```bash
cd backend
mvn spring-boot:run
```
Backend runs on: http://localhost:8080

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:3000

**Open Browser:** http://localhost:3000

---

#### Option 2: Production Build

**Build React App:**
```bash
cd frontend
npm install
npm run build
```

**Start Backend (serves React app):**
```bash
cd backend
mvn spring-boot:run
```

**Open Browser:** http://localhost:8080

---

## ✨ Features

### 📈 Dashboard
- Real-time statistics
- Total users, projects, and allocations count

### 👥 Users Management
- Create, edit, delete users
- **Click on any user** → View complete allocation history
- Track name, email, department, role

### 📁 Projects Management
- Full CRUD operations
- **Click on any project** → View all team members
- Project status: Active, Completed, On Hold, Extended

### 📋 Allocations Management
- Assign users to projects with percentage
- Track SOW (Statement of Work) numbers
- Manage team names
- Set working status and dates

### 📜 History & Audit Trail
- **NEW!** Complete change tracking
- View all modifications to users and allocations
- See dates, SOW numbers, allocation changes
- Filter by change type (User/Allocation)
- Detailed before/after values
- Automatic logging of all CRUD operations

### 🎯 Interactive Features
✅ Click users → See allocation history  
✅ Click projects → See team members  
✅ All details include SOW and Team info  
✅ **History tab → See all changes**  
✅ Real-time updates  
✅ Beautiful responsive UI

---

## 🛠️ Tech Stack

### Backend
- Spring Boot 3.x
- Spring Data JPA
- **PostgreSQL Database**
- Java 17
- Maven

### Frontend
- React 18
- Vite (build tool)
- Axios (API calls)
- Modern CSS3

---

## 📊 Database

The application starts with **empty tables**. You can add your own data through the UI.

---

## 🔧 Configuration

### Backend Port
Default: `8080`  
Change in: `backend/src/main/resources/application.properties`
```properties
server.port=8080
```

### Frontend Dev Port
Default: `3000`  
Change in: `frontend/vite.config.js`
```javascript
server: { port: 3000 }
```

### Database
Using **PostgreSQL**
- Database: `allocation_tracker_db`
- Username: `allocation_user`
- Password: `allocation_pass`
- Port: `5432`

**GUI Tool:** pgAdmin (included with PostgreSQL installer)

---

## 🐛 Troubleshooting

### "npm not recognized"
Install Node.js from: https://nodejs.org/

### Port already in use
Change ports in configuration files or kill processes:
```powershell
# Windows
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess | Stop-Process
```

### Backend connection issues
1. Ensure backend runs on port 8080
2. Check `frontend/vite.config.js` proxy settings
3. Restart both servers

---

## 📝 API Endpoints

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Allocations
- `GET /api/allocations` - List all allocations
- `POST /api/allocations` - Create allocation
- `PUT /api/allocations/{id}` - Update allocation
- `DELETE /api/allocations/{id}` - Delete allocation
- `GET /api/allocations/user/{userId}` - User history
- `GET /api/allocations/project/{projectId}` - Project team

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics

### History
- `GET /api/history` - Get all change history (audit trail)

---

## 🚦 Development Tips

1. **Hot Reload**: Frontend updates instantly during development
2. **Console Logs**: Check browser console and terminal for errors
3. **H2 Console**: View database at http://localhost:8080/h2-console
4. **Sample Data**: Auto-loaded on startup from `data.sql`

---

## 📄 License

This is a POC (Proof of Concept) project for allocation tracking.

---

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test locally
4. Submit pull request

---

**Happy Tracking! 🎉**

