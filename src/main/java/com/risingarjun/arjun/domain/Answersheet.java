package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.risingarjun.arjun.domain.enumeration.Answeroption;

import com.risingarjun.arjun.domain.enumeration.Answerstatus;

/**
 * A Answersheet.
 */
@Entity
@Table(name = "answersheet")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Answersheet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "answer", nullable = false)
    private Answeroption answer;

    @NotNull
    @Column(name = "marks", nullable = false)
    private Integer marks;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Answerstatus status;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "answersheet_question",
               joinColumns = @JoinColumn(name = "answersheet_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"))
    private Set<Question> questions = new HashSet<>();

    @ManyToMany(mappedBy = "answersheets")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Testresult> testresults = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Answeroption getAnswer() {
        return answer;
    }

    public Answersheet answer(Answeroption answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(Answeroption answer) {
        this.answer = answer;
    }

    public Integer getMarks() {
        return marks;
    }

    public Answersheet marks(Integer marks) {
        this.marks = marks;
        return this;
    }

    public void setMarks(Integer marks) {
        this.marks = marks;
    }

    public Answerstatus getStatus() {
        return status;
    }

    public Answersheet status(Answerstatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(Answerstatus status) {
        this.status = status;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public Answersheet questions(Set<Question> questions) {
        this.questions = questions;
        return this;
    }

    public Answersheet addQuestion(Question question) {
        this.questions.add(question);
        question.getAnswersheets().add(this);
        return this;
    }

    public Answersheet removeQuestion(Question question) {
        this.questions.remove(question);
        question.getAnswersheets().remove(this);
        return this;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

    public Set<Testresult> getTestresults() {
        return testresults;
    }

    public Answersheet testresults(Set<Testresult> testresults) {
        this.testresults = testresults;
        return this;
    }

    public Answersheet addTestresult(Testresult testresult) {
        this.testresults.add(testresult);
        testresult.getAnswersheets().add(this);
        return this;
    }

    public Answersheet removeTestresult(Testresult testresult) {
        this.testresults.remove(testresult);
        testresult.getAnswersheets().remove(this);
        return this;
    }

    public void setTestresults(Set<Testresult> testresults) {
        this.testresults = testresults;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Answersheet)) {
            return false;
        }
        return id != null && id.equals(((Answersheet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Answersheet{" +
            "id=" + getId() +
            ", answer='" + getAnswer() + "'" +
            ", marks=" + getMarks() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
