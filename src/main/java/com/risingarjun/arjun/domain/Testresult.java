package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Testresult.
 */
@Entity
@Table(name = "testresult")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Testresult implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "positive_marks", nullable = false)
    private Integer positiveMarks;

    @NotNull
    @Column(name = "negative_marks", nullable = false)
    private Integer negativeMarks;

    @NotNull
    @Column(name = "score", nullable = false)
    private Integer score;

    @NotNull
    @Column(name = "time_taken", nullable = false)
    private Integer timeTaken;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @ManyToOne
    @JsonIgnoreProperties("testresults")
    private Student student;

    @ManyToOne
    @JsonIgnoreProperties("testresults")
    private Testpaper testPaperId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPositiveMarks() {
        return positiveMarks;
    }

    public Testresult positiveMarks(Integer positiveMarks) {
        this.positiveMarks = positiveMarks;
        return this;
    }

    public void setPositiveMarks(Integer positiveMarks) {
        this.positiveMarks = positiveMarks;
    }

    public Integer getNegativeMarks() {
        return negativeMarks;
    }

    public Testresult negativeMarks(Integer negativeMarks) {
        this.negativeMarks = negativeMarks;
        return this;
    }

    public void setNegativeMarks(Integer negativeMarks) {
        this.negativeMarks = negativeMarks;
    }

    public Integer getScore() {
        return score;
    }

    public Testresult score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getTimeTaken() {
        return timeTaken;
    }

    public Testresult timeTaken(Integer timeTaken) {
        this.timeTaken = timeTaken;
        return this;
    }

    public void setTimeTaken(Integer timeTaken) {
        this.timeTaken = timeTaken;
    }

    public LocalDate getDate() {
        return date;
    }

    public Testresult date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Student getStudent() {
        return student;
    }

    public Testresult student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Testpaper getTestPaperId() {
        return testPaperId;
    }

    public Testresult testPaperId(Testpaper testpaper) {
        this.testPaperId = testpaper;
        return this;
    }

    public void setTestPaperId(Testpaper testpaper) {
        this.testPaperId = testpaper;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Testresult)) {
            return false;
        }
        return id != null && id.equals(((Testresult) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Testresult{" +
            "id=" + getId() +
            ", positiveMarks=" + getPositiveMarks() +
            ", negativeMarks=" + getNegativeMarks() +
            ", score=" + getScore() +
            ", timeTaken=" + getTimeTaken() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
