package com.risingarjun.arjun.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Topic} entity.
 */
public class TopicDTO implements Serializable {

    private Long id;

    @NotNull
    private String topicId;

    private String topicTitle;


    private Long courseId;

    private String courseCourse;

    private Long subjectId;

    private String subjectSubjectTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTopicId() {
        return topicId;
    }

    public void setTopicId(String topicId) {
        this.topicId = topicId;
    }

    public String getTopicTitle() {
        return topicTitle;
    }

    public void setTopicTitle(String topicTitle) {
        this.topicTitle = topicTitle;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TopicDTO topicDTO = (TopicDTO) o;
        if (topicDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), topicDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TopicDTO{" +
            "id=" + getId() +
            ", topicId='" + getTopicId() + "'" +
            ", topicTitle='" + getTopicTitle() + "'" +
            ", course=" + getCourseId() +
            ", course='" + getCourseCourse() + "'" +
            ", subject=" + getSubjectId() +
            ", subject='" + getSubjectSubjectTitle() + "'" +
            "}";
    }
}
