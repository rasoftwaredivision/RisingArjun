package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.risingarjun.arjun.domain.enumeration.Questionlevel;

/**
 * A Testpaper.
 */
@Entity
@Table(name = "testpaper")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Testpaper implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "max_marks", nullable = false)
    private Integer maxMarks;

    @NotNull
    @Column(name = "duration_mins", nullable = false)
    private Integer durationMins;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "level", nullable = false)
    private Questionlevel level;

    @ManyToOne
    @JsonIgnoreProperties("testpapers")
    private Enterprise enterprise;

    @ManyToOne
    @JsonIgnoreProperties("testpapers")
    private Course course;

    @ManyToOne
    @JsonIgnoreProperties("testpapers")
    private Subject subject;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "testpaper_topic",
               joinColumns = @JoinColumn(name = "testpaper_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "topic_id", referencedColumnName = "id"))
    private Set<Topic> topics = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMaxMarks() {
        return maxMarks;
    }

    public Testpaper maxMarks(Integer maxMarks) {
        this.maxMarks = maxMarks;
        return this;
    }

    public void setMaxMarks(Integer maxMarks) {
        this.maxMarks = maxMarks;
    }

    public Integer getDurationMins() {
        return durationMins;
    }

    public Testpaper durationMins(Integer durationMins) {
        this.durationMins = durationMins;
        return this;
    }

    public void setDurationMins(Integer durationMins) {
        this.durationMins = durationMins;
    }

    public Questionlevel getLevel() {
        return level;
    }

    public Testpaper level(Questionlevel level) {
        this.level = level;
        return this;
    }

    public void setLevel(Questionlevel level) {
        this.level = level;
    }

    public Enterprise getEnterprise() {
        return enterprise;
    }

    public Testpaper enterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
        return this;
    }

    public void setEnterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
    }

    public Course getCourse() {
        return course;
    }

    public Testpaper course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Subject getSubject() {
        return subject;
    }

    public Testpaper subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Set<Topic> getTopics() {
        return topics;
    }

    public Testpaper topics(Set<Topic> topics) {
        this.topics = topics;
        return this;
    }

    public Testpaper addTopic(Topic topic) {
        this.topics.add(topic);
        topic.getTestpapers().add(this);
        return this;
    }

    public Testpaper removeTopic(Topic topic) {
        this.topics.remove(topic);
        topic.getTestpapers().remove(this);
        return this;
    }

    public void setTopics(Set<Topic> topics) {
        this.topics = topics;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Testpaper)) {
            return false;
        }
        return id != null && id.equals(((Testpaper) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Testpaper{" +
            "id=" + getId() +
            ", maxMarks=" + getMaxMarks() +
            ", durationMins=" + getDurationMins() +
            ", level='" + getLevel() + "'" +
            "}";
    }
}
