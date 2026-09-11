# Hotel Management System

A full-stack **Hotel Management System** developed with **Spring Boot, React, MySQL, and Docker**.

The application provides a web-based interface for managing the main operations of a hotel, including customers, addresses, hotels, rooms, employees, reservations, and payments.

It also includes user registration, login, password hashing, basic user session handling, and logout functionality.

---

## Technologies

### Backend

- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- MySQL
- Lombok
- REST API
- Swagger / OpenAPI
- BCrypt password hashing

### Frontend

- React
- Vite
- JavaScript
- Material UI (MUI)
- Axios
- React Router
- Browser `sessionStorage` for basic logged-in user state

### Database

- MySQL 8

### Deployment

- Docker
- Docker Compose
- Nginx

---

# Main Features

The Hotel Management System includes the following functionality:

- User Registration
- User Login
- User Logout
- BCrypt password hashing
- Basic logged-in user information stored in `sessionStorage`
- Dashboard
- Customers
- Addresses
- Hotels
- Rooms
- Employees
- Reservations
- Payments

The main management modules support CRUD operations:

- Create
- Read
- Update
- Delete
- Search
- Filtering

---

# Authentication

The application provides a basic authentication flow.

## Registration

Users can create an account from the Sign Up page.

The registration process sends the following information to the backend:

- First Name
- Last Name
- Email
- Password

The password is never stored in plain text.

The backend hashes passwords using **BCrypt** before storing them in the MySQL database.

New users are assigned the default role:

```text
USER
```

The password confirmation field is used only by the frontend for validation and is not stored in the database.

---

## Login

Users can log in using their email and password.

The frontend sends the credentials to:

```text
POST /api/auth/login
```

The backend verifies the submitted password against the stored BCrypt password hash.

If authentication succeeds, basic user information is returned to the frontend.

Example:

```json
{
  "userId": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "role": "USER"
}
```

The password is never included in the authentication response.

---

## User Session

After a successful login, basic user information is stored in the browser using:

```text
sessionStorage
```

This allows the frontend to display the currently logged-in user's name.

For example:

```text
John Smith
```

The stored user information does not include the password.

---

## Logout

The application provides a Logout button in the navigation bar.

When the user logs out:

1. The user information is removed from `sessionStorage`.
2. The user is redirected to the Login page.

---

## Authentication Scope

The current authentication implementation provides credential verification using BCrypt and basic frontend session state.

The project intentionally does **not** currently implement:

- JWT authentication
- Refresh tokens
- Server-side authentication sessions
- Spring Security route authorization
- Role-based endpoint protection

Therefore, `sessionStorage` is used for frontend application state and should not be considered backend API authorization.

These features can be added in a future version if stronger production-level access control is required.

---

# Dashboard

The dashboard provides an overview of the hotel management system.

It displays general statistics such as:

- Total Customers
- Total Hotels
- Total Rooms
- Total Employees
- Total Reservations
- Total Payments

It also provides operational statistics including:

- Available Rooms
- Occupied Rooms
- Reserved Rooms
- Maintenance Rooms
- Pending Reservations
- Confirmed Reservations
- Completed Reservations
- Cancelled Reservations
- Total Revenue

---

# Application Modules

## Customers

Provides functionality for managing hotel customers.

Operations include:

- View customers
- Add customers
- Edit customers
- Delete customers
- Search
- Filtering

---

## Addresses

Provides functionality for managing address information used by the system.

---

## Hotels

Provides functionality for managing hotel information.

---

## Rooms

Provides functionality for managing hotel rooms and room status.

Room statuses include:

```text
AVAILABLE
RESERVED
OCCUPIED
MAINTENANCE
```

Room types include:

```text
SINGLE
DOUBLE
SUITE
DELUXE
FAMILY
```

---

## Employees

Provides functionality for managing hotel employees.

Employee positions include:

```text
MANAGER
RECEPTIONIST
HOUSEKEEPING
CHEF
WAITER
MAINTENANCE
```

Operations include:

- View employees
- Add employees
- Edit employees
- Delete employees
- Search by last name
- Filter by position

