package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Testpaper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Testpaper entity.
 */
@Repository
public interface TestpaperRepository extends JpaRepository<Testpaper, Long> {

    @Query(value = "select distinct testpaper from Testpaper testpaper left join fetch testpaper.topics",
        countQuery = "select count(distinct testpaper) from Testpaper testpaper")
    Page<Testpaper> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct testpaper from Testpaper testpaper left join fetch testpaper.topics")
    List<Testpaper> findAllWithEagerRelationships();

    @Query("select testpaper from Testpaper testpaper left join fetch testpaper.topics where testpaper.id =:id")
    Optional<Testpaper> findOneWithEagerRelationships(@Param("id") Long id);

}
