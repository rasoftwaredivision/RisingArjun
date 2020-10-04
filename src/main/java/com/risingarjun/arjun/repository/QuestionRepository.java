package com.risingarjun.arjun.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.risingarjun.arjun.domain.Question;
import com.risingarjun.arjun.domain.enumeration.Questionlevel;

/**
 * Spring Data repository for the Question entity.
 */
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

	@Query(value = "select distinct question from Question question left join fetch question.fundamentals",
			countQuery = "select count(distinct question) from Question question")
	Page<Question> findAllWithEagerRelationships(Pageable pageable);

	@Query("select distinct question from Question question left join fetch question.fundamentals")
	List<Question> findAllWithEagerRelationships();

	@Query("select question from Question question left join fetch question.fundamentals where question.id =:id")
	Optional<Question> findOneWithEagerRelationships(@Param("id") Long id);

	@Query("select question from Question question left join fetch question.fundamentals where question.level =:level")
	//@Query("select q from Question q where q.level=:level and q.course_id=:course_id and q.subject_id=:subject_id")
	//List<Question> findAllForTestPaper(@Param("level") Questionlevel level, @Param("subject_id") Long subjectId,
		//	@Param("topicids") ArrayList<Long> topicids, @Param("course_id") Long courseId);
	List<Question> findAllForTestPaper(@Param("level") Questionlevel level);

}