---

## Reservations

Provides functionality for managing hotel reservations and reservation status tracking.

---

## Payments

Provides functionality for managing payments associated with reservations.

Operations include:

- View payments
- Add payments
- Edit payments
- Delete payments
- Filter payments

---

# REST API

The Spring Boot backend exposes REST endpoints for the application's main resources.

Main API paths include:

```text
/api/auth
/api/customers
/api/addresses
/api/hotels
/api/rooms
/api/employees
/api/reservations
/api/payments
```

Authentication endpoints include:

```text
POST /api/auth/register
POST /api/auth/login
```

The React frontend communicates with the REST API using Axios.

---

# Project Structure

```text
hotel-management-project/
|
|-- backend/
|   |-- src/
|   |   `-- main/
|   |       |-- java/
|   |       |   `-- com/hotelmanagement/
|   |       `-- resources/
|   |
|   |-- Dockerfile
|   |-- pom.xml
|   |-- mvnw
|   `-- mvnw.cmd
|
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- api/
|   |   |-- assets/
|   |   |-- components/
|   |   |-- pages/
|   |   `-- services/
|   |
|   |-- Dockerfile
|   |-- nginx.conf
|   |-- package.json
|   |-- package-lock.json
|   `-- vite.config.js
|
|-- database/
|   `-- HotelManagementDB.sql
|
|-- .env.example
|-- .gitignore
|-- docker-compose.yml
`-- README.md
```

---

# Recommended Installation: Docker

The recommended way to run the complete application is using **Docker Desktop and Docker Compose**.

Docker provides all three main application services:

```text
MySQL Database
       |
Spring Boot Backend
       |
React + Nginx Frontend
```

Using Docker avoids the need to manually run the frontend, backend, and database as separate development processes.

---

# Docker Requirements

Before running the application on Windows, install:

- Docker Desktop
- Docker Compose

Docker Compose is included with current versions of Docker Desktop.

Docker Desktop must be running before starting the application.

---

# Docker Environment Configuration

The repository includes:

```text
.env.example
```

Create a copy of this file in the project root and rename it:

```text
.env
```

Configure the required Docker environment values.

Example:

```env
MYSQL_DATABASE=hotelmanagementdb
MYSQL_ROOT_PASSWORD=YOUR_DOCKER_MYSQL_PASSWORD
SPRING_DATASOURCE_USERNAME=root
```

Use the variables and values defined by the supplied `.env.example` as the authoritative template for the current project configuration.

The real `.env` file contains local configuration and must **not** be committed to Git.

---

# Start the Application with Docker

Open a terminal in the project root:

```text
hotel-management-project
```

Run:

```bash
docker compose up --build -d
```

Docker Compose starts:

```text
Frontend    http://localhost:3000
Backend     http://localhost:8080
MySQL       localhost:3307
```

The Spring Boot backend communicates with the MySQL Docker service internally using:

```text
db:3306
```

---

# Check Docker Status

Run:

```bash
docker compose ps
```

The following services should be running:

```text
hotel-management-db
hotel-management-backend
hotel-management-frontend
```

The database should report a healthy status before the backend is considered fully ready.

---

# Open the Application

After all Docker containers have started, open:

```text
http://localhost:3000
```

The Login page is the default entry point of the application.

New users can create an account using the Sign Up page.

---

# Swagger / OpenAPI

The backend REST API can be inspected and tested through Swagger UI.

When the backend is running, open:

```text
http://localhost:8080/swagger-ui/index.html
```

---

# Stop the Application

From the project root run:

```bash
docker compose down
```

This stops and removes the application containers while preserving the Docker database volume.

## Important

Do not normally use:

```bash
docker compose down -v
```

The `-v` option removes Docker volumes.

If the MySQL database is stored in a Docker volume, using this command can permanently remove the stored application data.

---

# Docker Architecture

```text
Web Browser
     |
     | http://localhost:3000
     v
React Frontend
Nginx
     |
     | REST API
     v
Spring Boot Backend
localhost:8080
     |
     | Internal Docker Network
     v
MySQL
db:3306
```

