package com.risingarjun.arjun.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Centerhead} entity.
 */
public class CenterheadDTO implements Serializable {

    private Long id;


    private Long centerheadId;

    private String centerheadEmployeeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCenterheadId() {
        return centerheadId;
    }

    public void setCenterheadId(Long employeeId) {
        this.centerheadId = employeeId;
    }

    public String getCenterheadEmployeeId() {
        return centerheadEmployeeId;
    }

    public void setCenterheadEmployeeId(String employeeEmployeeId) {
        this.centerheadEmployeeId = employeeEmployeeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CenterheadDTO centerheadDTO = (CenterheadDTO) o;
        if (centerheadDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), centerheadDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CenterheadDTO{" +
            "id=" + getId() +
            ", centerhead=" + getCenterheadId() +
            ", centerhead='" + getCenterheadEmployeeId() + "'" +
            "}";
    }
}
