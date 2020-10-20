package com.risingarjun.arjun.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Testresult} entity.
 */
public class TestresultDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer positiveMarks;

    @NotNull
    private Integer negativeMarks;

    @NotNull
    private Integer score;

    @NotNull
    private Float timeTaken;

    @NotNull
    private LocalDate date;


    private Long studentId;

    private String studentStudentRegId;

    private Set<AnswersheetDTO> answersheets = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPositiveMarks() {
        return positiveMarks;
    }

    public void setPositiveMarks(Integer positiveMarks) {
        this.positiveMarks = positiveMarks;
    }

    public Integer getNegativeMarks() {
        return negativeMarks;
    }

    public void setNegativeMarks(Integer negativeMarks) {
        this.negativeMarks = negativeMarks;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Float getTimeTaken() {
        return timeTaken;
    }

    public void setTimeTaken(Float timeTaken) {
        this.timeTaken = timeTaken;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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

    public Set<AnswersheetDTO> getAnswersheets() {
        return answersheets;
    }

    public void setAnswersheets(Set<AnswersheetDTO> answersheets) {
        this.answersheets = answersheets;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TestresultDTO testresultDTO = (TestresultDTO) o;
        if (testresultDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testresultDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestresultDTO{" +
            "id=" + getId() +
            ", positiveMarks=" + getPositiveMarks() +
            ", negativeMarks=" + getNegativeMarks() +
            ", score=" + getScore() +
            ", timeTaken=" + getTimeTaken() +
            ", date='" + getDate() + "'" +
            ", student=" + getStudentId() +
            ", student='" + getStudentStudentRegId() + "'" +
            "}";
    }
}
