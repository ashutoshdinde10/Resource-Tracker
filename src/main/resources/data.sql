-- ========================================
-- Dummy Data for H2 Database
-- Loaded automatically on application startup
-- ========================================

-- Insert sample users (20 users across different departments)
INSERT INTO users (name, email, department, role) VALUES
-- Engineering Team
('John Doe', 'john.doe@example.com', 'Engineering', 'Senior Developer'),
('Jane Smith', 'jane.smith@example.com', 'Engineering', 'Tech Lead'),
('Sarah Williams', 'sarah.williams@example.com', 'Engineering', 'Backend Developer'),
('Robert Chen', 'robert.chen@example.com', 'Engineering', 'Frontend Developer'),
('Emily Davis', 'emily.davis@example.com', 'Engineering', 'Full Stack Developer'),
('Michael Kim', 'michael.kim@example.com', 'Engineering', 'DevOps Engineer'),
('Jessica Taylor', 'jessica.taylor@example.com', 'Engineering', 'Junior Developer'),

-- Design Team
('Mike Johnson', 'mike.johnson@example.com', 'Design', 'UI/UX Designer'),
('Amanda Martinez', 'amanda.martinez@example.com', 'Design', 'Senior Designer'),
('Chris Anderson', 'chris.anderson@example.com', 'Design', 'Product Designer'),

-- QA Team
('David Brown', 'david.brown@example.com', 'QA', 'QA Engineer'),
('Lisa Garcia', 'lisa.garcia@example.com', 'QA', 'Senior QA Engineer'),
('Tom Wilson', 'tom.wilson@example.com', 'QA', 'Test Automation Engineer'),

-- Product Management
('Rachel Green', 'rachel.green@example.com', 'Product', 'Product Manager'),
('Kevin Lee', 'kevin.lee@example.com', 'Product', 'Product Owner'),

-- Data & Analytics
('Sophia Rodriguez', 'sophia.rodriguez@example.com', 'Data', 'Data Analyst'),
('Daniel White', 'daniel.white@example.com', 'Data', 'Data Scientist'),

-- Marketing
('Olivia Thompson', 'olivia.thompson@example.com', 'Marketing', 'Marketing Specialist'),

-- Support
('James Harris', 'james.harris@example.com', 'Support', 'Technical Support Engineer'),

-- Management
('Patricia Clark', 'patricia.clark@example.com', 'Management', 'Engineering Manager');

-- Insert sample projects (12 projects with different statuses)
INSERT INTO projects (name, description, project_manager, start_date, end_date, status) VALUES
-- Active Projects
('E-Commerce Platform', 'Building a new e-commerce platform with modern tech stack', 'Patricia Clark', '2024-01-01', '2024-12-31', 'ACTIVE'),
('Mobile App Development', 'Cross-platform mobile application for customer engagement', 'Rachel Green', '2024-03-01', '2024-09-30', 'ACTIVE'),
('Customer Portal Redesign', 'Complete redesign of customer-facing portal with improved UX', 'Kevin Lee', '2024-04-01', '2024-08-30', 'ACTIVE'),
('AI Chatbot Integration', 'Integrate AI-powered chatbot for customer support', 'Rachel Green', '2024-05-01', '2024-10-31', 'ACTIVE'),
('Cloud Migration', 'Migrate legacy applications to cloud infrastructure', 'Patricia Clark', '2024-02-01', '2024-11-30', 'ACTIVE'),
('Payment Gateway Enhancement', 'Add support for multiple payment providers and cryptocurrencies', 'Kevin Lee', '2024-06-01', '2024-12-15', 'ACTIVE'),

-- Completed Projects
('Data Analytics Dashboard', 'Real-time analytics dashboard for business insights', 'Rachel Green', '2023-06-01', '2024-02-28', 'COMPLETED'),
('Security Audit 2023', 'Comprehensive security audit and penetration testing', 'Patricia Clark', '2023-09-01', '2023-12-31', 'COMPLETED'),
('Mobile App v1.0', 'First version of mobile application', 'Kevin Lee', '2023-01-01', '2023-08-31', 'COMPLETED'),

-- On Hold Projects
('API Modernization', 'Refactoring legacy APIs to microservices architecture', 'Patricia Clark', '2024-02-15', '2024-08-15', 'ON_HOLD'),
('Blockchain Integration', 'Research and development for blockchain implementation', 'Rachel Green', '2024-03-01', '2024-12-31', 'ON_HOLD'),
('VR Experience Portal', 'Virtual reality experience for product showcase', 'Kevin Lee', '2024-07-01', '2025-03-31', 'ON_HOLD');

-- Insert sample allocations (50+ allocations with realistic scenarios)
-- NOTE: Total active (is_working=true) allocation per user should not exceed 100%
INSERT INTO user_project_allocations (user_id, project_id, allocation_percentage, is_working, allocation_start_date, allocation_end_date, remarks) VALUES

