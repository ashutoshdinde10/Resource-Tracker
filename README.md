# Project Allocation Tracker

A comprehensive user-project allocation management system built with Spring Boot and HTML/CSS/JavaScript.

## Features

- **User Management**: Create, read, update, and delete users with details like name, email, department, and role
- **Project Management**: Manage projects with information including name, description, project manager, dates, and status
- **Allocation Tracking**: Track user allocations to projects with:
  - Allocation percentage (0-100%)
  - Working status (currently working or not)
  - Start and end dates
  - Remarks
- **Dashboard**: View quick statistics and active allocations overview
- **Modern UI**: Clean, responsive interface with gradient design

## Technology Stack

### Backend
- **Spring Boot 3.1.5** - Application framework
- **Spring Data JPA** - Database operations
- **H2 Database** - In-memory database (development)
- **Lombok** - Reduce boilerplate code
- **Java 17** - Programming language

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern gradients and animations
- **JavaScript (Vanilla)** - Interactivity and API calls

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- No database installation needed (uses H2 in-memory database with dummy data)

## Project Structure

```
project-allocation-tracker/
├── src/
│   ├── main/
│   │   ├── java/com/allocation/tracker/
│   │   │   ├── ProjectAllocationTrackerApplication.java
│   │   │   ├── controller/
│   │   │   │   ├── UserController.java
│   │   │   │   ├── ProjectController.java
│   │   │   │   └── AllocationController.java
│   │   │   ├── entity/
│   │   │   │   ├── User.java
│   │   │   │   ├── Project.java
│   │   │   │   └── UserProjectAllocation.java
│   │   │   ├── repository/
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── ProjectRepository.java
│   │   │   │   └── AllocationRepository.java
│   │   │   └── service/
│   │   │       ├── UserService.java
│   │   │       ├── ProjectService.java
│   │   │       └── AllocationService.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   │           ├── index.html
│   │           ├── css/
│   │           │   └── styles.css
│   │           └── js/
│   │               └── app.js
└── pom.xml
```

## Installation & Running

### Step 1: Navigate to Project Directory
```bash
cd C:\Users\ashutosh.dinde_codit\Desktop\POC
```

### Step 2: Build the Project
```bash
mvn clean install
```

### Step 3: Run the Application
```bash
mvn spring-boot:run
```

The application will start on **http://localhost:8080**

The application will automatically:
- Create H2 in-memory database
- Create required tables
- Load comprehensive dummy data (20 users, 12 projects, 40+ allocations)

### Step 4: Access the Application
Open your web browser and navigate to:
```
http://localhost:8080
```

### Step 5: Access H2 Database Console (Optional)
For debugging and viewing the database:
```
http://localhost:8080/h2-console
```
**Connection Details:**
- JDBC URL: `jdbc:h2:mem:allocationdb`
- Username: `sa`
- Password: (leave empty)

## API Endpoints

### User Endpoints
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Project Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get project by ID
- `GET /api/projects/status/{status}` - Get projects by status
- `POST /api/projects` - Create new project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Allocation Endpoints
- `GET /api/allocations` - Get all allocations
- `GET /api/allocations/{id}` - Get allocation by ID
- `GET /api/allocations/user/{userId}` - Get allocations for a user
- `GET /api/allocations/project/{projectId}` - Get allocations for a project
- `GET /api/allocations/active` - Get all active allocations
- `POST /api/allocations` - Create new allocation
- `PUT /api/allocations/{id}` - Update allocation
- `DELETE /api/allocations/{id}` - Delete allocation

## Usage Guide

### 1. Creating Users
1. Navigate to the **Users** tab
2. Click **Add User** button
3. Fill in the user details:
   - Name (required)
   - Email (required)
   - Department (optional)
   - Role (optional)
4. Click **Save**

### 2. Creating Projects
1. Navigate to the **Projects** tab
2. Click **Add Project** button
3. Fill in the project details:
   - Project Name (required)
   - Description (optional)
   - Project Manager (optional)
   - Start Date (optional)
   - End Date (optional)
   - Status (required): Active, Completed, or On Hold
