package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.risingarjun.arjun.domain.enumeration.Answeroption;

import com.risingarjun.arjun.domain.enumeration.Questionlevel;

import com.risingarjun.arjun.domain.enumeration.Questionstatus;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "question", nullable = false)
    private String question;

    @Lob
    @Column(name = "question_diagram")
    private byte[] questionDiagram;

    @Column(name = "question_diagram_content_type")
    private String questionDiagramContentType;

    @NotNull
    @Column(name = "option_a", nullable = false)
    private String optionA;

    @NotNull
    @Column(name = "option_b", nullable = false)
    private String optionB;

    @Column(name = "option_c")
    private String optionC;

    @Column(name = "option_d")
    private String optionD;

    @NotNull
    @Column(name = "multi_choice", nullable = false)
    private Boolean multiChoice;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "answer", nullable = false)
    private Answeroption answer;

    @NotNull
    @Column(name = "max_marks", nullable = false)
    private Integer maxMarks;

    @Column(name = "negative_marks")
    private Integer negativeMarks;

    @NotNull
    @Column(name = "duration_mins", nullable = false)
    private Integer durationMins;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "level", nullable = false)
    private Questionlevel level;

    @Column(name = "solution")
    private String solution;

    @Lob
    @Column(name = "ans_diagram")
    private byte[] ansDiagram;

    @Column(name = "ans_diagram_content_type")
    private String ansDiagramContentType;

    @Column(name = "video")
    private String video;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Questionstatus status;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Enterprise enterprise;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Course course;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Subject subject;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Topic topic;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Employee writer;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Employee approver;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "question_fundamental",
               joinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "fundamental_id", referencedColumnName = "id"))
    private Set<Fundamentaldetail> fundamentals = new HashSet<>();

    @ManyToMany(mappedBy = "questions")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Answersheet> answersheets = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public Question question(String question) {
        this.question = question;
        return this;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public byte[] getQuestionDiagram() {
        return questionDiagram;
    }

    public Question questionDiagram(byte[] questionDiagram) {
        this.questionDiagram = questionDiagram;
        return this;
    }

    public void setQuestionDiagram(byte[] questionDiagram) {
        this.questionDiagram = questionDiagram;
    }

    public String getQuestionDiagramContentType() {
        return questionDiagramContentType;
    }

    public Question questionDiagramContentType(String questionDiagramContentType) {
        this.questionDiagramContentType = questionDiagramContentType;
        return this;
    }

    public void setQuestionDiagramContentType(String questionDiagramContentType) {
        this.questionDiagramContentType = questionDiagramContentType;
    }

    public String getOptionA() {
        return optionA;
    }

    public Question optionA(String optionA) {
        this.optionA = optionA;
        return this;
    }

    public void setOptionA(String optionA) {
        this.optionA = optionA;
    }

    public String getOptionB() {
        return optionB;
    }

    public Question optionB(String optionB) {
        this.optionB = optionB;
        return this;
    }

    public void setOptionB(String optionB) {
        this.optionB = optionB;
    }

    public String getOptionC() {
        return optionC;
    }

    public Question optionC(String optionC) {
        this.optionC = optionC;
        return this;
    }

    public void setOptionC(String optionC) {
        this.optionC = optionC;
    }

    public String getOptionD() {
        return optionD;
    }

    public Question optionD(String optionD) {
        this.optionD = optionD;
        return this;
    }

    public void setOptionD(String optionD) {
        this.optionD = optionD;
    }

    public Boolean isMultiChoice() {
        return multiChoice;
    }

    public Question multiChoice(Boolean multiChoice) {
        this.multiChoice = multiChoice;
        return this;
    }

    public void setMultiChoice(Boolean multiChoice) {
        this.multiChoice = multiChoice;
    }

    public Answeroption getAnswer() {
        return answer;
    }

    public Question answer(Answeroption answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(Answeroption answer) {
        this.answer = answer;
    }

    public Integer getMaxMarks() {
        return maxMarks;
    }

    public Question maxMarks(Integer maxMarks) {
        this.maxMarks = maxMarks;
        return this;
    }

    public void setMaxMarks(Integer maxMarks) {
        this.maxMarks = maxMarks;
    }

    public Integer getNegativeMarks() {
        return negativeMarks;
    }

    public Question negativeMarks(Integer negativeMarks) {
        this.negativeMarks = negativeMarks;
        return this;
    }

    public void setNegativeMarks(Integer negativeMarks) {
        this.negativeMarks = negativeMarks;
    }

    public Integer getDurationMins() {
        return durationMins;
    }

    public Question durationMins(Integer durationMins) {
        this.durationMins = durationMins;
        return this;
    }

    public void setDurationMins(Integer durationMins) {
        this.durationMins = durationMins;
    }

    public Questionlevel getLevel() {
        return level;
    }

    public Question level(Questionlevel level) {
        this.level = level;
        return this;
    }

    public void setLevel(Questionlevel level) {
        this.level = level;
    }

    public String getSolution() {
        return solution;
    }

    public Question solution(String solution) {
        this.solution = solution;
        return this;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public byte[] getAnsDiagram() {
        return ansDiagram;
    }

    public Question ansDiagram(byte[] ansDiagram) {
        this.ansDiagram = ansDiagram;
        return this;
    }

    public void setAnsDiagram(byte[] ansDiagram) {
        this.ansDiagram = ansDiagram;
    }

    public String getAnsDiagramContentType() {
        return ansDiagramContentType;
    }

    public Question ansDiagramContentType(String ansDiagramContentType) {
        this.ansDiagramContentType = ansDiagramContentType;
        return this;
    }

    public void setAnsDiagramContentType(String ansDiagramContentType) {
        this.ansDiagramContentType = ansDiagramContentType;
    }

    public String getVideo() {
        return video;
    }

    public Question video(String video) {
        this.video = video;
        return this;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public Questionstatus getStatus() {
        return status;
    }

    public Question status(Questionstatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(Questionstatus status) {
        this.status = status;
    }

    public Enterprise getEnterprise() {
        return enterprise;
    }

    public Question enterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
        return this;
    }

    public void setEnterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
    }

    public Course getCourse() {
        return course;
    }

    public Question course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Subject getSubject() {
        return subject;
    }

    public Question subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Topic getTopic() {
        return topic;
    }

    public Question topic(Topic topic) {
        this.topic = topic;
        return this;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public Employee getWriter() {
        return writer;
    }

    public Question writer(Employee employee) {
        this.writer = employee;
        return this;
    }

    public void setWriter(Employee employee) {
        this.writer = employee;
    }

    public Employee getApprover() {
        return approver;
    }

    public Question approver(Employee employee) {
        this.approver = employee;
        return this;
    }

    public void setApprover(Employee employee) {
        this.approver = employee;
    }

    public Set<Fundamentaldetail> getFundamentals() {
        return fundamentals;
    }

    public Question fundamentals(Set<Fundamentaldetail> fundamentaldetails) {
        this.fundamentals = fundamentaldetails;
        return this;
    }

    public Question addFundamental(Fundamentaldetail fundamentaldetail) {
        this.fundamentals.add(fundamentaldetail);
        fundamentaldetail.getQuestions().add(this);
        return this;
    }

    public Question removeFundamental(Fundamentaldetail fundamentaldetail) {
        this.fundamentals.remove(fundamentaldetail);
        fundamentaldetail.getQuestions().remove(this);
        return this;
    }

    public void setFundamentals(Set<Fundamentaldetail> fundamentaldetails) {
        this.fundamentals = fundamentaldetails;
    }

    public Set<Answersheet> getAnswersheets() {
        return answersheets;
    }

    public Question answersheets(Set<Answersheet> answersheets) {
        this.answersheets = answersheets;
        return this;
    }

    public Question addAnswersheet(Answersheet answersheet) {
        this.answersheets.add(answersheet);
        answersheet.getQuestions().add(this);
        return this;
    }

    public Question removeAnswersheet(Answersheet answersheet) {
        this.answersheets.remove(answersheet);
        answersheet.getQuestions().remove(this);
        return this;
    }

    public void setAnswersheets(Set<Answersheet> answersheets) {
        this.answersheets = answersheets;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Question)) {
            return false;
        }
        return id != null && id.equals(((Question) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", question='" + getQuestion() + "'" +
            ", questionDiagram='" + getQuestionDiagram() + "'" +
            ", questionDiagramContentType='" + getQuestionDiagramContentType() + "'" +
            ", optionA='" + getOptionA() + "'" +
            ", optionB='" + getOptionB() + "'" +
            ", optionC='" + getOptionC() + "'" +
            ", optionD='" + getOptionD() + "'" +
            ", multiChoice='" + isMultiChoice() + "'" +
            ", answer='" + getAnswer() + "'" +
            ", maxMarks=" + getMaxMarks() +
            ", negativeMarks=" + getNegativeMarks() +
            ", durationMins=" + getDurationMins() +
            ", level='" + getLevel() + "'" +
            ", solution='" + getSolution() + "'" +
            ", ansDiagram='" + getAnsDiagram() + "'" +
            ", ansDiagramContentType='" + getAnsDiagramContentType() + "'" +
            ", video='" + getVideo() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
