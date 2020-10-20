package com.risingarjun.arjun.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;
import com.risingarjun.arjun.domain.enumeration.Answeroption;
import com.risingarjun.arjun.domain.enumeration.Questionlevel;
import com.risingarjun.arjun.domain.enumeration.Questionstatus;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Question} entity.
 */
public class QuestionDTO implements Serializable {

    private Long id;

    
    @Lob
    private String question;

    @Lob
    private byte[] questionDiagram;

    private String questionDiagramContentType;
    @NotNull
    private String optionA;

    @NotNull
    private String optionB;

    private String optionC;

    private String optionD;

    @NotNull
    private Boolean multiChoice;

    @NotNull
    private Answeroption answer;

    @NotNull
    private Integer maxMarks;

    private Integer negativeMarks;

    @NotNull
    private Integer durationMins;

    @NotNull
    private Questionlevel level;

    private String solution;

    @Lob
    private byte[] ansDiagram;

    private String ansDiagramContentType;
    private String video;

    @NotNull
    private Questionstatus status;


    private Long enterpriseId;

    private String enterpriseEnterprisename;

    private Long courseId;

    private String courseCourse;

    private Long subjectId;

    private String subjectSubjectTitle;

    private Long topicId;

    private String topicTopicTitle;

    private Long writerId;

    private String writerEmployeeId;

    private Long approverId;

    private String approverEmployeeId;

    private Set<FundamentaldetailDTO> fundamentals = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public byte[] getQuestionDiagram() {
        return questionDiagram;
    }

    public void setQuestionDiagram(byte[] questionDiagram) {
        this.questionDiagram = questionDiagram;
    }

    public String getQuestionDiagramContentType() {
        return questionDiagramContentType;
    }

    public void setQuestionDiagramContentType(String questionDiagramContentType) {
        this.questionDiagramContentType = questionDiagramContentType;
    }

    public String getOptionA() {
        return optionA;
    }

    public void setOptionA(String optionA) {
        this.optionA = optionA;
    }

    public String getOptionB() {
        return optionB;
    }

    public void setOptionB(String optionB) {
        this.optionB = optionB;
    }

    public String getOptionC() {
        return optionC;
    }

    public void setOptionC(String optionC) {
        this.optionC = optionC;
    }

    public String getOptionD() {
        return optionD;
    }

    public void setOptionD(String optionD) {
        this.optionD = optionD;
    }

    public Boolean isMultiChoice() {
        return multiChoice;
    }

    public void setMultiChoice(Boolean multiChoice) {
        this.multiChoice = multiChoice;
    }

    public Answeroption getAnswer() {
        return answer;
    }

    public void setAnswer(Answeroption answer) {
        this.answer = answer;
    }

    public Integer getMaxMarks() {
        return maxMarks;
    }

    public void setMaxMarks(Integer maxMarks) {
        this.maxMarks = maxMarks;
    }

    public Integer getNegativeMarks() {
        return negativeMarks;
    }

    public void setNegativeMarks(Integer negativeMarks) {
        this.negativeMarks = negativeMarks;
    }

    public Integer getDurationMins() {
        return durationMins;
    }

    public void setDurationMins(Integer durationMins) {
        this.durationMins = durationMins;
    }

    public Questionlevel getLevel() {
        return level;
    }

    public void setLevel(Questionlevel level) {
        this.level = level;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public byte[] getAnsDiagram() {
        return ansDiagram;
    }

    public void setAnsDiagram(byte[] ansDiagram) {
        this.ansDiagram = ansDiagram;
    }

    public String getAnsDiagramContentType() {
        return ansDiagramContentType;
    }

    public void setAnsDiagramContentType(String ansDiagramContentType) {
        this.ansDiagramContentType = ansDiagramContentType;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public Questionstatus getStatus() {
        return status;
    }

    public void setStatus(Questionstatus status) {
        this.status = status;
    }

    public Long getEnterpriseId() {
        return enterpriseId;
    }

    public void setEnterpriseId(Long enterpriseId) {
        this.enterpriseId = enterpriseId;
    }

    public String getEnterpriseEnterprisename() {
        return enterpriseEnterprisename;
    }

    public void setEnterpriseEnterprisename(String enterpriseEnterprisename) {
        this.enterpriseEnterprisename = enterpriseEnterprisename;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getCourseCourse() {
        return courseCourse;
    }

    public void setCourseCourse(String courseCourse) {
        this.courseCourse = courseCourse;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectSubjectTitle() {
        return subjectSubjectTitle;
    }

    public void setSubjectSubjectTitle(String subjectSubjectTitle) {
        this.subjectSubjectTitle = subjectSubjectTitle;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public String getTopicTopicTitle() {
        return topicTopicTitle;
    }

    public void setTopicTopicTitle(String topicTopicTitle) {
        this.topicTopicTitle = topicTopicTitle;
    }

    public Long getWriterId() {
        return writerId;
    }

    public void setWriterId(Long employeeId) {
        this.writerId = employeeId;
    }

    public String getWriterEmployeeId() {
        return writerEmployeeId;
    }

    public void setWriterEmployeeId(String employeeEmployeeId) {
        this.writerEmployeeId = employeeEmployeeId;
    }

    public Long getApproverId() {
        return approverId;
    }

    public void setApproverId(Long employeeId) {
        this.approverId = employeeId;
    }

    public String getApproverEmployeeId() {
        return approverEmployeeId;
    }

    public void setApproverEmployeeId(String employeeEmployeeId) {
        this.approverEmployeeId = employeeEmployeeId;
    }

    public Set<FundamentaldetailDTO> getFundamentals() {
        return fundamentals;
    }

    public void setFundamentals(Set<FundamentaldetailDTO> fundamentaldetails) {
        this.fundamentals = fundamentaldetails;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        QuestionDTO questionDTO = (QuestionDTO) o;
        if (questionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), questionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QuestionDTO{" +
            "id=" + getId() +
            ", question='" + getQuestion() + "'" +
            ", questionDiagram='" + getQuestionDiagram() + "'" +
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
            ", video='" + getVideo() + "'" +
            ", status='" + getStatus() + "'" +
            ", enterprise=" + getEnterpriseId() +
            ", enterprise='" + getEnterpriseEnterprisename() + "'" +
            ", course=" + getCourseId() +
            ", course='" + getCourseCourse() + "'" +
            ", subject=" + getSubjectId() +
            ", subject='" + getSubjectSubjectTitle() + "'" +
            ", topic=" + getTopicId() +
            ", topic='" + getTopicTopicTitle() + "'" +
            ", writer=" + getWriterId() +
            ", writer='" + getWriterEmployeeId() + "'" +
            ", approver=" + getApproverId() +
            ", approver='" + getApproverEmployeeId() + "'" +
            "}";
    }
}
