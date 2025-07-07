package com.university.portal.repository;

import com.university.portal.model.Assignment;
import com.university.portal.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByCourse(Course course);
    
    List<Assignment> findByDueDateAfter(LocalDateTime date);
    
    List<Assignment> findByDueDateBefore(LocalDateTime date);
    
    @Query("SELECT a FROM Assignment a WHERE a.course.id = :courseId ORDER BY a.dueDate ASC")
    List<Assignment> findByCourseIdOrderByDueDateAsc(@Param("courseId") Long courseId);
    
    @Query("SELECT a FROM Assignment a JOIN a.course c JOIN c.enrollments e WHERE e.student.id = :studentId")
    List<Assignment> findAssignmentsByStudentId(@Param("studentId") Long studentId);
}