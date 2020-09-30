package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.AnswersheetDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Answersheet} and its DTO {@link AnswersheetDTO}.
 */
@Mapper(componentModel = "spring", uses = {TestresultMapper.class, QuestionMapper.class})
public interface AnswersheetMapper extends EntityMapper<AnswersheetDTO, Answersheet> {

    @Mapping(source = "testResultId.id", target = "testResultIdId")
    AnswersheetDTO toDto(Answersheet answersheet);

    @Mapping(source = "testResultIdId", target = "testResultId")
    @Mapping(target = "removeQuestion", ignore = true)
    Answersheet toEntity(AnswersheetDTO answersheetDTO);

    default Answersheet fromId(Long id) {
        if (id == null) {
            return null;
        }
        Answersheet answersheet = new Answersheet();
        answersheet.setId(id);
        return answersheet;
    }
}
