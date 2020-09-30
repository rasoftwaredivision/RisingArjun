package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Centerhead;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Centerhead entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CenterheadRepository extends JpaRepository<Centerhead, Long> {

}