The MySQL container is also exposed on the Windows host as:

```text
localhost:3307
```

---

# Database

The application uses a MySQL database named:

```text
hotelmanagementdb
```

The backend currently uses:

```properties
spring.jpa.hibernate.ddl-auto=validate
```

This means Hibernate validates the existing database schema instead of automatically creating missing tables.

Therefore, the required database schema must exist before the backend can start successfully.

The database initialization process must provide all required application tables, including the `users` table used by authentication.

Before creating a final end-user installer, the complete database initialization process should be verified from a clean Docker environment.

---

# Manual Development Setup

Docker is the recommended way to run the complete application.

Developers can also run the components manually.

## Development Requirements

For manual development, the following software may be required:

- Java 17
- Maven
- Node.js
- npm
- MySQL Server
- Git

An IDE such as IntelliJ IDEA or Visual Studio Code can also be used.

---

## Run Backend Manually

Navigate to:

```bash
cd backend
```

Run:

```bash
mvn spring-boot:run
```

or on Windows using the Maven Wrapper:

```cmd
mvnw.cmd spring-boot:run
```

The backend runs by default on:

```text
http://localhost:8080
```

---

## Run Frontend Manually

Navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite displays the development URL in the terminal.

---

# Local Backend Configuration

For non-Docker local development, database credentials should not be committed to Git.

Local configuration files containing passwords or environment-specific credentials must remain excluded through `.gitignore`.

Never commit real database passwords, secrets, or local `.env` files.

---

# Security Notes

The application follows several basic security practices:

- User passwords are hashed using BCrypt.
- Plain-text passwords are not stored in the `users` table.
- Authentication responses do not contain passwords.
- New users receive the `USER` role by default.
- Local environment configuration is excluded from version control.
- The `.env` file should never be committed.
- Password confirmation is handled only by the frontend and is not persisted.

The current application does not provide full production authentication/authorization security.

For an internet-facing production deployment, additional security measures would be required.

---

# Git Workflow

Before making changes, check the repository state:

```bash
git status
```

After verified changes:

```bash
git add .
git commit -m "Describe the changes"
git push origin main
```

Generated and sensitive files should remain excluded through `.gitignore`.

Examples include:

```text
frontend/node_modules/
frontend/dist/
backend/target/
.env
```

---

# Future Improvements

Possible future improvements include:

- JWT or server-side authentication sessions
- Spring Security integration
- Role-based authorization
- Protected backend API endpoints
- Forgot password functionality
- Email verification
- Improved dashboard statistics
- Reporting
- Pagination
- Advanced search
- Reservation availability checking
- Payment reporting
- Automated tests
- Production deployment
- Windows installer

---

# Windows Installer

A Windows installer can be prepared for the final application.

The intended end-user flow is:

```text
HotelManagementSetup.exe
          |
          v
Install application files
          |
          v
Start Docker services
          |
          v
MySQL + Backend + Frontend
          |
          v
Open http://localhost:3000
```

The installer can also provide:

- Desktop shortcut
- Start Menu shortcut
- Application launcher
- Docker availability check
- Automatic application startup
- Browser launch
- Uninstall support

The final installer should be created only after verifying that the Docker stack and database can initialize correctly from a clean environment.

---

# Final Release Checklist

Before creating the final release:

- Verify frontend production build
- Verify backend Maven build
- Verify Sign Up
- Verify Login
- Verify BCrypt password storage
- Verify logged-in user display
- Verify Logout
- Verify Customers CRUD
- Verify Addresses CRUD
- Verify Hotels CRUD
- Verify Rooms CRUD
- Verify Employees CRUD
- Verify Reservations CRUD
- Verify Payments CRUD
- Verify Dashboard
- Verify Swagger UI
- Verify Docker startup
- Verify Docker shutdown
- Verify database initialization from a clean environment
- Verify `.env` is not committed
- Create final Git checkpoint
- Create final release version
- Create Windows installer

---

# Author

**Yannis Drougas**

Hotel Management System

Full-stack project using Spring Boot, React, MySQL, Docker, and Nginx.