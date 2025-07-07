package com.university.portal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "submissions",
        uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "assignment_id"}))
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

    @Size(max = 2000)
    @Column(name = "content")
    private String content;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    @Column(name = "points_earned")
    private Integer pointsEarned;

    @Size(max = 500)
    @Column(name = "feedback")
    private String feedback;

    @Column(name = "graded_at")
    private LocalDateTime gradedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "graded_by")
    private User gradedBy;

    public Submission() {}

    public Submission(User student, Assignment assignment, String content) {
        this.student = student;
        this.assignment = assignment;
        this.content = content;
        this.submittedAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        this.submittedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public Assignment getAssignment() { return assignment; }
    public void setAssignment(Assignment assignment) { this.assignment = assignment; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }

    public Integer getPointsEarned() { return pointsEarned; }
    public void setPointsEarned(Integer pointsEarned) { this.pointsEarned = pointsEarned; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public LocalDateTime getGradedAt() { return gradedAt; }
    public void setGradedAt(LocalDateTime gradedAt) { this.gradedAt = gradedAt; }

    public User getGradedBy() { return gradedBy; }
    public void setGradedBy(User gradedBy) { this.gradedBy = gradedBy; }
}