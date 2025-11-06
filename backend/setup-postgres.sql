-- ========================================
-- PostgreSQL Database Setup Script
-- Project Allocation Tracker
-- ========================================

-- Step 1: Create Database
CREATE DATABASE allocation_tracker_db;

-- Step 2: Create User
CREATE USER allocation_user WITH PASSWORD 'allocation_pass';

-- Step 3: Grant Privileges
GRANT ALL PRIVILEGES ON DATABASE allocation_tracker_db TO allocation_user;

-- Connect to the database
\c allocation_tracker_db

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO allocation_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO allocation_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO allocation_user;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO allocation_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO allocation_user;

-- Verify connection
SELECT current_database(), current_user;

-- Done!
-- Exit with: \q

