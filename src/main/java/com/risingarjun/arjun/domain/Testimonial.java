package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Testimonial.
 */
@Entity
@Table(name = "testimonial")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Testimonial implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "rating")
    private Integer rating;

    @ManyToOne
    @JsonIgnoreProperties("testimonials")
    private Student student;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRemarks() {
        return remarks;
    }

    public Testimonial remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public LocalDate getDate() {
        return date;
    }

    public Testimonial date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getRating() {
        return rating;
    }

    public Testimonial rating(Integer rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Student getStudent() {
        return student;
    }

    public Testimonial student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Testimonial)) {
            return false;
        }
        return id != null && id.equals(((Testimonial) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Testimonial{" +
            "id=" + getId() +
            ", remarks='" + getRemarks() + "'" +
            ", date='" + getDate() + "'" +
            ", rating=" + getRating() +
            "}";
    }
}
