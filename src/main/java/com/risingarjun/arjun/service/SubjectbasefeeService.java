package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.SubjectbasefeeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Subjectbasefee}.
 */
public interface SubjectbasefeeService {

    /**
     * Save a subjectbasefee.
     *
     * @param subjectbasefeeDTO the entity to save.
     * @return the persisted entity.
     */
    SubjectbasefeeDTO save(SubjectbasefeeDTO subjectbasefeeDTO);

    /**
     * Get all the subjectbasefees.
     *
     * @return the list of entities.
     */
    List<SubjectbasefeeDTO> findAll();


    /**
     * Get the "id" subjectbasefee.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SubjectbasefeeDTO> findOne(Long id);

    /**
     * Delete the "id" subjectbasefee.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
