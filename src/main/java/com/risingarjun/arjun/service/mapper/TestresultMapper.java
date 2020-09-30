package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.TestresultDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Testresult} and its DTO {@link TestresultDTO}.
 */
@Mapper(componentModel = "spring", uses = {StudentMapper.class, TestpaperMapper.class})
public interface TestresultMapper extends EntityMapper<TestresultDTO, Testresult> {

    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "student.studentRegId", target = "studentStudentRegId")
    @Mapping(source = "testPaperId.id", target = "testPaperIdId")
    TestresultDTO toDto(Testresult testresult);

    @Mapping(source = "studentId", target = "student")
    @Mapping(source = "testPaperIdId", target = "testPaperId")
    Testresult toEntity(TestresultDTO testresultDTO);

    default Testresult fromId(Long id) {
        if (id == null) {
            return null;
        }
        Testresult testresult = new Testresult();
        testresult.setId(id);
        return testresult;
    }
}
