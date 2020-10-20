package com.risingarjun.arjun.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.risingarjun.arjun.domain.enumeration.Questionlevel;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Testpaper} entity.
 */
public class TestpaperDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer maxMarks;

    @NotNull
    private Integer durationMins;

    @NotNull
    private Questionlevel level;


    private Long courseId;

    private String courseCourse;

    private Long subjectId;

    private String subjectSubjectTitle;

    private Set<EnterpriseDTO> enterprises = new HashSet<>();

    private Set<TestresultDTO> testresults = new HashSet<>();

    private Set<TopicDTO> topics = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMaxMarks() {
        return maxMarks;
    }

    public void setMaxMarks(Integer maxMarks) {
        this.maxMarks = maxMarks;
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

    public Set<EnterpriseDTO> getEnterprises() {
        return enterprises;
    }

    public void setEnterprises(Set<EnterpriseDTO> enterprises) {
        this.enterprises = enterprises;
    }

    public Set<TestresultDTO> getTestresults() {
        return testresults;
    }

    public void setTestresults(Set<TestresultDTO> testresults) {
        this.testresults = testresults;
    }

    public Set<TopicDTO> getTopics() {
        return topics;
    }

    public void setTopics(Set<TopicDTO> topics) {
        this.topics = topics;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TestpaperDTO testpaperDTO = (TestpaperDTO) o;
        if (testpaperDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testpaperDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestpaperDTO{" +
            "id=" + getId() +
            ", maxMarks=" + getMaxMarks() +
            ", durationMins=" + getDurationMins() +
            ", level='" + getLevel() + "'" +
            ", course=" + getCourseId() +
            ", course='" + getCourseCourse() + "'" +
            ", subject=" + getSubjectId() +
            ", subject='" + getSubjectSubjectTitle() + "'" +
            "}";
    }
}
