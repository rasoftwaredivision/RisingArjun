package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Topic.
 */
@Entity
@Table(name = "topic")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Topic implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "topic_id", nullable = false)
    private String topicId;

    @Column(name = "topic_title")
    private String topicTitle;

    @ManyToOne
    @JsonIgnoreProperties("topics")
    private Course course;

    @ManyToOne
    @JsonIgnoreProperties("topics")
    private Subject subject;

    @ManyToMany(mappedBy = "topics")
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

    public String getTopicId() {
        return topicId;
    }

    public Topic topicId(String topicId) {
        this.topicId = topicId;
        return this;
    }

    public void setTopicId(String topicId) {
        this.topicId = topicId;
    }

    public String getTopicTitle() {
        return topicTitle;
    }

    public Topic topicTitle(String topicTitle) {
        this.topicTitle = topicTitle;
        return this;
    }

    public void setTopicTitle(String topicTitle) {
        this.topicTitle = topicTitle;
    }

    public Course getCourse() {
        return course;
    }

    public Topic course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Subject getSubject() {
        return subject;
    }

    public Topic subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Set<Testpaper> getTestpapers() {
        return testpapers;
    }

    public Topic testpapers(Set<Testpaper> testpapers) {
        this.testpapers = testpapers;
        return this;
    }

    public Topic addTestpaper(Testpaper testpaper) {
        this.testpapers.add(testpaper);
        testpaper.getTopics().add(this);
        return this;
    }

    public Topic removeTestpaper(Testpaper testpaper) {
        this.testpapers.remove(testpaper);
        testpaper.getTopics().remove(this);
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
        if (!(o instanceof Topic)) {
            return false;
        }
        return id != null && id.equals(((Topic) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Topic{" +
            "id=" + getId() +
            ", topicId='" + getTopicId() + "'" +
            ", topicTitle='" + getTopicTitle() + "'" +
            "}";
    }
}
