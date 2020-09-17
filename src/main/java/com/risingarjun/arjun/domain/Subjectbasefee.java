package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Subjectbasefee.
 */
@Entity
@Table(name = "subjectbasefee")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Subjectbasefee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "base_fee")
    private Integer baseFee;

    @ManyToOne
    @JsonIgnoreProperties("subjectbasefees")
    private Course course;

    @ManyToOne
    @JsonIgnoreProperties("subjectbasefees")
    private Enterprise enterprise;

    @ManyToOne
    @JsonIgnoreProperties("subjectbasefees")
    private Academicsession session;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBaseFee() {
        return baseFee;
    }

    public Subjectbasefee baseFee(Integer baseFee) {
        this.baseFee = baseFee;
        return this;
    }

    public void setBaseFee(Integer baseFee) {
        this.baseFee = baseFee;
    }

    public Course getCourse() {
        return course;
    }

    public Subjectbasefee course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Enterprise getEnterprise() {
        return enterprise;
    }

    public Subjectbasefee enterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
        return this;
    }

    public void setEnterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
    }

    public Academicsession getSession() {
        return session;
    }

    public Subjectbasefee session(Academicsession academicsession) {
        this.session = academicsession;
        return this;
    }

    public void setSession(Academicsession academicsession) {
        this.session = academicsession;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Subjectbasefee)) {
            return false;
        }
        return id != null && id.equals(((Subjectbasefee) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Subjectbasefee{" +
            "id=" + getId() +
            ", baseFee=" + getBaseFee() +
            "}";
    }
}