4. Click **Save**

### 3. Creating Allocations
1. Navigate to the **Allocations** tab
2. Click **Add Allocation** button
3. Fill in the allocation details:
   - Select User (required)
   - Select Project (required)
   - Allocation Percentage (required, 0-100%)
   - Working Status (required): Currently Working or Not Working
   - Start Date (optional)
   - End Date (optional)
   - Remarks (optional)
4. Click **Save**

### 4. Dashboard Overview
- View total counts of users, projects, and active allocations
- See a table of all currently active allocations

## Database Schema

### Users Table
- `id` - Primary Key
- `name` - User's full name
- `email` - Unique email address
- `department` - Department name
- `role` - User's role/designation

### Projects Table
- `id` - Primary Key
- `name` - Project name
- `description` - Project description
- `project_manager` - Manager's name
- `start_date` - Project start date
- `end_date` - Project end date
- `status` - ACTIVE, COMPLETED, or ON_HOLD

### User_Project_Allocations Table
- `id` - Primary Key
- `user_id` - Foreign Key to Users
- `project_id` - Foreign Key to Projects
- `allocation_percentage` - Percentage (0-100)
- `is_working` - Boolean (true/false)
- `allocation_start_date` - Allocation start date
- `allocation_end_date` - Allocation end date
- `remarks` - Additional notes

## Features Highlights

### Dashboard
- Quick statistics at a glance
- Active allocations overview
- Real-time data updates

### User Management
- Complete CRUD operations
- Email validation
- Department and role tracking

### Project Management
- Status tracking (Active, Completed, On Hold)
- Date range management
- Project manager assignment

### Allocation Tracking
- Percentage-based allocation
- Working status indicator
- Date range tracking
- Remarks for additional context

## UI Features

- **Responsive Design**: Works on desktop and mobile devices
- **Modern Gradient Theme**: Beautiful purple gradient design
- **Smooth Animations**: Fade-in effects and hover animations
- **Color-coded Status**: Easy visual identification of statuses
- **Intuitive Navigation**: Tab-based navigation system
- **Form Validation**: Client and server-side validation

## Database Configuration

The application uses **H2 in-memory database** by default with dummy data.

### Current Configuration (H2)
```properties
spring.datasource.url=jdbc:h2:mem:allocationdb
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```

**Benefits:**
- ✅ No database installation required
- ✅ Dummy data pre-loaded automatically
- ✅ Perfect for development and testing
- ✅ Fresh data on every restart

### Switching to PostgreSQL (if needed)

1. Uncomment PostgreSQL dependency in `pom.xml`:
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

2. Uncomment PostgreSQL configuration in `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/primo_skeleton_dev
spring.datasource.username=primo_dev
spring.datasource.password=dev_password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

3. Create PostgreSQL database and user with proper permissions

### Switching to MySQL (if needed)

1. Add MySQL dependency to `pom.xml`:
```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

2. Update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/allocationdb
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

### Customizing the UI Theme

Edit `src/main/resources/static/css/styles.css` to change colors:
- Look for gradient definitions: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Replace with your preferred colors

## Troubleshooting

### Port 8080 Already in Use
Change the port in `application.properties`:
```properties
server.port=8081
```

### CORS Issues
CORS is already enabled with `@CrossOrigin(origins = "*")` in controllers. For production, specify allowed origins.

### Data Not Persisting Between Restarts
This is expected behavior with H2 in-memory database. Data is reset on every restart. If you need data persistence, switch to PostgreSQL or MySQL (see Database Configuration section).

## Future Enhancements

- User authentication and authorization
- Email notifications for allocation changes
- Export allocations to Excel/PDF
- Calendar view of allocations
- Reporting and analytics dashboard
- Allocation conflict detection
- Multi-tenancy support

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please refer to the documentation or contact the development team.

