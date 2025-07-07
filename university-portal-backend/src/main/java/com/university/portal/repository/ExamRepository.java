package com.university.portal.repository;

import com.university.portal.model.Course;
import com.university.portal.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByCourse(Course course);
    
    List<Exam> findByExamDateAfter(LocalDateTime date);
    
    List<Exam> findByExamDateBefore(LocalDateTime date);
    
    @Query("SELECT e FROM Exam e WHERE e.course.id = :courseId ORDER BY e.examDate ASC")
    List<Exam> findByCourseIdOrderByExamDateAsc(@Param("courseId") Long courseId);
    
    @Query("SELECT e FROM Exam e JOIN e.course c JOIN c.enrollments en WHERE en.student.id = :studentId")
    List<Exam> findExamsByStudentId(@Param("studentId") Long studentId);
}