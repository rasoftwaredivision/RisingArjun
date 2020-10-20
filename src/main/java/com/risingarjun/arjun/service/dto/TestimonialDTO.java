package com.risingarjun.arjun.service.dto;
import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Testimonial} entity.
 */
public class TestimonialDTO implements Serializable {

    private Long id;

    private String remarks;

    private LocalDate date;

    private Integer rating;


    private Long studentId;

    private String studentStudentRegId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentStudentRegId() {
        return studentStudentRegId;
    }

    public void setStudentStudentRegId(String studentStudentRegId) {
        this.studentStudentRegId = studentStudentRegId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TestimonialDTO testimonialDTO = (TestimonialDTO) o;
        if (testimonialDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testimonialDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestimonialDTO{" +
            "id=" + getId() +
            ", remarks='" + getRemarks() + "'" +
            ", date='" + getDate() + "'" +
            ", rating=" + getRating() +
            ", student=" + getStudentId() +
            ", student='" + getStudentStudentRegId() + "'" +
            "}";
    }
}
