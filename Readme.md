# LeaveManager: Employee-User Leave Management System

## 🚀 Project Overview

LeaveManager is a robust Django-React based web application designed to streamline leave management processes for organizations. It provides a comprehensive solution for employees to apply for leaves and managers to track and approve leave requests.

## ✨ Features

### User Management
- JWT-based authentication
- Two user roles: Employee and Manager
- Secure token-based login system

### Leave Management
- Create, update, and delete leave applications
- Multiple leave status tracking (Pending, Approved, Rejected)
- Role-based leave application visibility
- Status-based filtering and ordering

## 🛠 Technology Stack

- Backend: Django
- Frontend: React
- API Framework: Django REST Framework
- Authentication: JWT (Simple JWT)
- Database: PostgreSQL (recommended)
- Python 3.8+


## 📦 Installation

### Prerequisites
- Python 3.8+
- React
- pip
- virtualenv (recommended)

### Setup Steps

1. Clone the repository
   ```bash
   git clone https://github.com/Sinanalungal/mechine_task_leave_management.git
   cd mechine_task_leave_management/Backend/
   ```

2. Create a virtual environment
   ```bash
   python -m venv venv
   source venv/bin/activate 
   ```

3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

5. Create .env file
   ```bash
   # Django settings
   SECRET_KEY=
   DEBUG=
   ALLOWED_HOSTS=

   # Database configuration
   DB_NAME=
   DB_USER=
   DB_PASSWORD=
   DB_HOST=
   DB_PORT=

   # Email settings
   EMAIL_HOST=
   EMAIL_PORT=
   EMAIL_USE_TLS=
   EMAIL_HOST_USER=
   EMAIL_HOST_PASSWORD=
   DEFAULT_FROM_EMAIL=

   ```
5. Configure Database
   - Update `settings.py` with your database credentials
   - Run migrations:
     ```bash
     python manage.py makemigrations
     python manage.py migrate
     ```

6. Create Superuser
   ```bash
   python manage.py createsuperuser
   ```

7. Change SuperUser role to manager through admin interface

8. Run Development Server
   ```bash
   python manage.py runserver
   ```

9. change the directory to the Frontent
 ```bash
   cd mechine_task_leave_management/Frontend/
   ```

10. Install Dependencies
 ```bash
   npm install
   ```

11. Run Application:
 ```bash
   npm run dev
   ```

   
## 🔐 Authentication Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/user_authentication/token/` | POST | Obtain JWT tokens |
| `/user_authentication/token/refresh/` | POST | Refresh access token |
| `/user_authentication/token/verify/` | POST | Verify token validity |

## 📋 Leave Management Endpoints

| Endpoint | Method | Description | Permissions |
|----------|--------|-------------|-------------|
| `/leave/leave-applications/` | GET | List leave applications | Authenticated |
| `/leave/leave-applications/` | POST | Create leave application | Authenticated |
| `/leave/leave-applications/{id}/` | GET | Retrieve specific application | Authenticated |
| `/leave/leave-applications/approve/` | POST | Approve leave | Manager |
| `/leave/leave-applications/reject/` | POST | Reject leave | Manager |
| `/leave/leave-balance/status_counts/` | GET | Get leave status counts | Authenticated |

## 🔍 Key Workflow

1. Employee Login
2. Create Leave Application
3. Manager Reviews Application
4. Approve or Reject Leave

## 🛡 Permissions

- Employees can:
  - View and manage their own leave applications
  - Check leave status

- Managers can:
  - View team's leave applications
  - Approve or reject pending leaves
  - Access comprehensive leave reports



