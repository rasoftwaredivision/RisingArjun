package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.TestresultDTO;

import java.util.List;
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
     * @return the list of entities.
     */
    List<TestresultDTO> findAll();


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
