package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.TopicDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Topic} and its DTO {@link TopicDTO}.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class, SubjectMapper.class})
public interface TopicMapper extends EntityMapper<TopicDTO, Topic> {

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "course.course", target = "courseCourse")
    @Mapping(source = "subject.id", target = "subjectId")
    @Mapping(source = "subject.subjectTitle", target = "subjectSubjectTitle")
    TopicDTO toDto(Topic topic);

    @Mapping(source = "courseId", target = "course")
    @Mapping(source = "subjectId", target = "subject")
    @Mapping(target = "testpapers", ignore = true)
    @Mapping(target = "removeTestpaper", ignore = true)
    Topic toEntity(TopicDTO topicDTO);

    default Topic fromId(Long id) {
        if (id == null) {
            return null;
        }
        Topic topic = new Topic();
        topic.setId(id);
        return topic;
    }
}
