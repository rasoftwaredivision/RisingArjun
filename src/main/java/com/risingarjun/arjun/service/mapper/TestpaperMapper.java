package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.TestpaperDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Testpaper} and its DTO {@link TestpaperDTO}.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class, SubjectMapper.class, EnterpriseMapper.class, TestresultMapper.class, TopicMapper.class})
public interface TestpaperMapper extends EntityMapper<TestpaperDTO, Testpaper> {

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "course.course", target = "courseCourse")
    @Mapping(source = "subject.id", target = "subjectId")
    @Mapping(source = "subject.subjectTitle", target = "subjectSubjectTitle")
    TestpaperDTO toDto(Testpaper testpaper);

    @Mapping(source = "courseId", target = "course")
    @Mapping(source = "subjectId", target = "subject")
    @Mapping(target = "removeEnterprise", ignore = true)
    @Mapping(target = "removeTestresult", ignore = true)
    @Mapping(target = "removeTopic", ignore = true)
    Testpaper toEntity(TestpaperDTO testpaperDTO);

    default Testpaper fromId(Long id) {
        if (id == null) {
            return null;
        }
        Testpaper testpaper = new Testpaper();
        testpaper.setId(id);
        return testpaper;
    }
}
