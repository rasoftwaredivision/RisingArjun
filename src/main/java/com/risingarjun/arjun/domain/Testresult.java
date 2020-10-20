package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

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
    private Float timeTaken;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @ManyToOne
    @JsonIgnoreProperties("testresults")
    private Student student;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "testresult_answersheet",
               joinColumns = @JoinColumn(name = "testresult_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "answersheet_id", referencedColumnName = "id"))
    private Set<Answersheet> answersheets = new HashSet<>();

    @ManyToMany(mappedBy = "testresults")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Testpaper> testpapers = new HashSet<>();

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

    public Float getTimeTaken() {
        return timeTaken;
    }

    public Testresult timeTaken(Float timeTaken) {
        this.timeTaken = timeTaken;
        return this;
    }

    public void setTimeTaken(Float timeTaken) {
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

    public Set<Answersheet> getAnswersheets() {
        return answersheets;
    }

    public Testresult answersheets(Set<Answersheet> answersheets) {
        this.answersheets = answersheets;
        return this;
    }

    public Testresult addAnswersheet(Answersheet answersheet) {
        this.answersheets.add(answersheet);
        answersheet.getTestresults().add(this);
        return this;
    }

    public Testresult removeAnswersheet(Answersheet answersheet) {
        this.answersheets.remove(answersheet);
        answersheet.getTestresults().remove(this);
        return this;
    }

    public void setAnswersheets(Set<Answersheet> answersheets) {
        this.answersheets = answersheets;
    }

    public Set<Testpaper> getTestpapers() {
        return testpapers;
    }

    public Testresult testpapers(Set<Testpaper> testpapers) {
        this.testpapers = testpapers;
        return this;
    }

    public Testresult addTestpaper(Testpaper testpaper) {
        this.testpapers.add(testpaper);
        testpaper.getTestresults().add(this);
        return this;
    }

    public Testresult removeTestpaper(Testpaper testpaper) {
        this.testpapers.remove(testpaper);
        testpaper.getTestresults().remove(this);
        return this;
    }

    public void setTestpapers(Set<Testpaper> testpapers) {
        this.testpapers = testpapers;
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
