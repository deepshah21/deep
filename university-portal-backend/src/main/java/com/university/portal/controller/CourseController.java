package com.university.portal.controller;

import com.university.portal.dto.response.MessageResponse;
import com.university.portal.model.Course;
import com.university.portal.model.Enrollment;
import com.university.portal.model.User;
import com.university.portal.repository.CourseRepository;
import com.university.portal.repository.EnrollmentRepository;
import com.university.portal.repository.UserRepository;
import com.university.portal.security.services.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
            return ResponseEntity.ok(course.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/available")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Course>> getAvailableCourses() {
        List<Course> courses = courseRepository.findCoursesWithAvailableSpots();
        return ResponseEntity.ok(courses);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
    public ResponseEntity<?> createCourse(@RequestBody Course course, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        if (courseRepository.existsByCourseCode(course.getCourseCode())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Course code is already in use!"));
        }

        // If user is faculty, set them as instructor
        User currentUser = userRepository.findById(userPrincipal.getId()).get();
        if (currentUser.getRoles().stream().anyMatch(role -> role.getName().name().equals("ROLE_FACULTY"))) {
            course.setInstructor(currentUser);
        }

        Course savedCourse = courseRepository.save(course);
        return ResponseEntity.ok(savedCourse);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or (hasRole('FACULTY') and @courseRepository.findById(#id).orElse(new com.university.portal.model.Course()).instructor.id == authentication.principal.id)")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        Optional<Course> optionalCourse = courseRepository.findById(id);
        if (optionalCourse.isPresent()) {
            Course course = optionalCourse.get();
            course.setCourseName(courseDetails.getCourseName());
            course.setDescription(courseDetails.getDescription());
            course.setCredits(courseDetails.getCredits());
            course.setSemester(courseDetails.getSemester());
            course.setAcademicYear(courseDetails.getAcademicYear());
            course.setMaxEnrollment(courseDetails.getMaxEnrollment());
            
            Course updatedCourse = courseRepository.save(course);
            return ResponseEntity.ok(updatedCourse);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Course deleted successfully!"));
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{courseId}/enroll")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> enrollInCourse(@PathVariable Long courseId, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (!optionalCourse.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Course course = optionalCourse.get();
        User student = userRepository.findById(userPrincipal.getId()).get();

        // Check if already enrolled
        if (enrollmentRepository.existsByStudentAndCourse(student, course)) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Already enrolled in this course!"));
        }

        // Check if course is full
        if (course.getCurrentEnrollment() >= course.getMaxEnrollment()) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Course is full!"));
        }

        // Create enrollment
        Enrollment enrollment = new Enrollment(student, course);
        enrollmentRepository.save(enrollment);

        // Update course enrollment count
        course.setCurrentEnrollment(course.getCurrentEnrollment() + 1);
        courseRepository.save(course);

        return ResponseEntity.ok(new MessageResponse("Successfully enrolled in course!"));
    }

    @GetMapping("/my-courses")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Course>> getMyEnrolledCourses(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        List<Course> courses = courseRepository.findCoursesByStudentId(userPrincipal.getId());
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/teaching")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<List<Course>> getTeachingCourses(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User instructor = userRepository.findById(userPrincipal.getId()).get();
        List<Course> courses = courseRepository.findByInstructor(instructor);
        return ResponseEntity.ok(courses);
    }
}