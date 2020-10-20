package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.TestimonialDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Testimonial} and its DTO {@link TestimonialDTO}.
 */
@Mapper(componentModel = "spring", uses = {StudentMapper.class})
public interface TestimonialMapper extends EntityMapper<TestimonialDTO, Testimonial> {

    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "student.studentRegId", target = "studentStudentRegId")
    TestimonialDTO toDto(Testimonial testimonial);

    @Mapping(source = "studentId", target = "student")
    Testimonial toEntity(TestimonialDTO testimonialDTO);

    default Testimonial fromId(Long id) {
        if (id == null) {
            return null;
        }
        Testimonial testimonial = new Testimonial();
        testimonial.setId(id);
        return testimonial;
    }
}
