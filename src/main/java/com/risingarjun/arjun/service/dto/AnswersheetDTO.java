package com.risingarjun.arjun.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.risingarjun.arjun.domain.enumeration.Answeroption;
import com.risingarjun.arjun.domain.enumeration.Answerstatus;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Answersheet} entity.
 */
public class AnswersheetDTO implements Serializable {

    private Long id;

    @NotNull
    private Answeroption answer;

    @NotNull
    private Integer marks;

    private Answerstatus status;


    private Set<QuestionDTO> questions = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Answeroption getAnswer() {
        return answer;
    }

    public void setAnswer(Answeroption answer) {
        this.answer = answer;
    }

    public Integer getMarks() {
        return marks;
    }

    public void setMarks(Integer marks) {
        this.marks = marks;
    }

    public Answerstatus getStatus() {
        return status;
    }

    public void setStatus(Answerstatus status) {
        this.status = status;
    }

    public Set<QuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<QuestionDTO> questions) {
        this.questions = questions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AnswersheetDTO answersheetDTO = (AnswersheetDTO) o;
        if (answersheetDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), answersheetDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AnswersheetDTO{" +
            "id=" + getId() +
            ", answer='" + getAnswer() + "'" +
            ", marks=" + getMarks() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
