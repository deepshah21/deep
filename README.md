# University Portal

A comprehensive full-stack university management system built with Spring Boot (backend) and React.js (frontend).

## 🎓 Features

### User Authentication & Authorization
- JWT-based authentication
- Role-based access control (Student, Faculty, Admin)
- Secure user registration and login

### Student Features
- Student registration and course enrollment
- Personal dashboard with enrolled courses
- View available courses and enroll
- Track assignments and grades

### Faculty Features
- Course creation and management
- Student enrollment oversight
- Assignment and exam management
- Grading system

### Admin Features
- User management (students, faculty)
- Course oversight and management
- System administration
- Comprehensive dashboard with statistics

## 🛠️ Technology Stack

### Backend
- **Java 17** with Spring Boot 3.2.0
- **Spring Security** for authentication
- **Spring Data JPA** with Hibernate
- **MySQL** database
- **JWT** for token-based authentication
- **Maven** for dependency management

### Frontend
- **React 18** with functional components and hooks
- **Redux Toolkit** for state management
- **React Router** for navigation
- **React Bootstrap** for responsive UI
- **Axios** for API communication

## 📁 Project Structure

```
university-portal/
├── university-portal-backend/          # Spring Boot backend
│   ├── src/main/java/com/university/portal/
│   │   ├── controller/                 # REST controllers
│   │   ├── model/                      # JPA entities
│   │   ├── repository/                 # Data repositories
│   │   ├── security/                   # Security configuration
│   │   ├── dto/                        # Data Transfer Objects
│   │   └── config/                     # Configuration classes
│   ├── src/main/resources/
│   │   └── application.properties      # App configuration
│   └── pom.xml                         # Maven dependencies
├── university-portal-frontend/         # React frontend
│   ├── src/
│   │   ├── components/                 # React components
│   │   │   ├── auth/                   # Authentication components
│   │   │   ├── dashboard/              # Dashboard components
│   │   │   ├── courses/                # Course management
│   │   │   └── layout/                 # Layout components
│   │   ├── store/                      # Redux store and slices
│   │   ├── services/                   # API services
│   │   └── App.js                      # Main App component
│   └── package.json                    # NPM dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd university-portal
   ```

2. **Configure MySQL Database**
   ```sql
   CREATE DATABASE university_portal;
   ```

3. **Update database configuration**
   Edit `university-portal-backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/university_portal?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

4. **Run the backend**
   ```bash
   cd university-portal-backend
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd university-portal-frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

   The frontend will start on `http://localhost:3000`

## 📊 Database Schema

### Core Entities

- **Users**: Base user entity with roles
- **Roles**: Role definitions (STUDENT, FACULTY, ADMIN)
- **Courses**: Course information and management
- **Enrollments**: Student-course relationships
- **Assignments**: Course assignments
- **Submissions**: Student assignment submissions
- **Exams**: Course examinations
- **ExamResults**: Student exam results

## 🔐 Authentication Flow

1. User registers with role selection (Student/Faculty/Admin)
2. User logs in with username/password
3. Backend validates credentials and returns JWT token
4. Frontend stores token and includes it in subsequent API requests
5. Backend validates JWT token for protected routes

## 🌟 Key Features Implementation

### Role-Based Dashboards
- **Student Dashboard**: Enrolled courses, available courses, assignments
- **Faculty Dashboard**: Teaching courses, student management, grading
- **Admin Dashboard**: System overview, user management, course oversight

### Course Management
- Create, update, and delete courses
- Enrollment management with capacity limits
- Instructor assignment and oversight

### Responsive Design
- Mobile-first approach using Bootstrap
- Responsive navigation and layouts
- Touch-friendly interface elements

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/my-courses` - Get enrolled courses (students)
- `GET /api/courses/teaching` - Get teaching courses (faculty)
- `POST /api/courses/{id}/enroll` - Enroll in course

## 🧪 Testing

### Backend Testing
```bash
cd university-portal-backend
mvn test
```

### Frontend Testing
```bash
cd university-portal-frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file:
   ```bash
   mvn clean package
   ```
2. Run the JAR:
   ```bash
   java -jar target/university-portal-0.0.1-SNAPSHOT.jar
   ```

### Frontend Deployment
1. Build for production:
   ```bash
   npm run build
   ```
2. Serve the build folder using a web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Spring Boot community for excellent documentation
- React and Redux teams for powerful frontend tools
- Bootstrap team for responsive design components

---

For questions or support, please contact [your-email@example.com] 
