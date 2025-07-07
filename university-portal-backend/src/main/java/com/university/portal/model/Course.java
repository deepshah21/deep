package com.university.portal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 10)
    @Column(unique = true)
    private String courseCode;

    @NotBlank
    @Size(max = 100)
    private String courseName;

    @Size(max = 500)
    private String description;

    @NotNull
    private Integer credits;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id")
    private User instructor;

    @Column(name = "semester")
    private String semester;

    @Column(name = "academic_year")
    private String academicYear;

    @Column(name = "max_enrollment")
    private Integer maxEnrollment;

    @Column(name = "current_enrollment")
    private Integer currentEnrollment = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Enrollment> enrollments = new HashSet<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Assignment> assignments = new HashSet<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Exam> exams = new HashSet<>();

    public Course() {}

    public Course(String courseCode, String courseName, String description, Integer credits, String semester, String academicYear, Integer maxEnrollment) {
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.description = description;
        this.credits = credits;
        this.semester = semester;
        this.academicYear = academicYear;
        this.maxEnrollment = maxEnrollment;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getCredits() { return credits; }
    public void setCredits(Integer credits) { this.credits = credits; }

    public User getInstructor() { return instructor; }
    public void setInstructor(User instructor) { this.instructor = instructor; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public Integer getMaxEnrollment() { return maxEnrollment; }
    public void setMaxEnrollment(Integer maxEnrollment) { this.maxEnrollment = maxEnrollment; }

    public Integer getCurrentEnrollment() { return currentEnrollment; }
    public void setCurrentEnrollment(Integer currentEnrollment) { this.currentEnrollment = currentEnrollment; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Set<Enrollment> getEnrollments() { return enrollments; }
    public void setEnrollments(Set<Enrollment> enrollments) { this.enrollments = enrollments; }

    public Set<Assignment> getAssignments() { return assignments; }
    public void setAssignments(Set<Assignment> assignments) { this.assignments = assignments; }

    public Set<Exam> getExams() { return exams; }
    public void setExams(Set<Exam> exams) { this.exams = exams; }
}