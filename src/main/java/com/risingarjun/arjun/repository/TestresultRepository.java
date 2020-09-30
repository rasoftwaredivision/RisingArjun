package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Testresult;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Testresult entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestresultRepository extends JpaRepository<Testresult, Long> {

}