-- E-Commerce Platform (Project 1) - Large team
(1, 1, 80.0, true, '2024-01-01', '2024-12-31', 'Lead developer for backend services'),
(2, 1, 100.0, true, '2024-01-01', '2024-12-31', 'Technical lead for the entire project'),
(3, 1, 60.0, true, '2024-01-15', '2024-12-31', 'Backend API development'),
(4, 1, 50.0, true, '2024-01-01', '2024-12-31', 'Frontend development and UI implementation'),
(5, 1, 50.0, true, '2024-02-01', '2024-12-31', 'Full stack feature development'),
(11, 1, 50.0, true, '2024-02-01', '2024-12-31', 'Testing e-commerce features'),
(12, 1, 30.0, true, '2024-03-01', '2024-12-31', 'QA support and test automation'),
(14, 1, 40.0, true, '2024-01-01', '2024-12-31', 'Product management and requirements'),

-- Mobile App Development (Project 2)
(1, 2, 20.0, true, '2024-03-01', '2024-09-30', 'Architecture consultation'),
(8, 2, 100.0, true, '2024-03-01', '2024-09-30', 'UI/UX design for mobile app'),
(9, 2, 80.0, true, '2024-03-01', '2024-09-30', 'Senior design lead'),
(4, 2, 50.0, true, '2024-03-15', '2024-09-30', 'Mobile frontend development'),
(5, 2, 50.0, true, '2024-03-15', '2024-09-30', 'Backend API integration'),
(11, 2, 50.0, true, '2024-03-15', '2024-09-30', 'Mobile app testing'),
(13, 2, 100.0, true, '2024-03-15', '2024-09-30', 'Test automation'),
(15, 2, 60.0, true, '2024-03-01', '2024-09-30', 'Product ownership'),

-- Customer Portal Redesign (Project 3)
(9, 3, 20.0, true, '2024-04-01', '2024-08-30', 'Design consultation'),
(10, 3, 100.0, true, '2024-04-01', '2024-08-30', 'Lead product designer'),
(7, 3, 100.0, true, '2024-04-15', '2024-08-30', 'Junior developer - portal implementation'),
(12, 3, 70.0, true, '2024-05-01', '2024-08-30', 'QA and testing'),

-- AI Chatbot Integration (Project 4)
(3, 4, 40.0, true, '2024-05-01', '2024-10-31', 'Backend integration'),
(16, 4, 100.0, true, '2024-05-01', '2024-10-31', 'Data analysis and training'),
(17, 4, 50.0, true, '2024-05-01', '2024-10-31', 'Data science and ML models'),
(19, 4, 100.0, true, '2024-05-01', '2024-10-31', 'Support integration and testing'),
(18, 4, 50.0, true, '2024-05-15', '2024-10-31', 'Marketing chatbot content'),

-- Cloud Migration (Project 5)
(6, 5, 100.0, true, '2024-02-01', '2024-11-30', 'DevOps lead for cloud migration'),
(20, 5, 50.0, true, '2024-02-01', '2024-11-30', 'Project oversight and management'),

-- Payment Gateway Enhancement (Project 6) - Small focused team
(15, 6, 40.0, true, '2024-06-01', '2024-12-15', 'Product requirements and testing'),
(18, 6, 50.0, true, '2024-06-15', '2024-12-15', 'Payment marketing campaigns'),

-- Completed Projects - Data Analytics Dashboard (Project 7)
(16, 7, 100.0, false, '2023-06-01', '2024-02-28', 'Project completed - Data analysis lead'),
(17, 7, 100.0, false, '2023-06-01', '2024-02-28', 'Project completed - Data scientist'),

-- Completed Projects - Security Audit (Project 8)
(6, 8, 80.0, false, '2023-09-01', '2023-12-31', 'Completed - Security infrastructure'),
(1, 8, 60.0, false, '2023-09-01', '2023-12-31', 'Completed - Code review and fixes'),

-- Completed Projects - Mobile App v1.0 (Project 9)
(8, 9, 100.0, false, '2023-01-01', '2023-08-31', 'Completed - UI/UX design'),
(13, 9, 80.0, false, '2023-05-01', '2023-08-31', 'Completed - QA testing'),

-- ON HOLD Projects - API Modernization (Project 10)
(3, 10, 30.0, false, '2024-02-15', '2024-08-15', 'On hold - Awaiting budget approval'),
(6, 10, 50.0, false, '2024-02-15', '2024-08-15', 'On hold - Infrastructure planning paused'),
(7, 10, 40.0, false, '2024-03-01', '2024-08-15', 'On hold - Development paused'),

-- ON HOLD Projects - Blockchain Integration (Project 11)
(17, 11, 50.0, false, '2024-03-01', '2024-12-31', 'On hold - Research phase paused'),
(16, 11, 60.0, false, '2024-03-01', '2024-12-31', 'On hold - Data analysis suspended'),

-- ON HOLD Projects - VR Experience (Project 12)
(10, 12, 70.0, false, '2024-07-01', '2025-03-31', 'On hold - VR design concepts paused'),
(9, 12, 30.0, false, '2024-07-01', '2025-03-31', 'On hold - VR UX research suspended'),

-- Users not currently working (available or between projects)
(14, 8, 50.0, false, '2023-09-01', '2023-12-31', 'Previous project completed'),
(15, 9, 40.0, false, '2023-01-01', '2023-08-31', 'Previous project completed'),
(19, 7, 30.0, false, '2023-10-01', '2024-02-28', 'Previous support role ended'),
(20, 8, 30.0, false, '2023-09-01', '2023-12-31', 'Previous management oversight completed');
