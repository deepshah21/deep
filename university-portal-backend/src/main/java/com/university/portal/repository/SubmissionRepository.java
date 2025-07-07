package com.university.portal.repository;

import com.university.portal.model.Assignment;
import com.university.portal.model.Submission;
import com.university.portal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    Optional<Submission> findByStudentAndAssignment(User student, Assignment assignment);
    
    List<Submission> findByStudent(User student);
    
    List<Submission> findByAssignment(Assignment assignment);
    
    List<Submission> findByPointsEarnedIsNotNull();
    
    List<Submission> findByPointsEarnedIsNull();
    
    Boolean existsByStudentAndAssignment(User student, Assignment assignment);
}