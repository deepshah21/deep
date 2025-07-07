package com.university.portal.repository;

import com.university.portal.model.Course;
import com.university.portal.model.Enrollment;
import com.university.portal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    Optional<Enrollment> findByStudentAndCourse(User student, Course course);
    
    List<Enrollment> findByStudent(User student);
    
    List<Enrollment> findByCourse(Course course);
    
    List<Enrollment> findByStatus(String status);
    
    Boolean existsByStudentAndCourse(User student, Course course);
    
    Long countByCourse(Course course);
}