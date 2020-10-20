package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Testimonial;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Testimonial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {

}
