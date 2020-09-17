package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Subjectbasefee;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Subjectbasefee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubjectbasefeeRepository extends JpaRepository<Subjectbasefee, Long> {

}
