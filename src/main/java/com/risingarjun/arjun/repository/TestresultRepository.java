package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Testresult;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Testresult entity.
 */
@Repository
public interface TestresultRepository extends JpaRepository<Testresult, Long> {

    @Query(value = "select distinct testresult from Testresult testresult left join fetch testresult.answersheets",
        countQuery = "select count(distinct testresult) from Testresult testresult")
    Page<Testresult> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct testresult from Testresult testresult left join fetch testresult.answersheets")
    List<Testresult> findAllWithEagerRelationships();

    @Query("select testresult from Testresult testresult left join fetch testresult.answersheets where testresult.id =:id")
    Optional<Testresult> findOneWithEagerRelationships(@Param("id") Long id);

}
