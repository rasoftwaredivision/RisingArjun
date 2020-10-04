package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.TestpaperDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Testpaper}.
 */
public interface TestpaperService {

    /**
     * Save a testpaper.
     *
     * @param testpaperDTO the entity to save.
     * @return the persisted entity.
     */
    TestpaperDTO save(TestpaperDTO testpaperDTO);

    /**
     * Get all the testpapers.
     *
     * @return the list of entities.
     */
    List<TestpaperDTO> findAll();

    /**
     * Get all the testpapers with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<TestpaperDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" testpaper.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TestpaperDTO> findOne(Long id);

    /**
     * Delete the "id" testpaper.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}