package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.AnswersheetDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Answersheet}.
 */
public interface AnswersheetService {

    /**
     * Save a answersheet.
     *
     * @param answersheetDTO the entity to save.
     * @return the persisted entity.
     */
    AnswersheetDTO save(AnswersheetDTO answersheetDTO);

    /**
     * Get all the answersheets.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AnswersheetDTO> findAll(Pageable pageable);

    /**
     * Get all the answersheets with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<AnswersheetDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" answersheet.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AnswersheetDTO> findOne(Long id);

    /**
     * Delete the "id" answersheet.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
