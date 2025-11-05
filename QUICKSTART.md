# 🚀 Quick Start Guide

## 3 Simple Steps to Run

### 1️⃣ Build the Project
```bash
mvn clean install
```

### 2️⃣ Run the Application
```bash
mvn spring-boot:run
```

### 3️⃣ Open Browser
```
http://localhost:8080
```

## ✨ That's It!

The application automatically:
- ✅ Creates H2 in-memory database
- ✅ Loads 20 sample users across 8 departments
- ✅ Loads 12 sample projects with different statuses
- ✅ Loads 40+ realistic allocations

## 🎯 What You Get

### Comprehensive Dummy Data:

**20 Users Across 8 Departments:**
- 👨‍💻 Engineering (7 users) - Developers, Tech Leads, DevOps
- 🎨 Design (3 users) - UI/UX, Product Designers
- 🧪 QA (3 users) - QA Engineers, Test Automation
- 📋 Product (2 users) - Product Managers, Product Owners
- 📊 Data (2 users) - Data Analysts, Data Scientists
- 📢 Marketing (1 user) - Marketing Specialist
- 🛟 Support (1 user) - Technical Support
- 👔 Management (1 user) - Engineering Manager

**12 Projects with Various Statuses:**
- 6 ACTIVE projects (E-Commerce, Mobile App, AI Chatbot, etc.)
- 3 COMPLETED projects (Analytics Dashboard, Security Audit, etc.)
- 3 ON_HOLD projects (API Modernization, Blockchain, VR Portal)

**40+ Realistic Allocations:**
- Multiple users on multiple projects
- Allocation percentages: 20%-100%
- Mixed working/not-working statuses
- Large teams (8+ people) and small teams (2-3 people)
- Cross-functional team compositions

## 🔍 View Database (Optional)

Access H2 Console: `http://localhost:8080/h2-console`

**Login:**
- JDBC URL: `jdbc:h2:mem:allocationdb`
- Username: `sa`
- Password: (leave empty)

## 📝 No Setup Required!

- ❌ No database installation
- ❌ No configuration needed
- ❌ No environment variables
- ✅ Just run and go!

## 💡 Quick Tips

1. **Fresh Start**: Data resets on every restart
2. **Add Your Own**: Use the UI to add users, projects, allocations
3. **Test Freely**: Can't break anything - just restart!
4. **API Ready**: All REST endpoints available at `/api/*`

Happy coding! 🎉

