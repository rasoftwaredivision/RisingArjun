package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.SubjectbasefeeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Subjectbasefee} and its DTO {@link SubjectbasefeeDTO}.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class, EnterpriseMapper.class, AcademicsessionMapper.class})
public interface SubjectbasefeeMapper extends EntityMapper<SubjectbasefeeDTO, Subjectbasefee> {

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "course.course", target = "courseCourse")
    @Mapping(source = "enterprise.id", target = "enterpriseId")
    @Mapping(source = "enterprise.enterprisename", target = "enterpriseEnterprisename")
    @Mapping(source = "session.id", target = "sessionId")
    @Mapping(source = "session.acadSession", target = "sessionAcadSession")
    SubjectbasefeeDTO toDto(Subjectbasefee subjectbasefee);

    @Mapping(source = "courseId", target = "course")
    @Mapping(source = "enterpriseId", target = "enterprise")
    @Mapping(source = "sessionId", target = "session")
    Subjectbasefee toEntity(SubjectbasefeeDTO subjectbasefeeDTO);

    default Subjectbasefee fromId(Long id) {
        if (id == null) {
            return null;
        }
        Subjectbasefee subjectbasefee = new Subjectbasefee();
        subjectbasefee.setId(id);
        return subjectbasefee;
    }
}
