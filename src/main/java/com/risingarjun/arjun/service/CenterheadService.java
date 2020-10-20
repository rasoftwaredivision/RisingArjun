package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.CenterheadDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Centerhead}.
 */
public interface CenterheadService {

    /**
     * Save a centerhead.
     *
     * @param centerheadDTO the entity to save.
     * @return the persisted entity.
     */
    CenterheadDTO save(CenterheadDTO centerheadDTO);

    /**
     * Get all the centerheads.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CenterheadDTO> findAll(Pageable pageable);

    /**
     * Get all the centerheads with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<CenterheadDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" centerhead.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CenterheadDTO> findOne(Long id);

    /**
     * Delete the "id" centerhead.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
