package com.university.portal.repository;

import com.university.portal.model.Exam;
import com.university.portal.model.ExamResult;
import com.university.portal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {
    Optional<ExamResult> findByStudentAndExam(User student, Exam exam);
    
    List<ExamResult> findByStudent(User student);
    
    List<ExamResult> findByExam(Exam exam);
    
    List<ExamResult> findByPointsEarnedIsNotNull();
    
    List<ExamResult> findByPointsEarnedIsNull();
    
    Boolean existsByStudentAndExam(User student, Exam exam);
}