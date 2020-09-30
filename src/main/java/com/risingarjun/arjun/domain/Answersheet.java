package com.risingarjun.arjun.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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
    @Column(name = "answer", nullable = false)
    private String answer;

    @NotNull
    @Column(name = "marks", nullable = false)
    private Integer marks;

    @OneToOne
    @JoinColumn(unique = true)
    private Testresult testResultId;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "answersheet_question",
               joinColumns = @JoinColumn(name = "answersheet_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"))
    private Set<Question> questions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnswer() {
        return answer;
    }

    public Answersheet answer(String answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(String answer) {
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

    public Testresult getTestResultId() {
        return testResultId;
    }

    public Answersheet testResultId(Testresult testresult) {
        this.testResultId = testresult;
        return this;
    }

    public void setTestResultId(Testresult testresult) {
        this.testResultId = testresult;
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
            "}";
    }
}
