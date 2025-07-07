package com.university.portal.repository;

import com.university.portal.model.Course;
import com.university.portal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findByCourseCode(String courseCode);
    
    List<Course> findByInstructor(User instructor);
    
    List<Course> findBySemesterAndAcademicYear(String semester, String academicYear);
    
    @Query("SELECT c FROM Course c WHERE c.currentEnrollment < c.maxEnrollment")
    List<Course> findCoursesWithAvailableSpots();
    
    @Query("SELECT c FROM Course c JOIN c.enrollments e WHERE e.student.id = :studentId")
    List<Course> findCoursesByStudentId(@Param("studentId") Long studentId);
    
    Boolean existsByCourseCode(String courseCode);
}