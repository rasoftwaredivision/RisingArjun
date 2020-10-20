package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.TestresultDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Testresult}.
 */
public interface TestresultService {

    /**
     * Save a testresult.
     *
     * @param testresultDTO the entity to save.
     * @return the persisted entity.
     */
    TestresultDTO save(TestresultDTO testresultDTO);

    /**
     * Get all the testresults.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TestresultDTO> findAll(Pageable pageable);

    /**
     * Get all the testresults with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<TestresultDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" testresult.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TestresultDTO> findOne(Long id);

    /**
     * Delete the "id" testresult.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
