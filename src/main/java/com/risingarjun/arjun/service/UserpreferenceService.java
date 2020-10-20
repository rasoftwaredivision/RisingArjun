package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.UserpreferenceDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Userpreference}.
 */
public interface UserpreferenceService {

    /**
     * Save a userpreference.
     *
     * @param userpreferenceDTO the entity to save.
     * @return the persisted entity.
     */
    UserpreferenceDTO save(UserpreferenceDTO userpreferenceDTO);

    /**
     * Get all the userpreferences.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<UserpreferenceDTO> findAll(Pageable pageable);


    /**
     * Get the "id" userpreference.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserpreferenceDTO> findOne(Long id);

    /**
     * Delete the "id" userpreference.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
