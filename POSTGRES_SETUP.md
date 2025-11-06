# 🐘 PostgreSQL Setup Guide

## Prerequisites

You need PostgreSQL installed on your system.

### Download & Install PostgreSQL

**Windows:**
- Download from: https://www.postgresql.org/download/windows/
- Use the installer (includes pgAdmin 4)
- Default port: 5432
- Remember the password you set for the `postgres` user

**Mac:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

---

## Database Setup

### Option 1: Using the SQL Script (Recommended)

1. **Open PostgreSQL Command Line (psql)**

   **Windows:**
   - Open "SQL Shell (psql)" from Start Menu
   - Press Enter for default server, database, port, and username
   - Enter the password you set during installation

   **Mac/Linux:**
   ```bash
   sudo -u postgres psql
   ```

2. **Run the setup script:**
   ```sql
   \i 'C:/Users/ashutosh.dinde_codit/Desktop/POC/backend/setup-postgres.sql'
   ```
   
   Or copy-paste the commands from `backend/setup-postgres.sql`

3. **Exit psql:**
   ```sql
   \q
   ```

---

### Option 2: Manual Setup

**Connect to PostgreSQL:**
```bash
psql -U postgres
```

**Run these commands:**
```sql
-- Create database
CREATE DATABASE allocation_tracker_db;

-- Create user
CREATE USER allocation_user WITH PASSWORD 'allocation_pass';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE allocation_tracker_db TO allocation_user;

-- Connect to the new database
\c allocation_tracker_db

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO allocation_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO allocation_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO allocation_user;

-- Set default privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO allocation_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO allocation_user;

-- Exit
\q
```

---

## Configuration

The application is configured with these settings in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/allocation_tracker_db
spring.datasource.username=allocation_user
spring.datasource.password=allocation_pass
```

### Change Database Credentials (Optional)

If you want to use different credentials:

1. **Update PostgreSQL:**
   ```sql
   CREATE DATABASE your_db_name;
   CREATE USER your_username WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE your_db_name TO your_username;
   ```

2. **Update `application.properties`:**
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/your_db_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

---

## Running the Application

### Step 1: Start PostgreSQL
Make sure PostgreSQL is running:

**Windows:** Check Services, or it auto-starts with the installer

**Mac:**
```bash
brew services start postgresql@15
```

**Linux:**
```bash
sudo systemctl start postgresql
sudo systemctl status postgresql
```

### Step 2: Verify Database
```bash
psql -U allocation_user -d allocation_tracker_db
```

If successful, you should see:
```
allocation_tracker_db=>
```

Exit with `\q`

### Step 3: Start the Application

**Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Open:** http://localhost:3000

---

## Sample Data

The application will automatically:
1. Create all tables (users, projects, user_project_allocations, audit_history)
2. Load sample data from `backend/src/main/resources/data.sql`
3. Insert 20 users, 12 projects, 49 allocations, and 15+ history records

---

## Verify Setup

### Check Tables
```bash
psql -U allocation_user -d allocation_tracker_db
```

```sql
-- List all tables
\dt

-- Check data
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM projects;
SELECT COUNT(*) FROM user_project_allocations;
SELECT COUNT(*) FROM audit_history;

-- Exit
\q
```

You should see:
- `users`: 20 records
- `projects`: 12 records
- `user_project_allocations`: 49 records
- `audit_history`: 15+ records

---

## Using pgAdmin (GUI Tool)

pgAdmin comes with the PostgreSQL installer on Windows.

1. **Open pgAdmin 4**
2. **Create Connection:**
   - Right-click "Servers" → Create → Server
   - Name: "Allocation Tracker"
   - Host: localhost
   - Port: 5432
   - Database: allocation_tracker_db
   - Username: allocation_user
   - Password: allocation_pass

3. **Browse Database:**
   - Expand "Servers" → "Allocation Tracker" → "Databases" → "allocation_tracker_db"
   - View "Schemas" → "public" → "Tables"

---

## Troubleshooting

### Error: "role does not exist"
```sql
psql -U postgres
CREATE USER allocation_user WITH PASSWORD 'allocation_pass';
```

### Error: "database does not exist"
```sql
psql -U postgres
CREATE DATABASE allocation_tracker_db;
```

### Error: "password authentication failed"
Check your password in `application.properties` matches the database user password.

### Error: "Connection refused"
Make sure PostgreSQL is running:
```bash
# Check status
sudo systemctl status postgresql  # Linux
brew services list                # Mac
```

### Port 5432 already in use
Another PostgreSQL instance might be running. Check with:
```bash
netstat -an | grep 5432  # Linux/Mac
netstat -ano | findstr 5432  # Windows
```

---

## Data Persistence

Unlike H2 in-memory database:
- ✅ **Data persists** after application restart
- ✅ **Production-ready** database
- ✅ **Better performance** for large datasets
- ✅ **Real database** for deployment

**Note:** If you restart the application, `data.sql` will try to insert sample data again. You may want to:

1. **Disable data.sql after first run:**
   ```properties
   spring.sql.init.mode=never
   ```

2. **Or use `ddl-auto=update` instead of `create-drop`** (already configured)

---

## Migration from H2 to PostgreSQL

Your application is now using PostgreSQL! The change includes:

✅ Updated `pom.xml` - PostgreSQL driver added  
✅ Updated `application.properties` - PostgreSQL configuration  
✅ Same schema, same data  
✅ All features work identically  

---

## Security Note

For production:
1. Change default passwords
2. Use environment variables for credentials
3. Enable SSL connections
4. Restrict network access

Example with environment variables:
```properties
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/allocation_tracker_db}
spring.datasource.username=${DB_USER:allocation_user}
spring.datasource.password=${DB_PASS:allocation_pass}
```

---

**Your application is now ready to use PostgreSQL!** 🎉

