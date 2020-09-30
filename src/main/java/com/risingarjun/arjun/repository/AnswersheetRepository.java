package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Answersheet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Answersheet entity.
 */
@Repository
public interface AnswersheetRepository extends JpaRepository<Answersheet, Long> {

    @Query(value = "select distinct answersheet from Answersheet answersheet left join fetch answersheet.questions",
        countQuery = "select count(distinct answersheet) from Answersheet answersheet")
    Page<Answersheet> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct answersheet from Answersheet answersheet left join fetch answersheet.questions")
    List<Answersheet> findAllWithEagerRelationships();

    @Query("select answersheet from Answersheet answersheet left join fetch answersheet.questions where answersheet.id =:id")
    Optional<Answersheet> findOneWithEagerRelationships(@Param("id") Long id);

}
