package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.SubjectbasefeeService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.SubjectbasefeeDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.risingarjun.arjun.domain.Subjectbasefee}.
 */
@RestController
@RequestMapping("/api")
public class SubjectbasefeeResource {

    private final Logger log = LoggerFactory.getLogger(SubjectbasefeeResource.class);

    private static final String ENTITY_NAME = "subjectbasefee";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubjectbasefeeService subjectbasefeeService;

    public SubjectbasefeeResource(SubjectbasefeeService subjectbasefeeService) {
        this.subjectbasefeeService = subjectbasefeeService;
    }

    /**
     * {@code POST  /subjectbasefees} : Create a new subjectbasefee.
     *
     * @param subjectbasefeeDTO the subjectbasefeeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subjectbasefeeDTO, or with status {@code 400 (Bad Request)} if the subjectbasefee has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subjectbasefees")
    public ResponseEntity<SubjectbasefeeDTO> createSubjectbasefee(@RequestBody SubjectbasefeeDTO subjectbasefeeDTO) throws URISyntaxException {
        log.debug("REST request to save Subjectbasefee : {}", subjectbasefeeDTO);
        if (subjectbasefeeDTO.getId() != null) {
            throw new BadRequestAlertException("A new subjectbasefee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubjectbasefeeDTO result = subjectbasefeeService.save(subjectbasefeeDTO);
        return ResponseEntity.created(new URI("/api/subjectbasefees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subjectbasefees} : Updates an existing subjectbasefee.
     *
     * @param subjectbasefeeDTO the subjectbasefeeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subjectbasefeeDTO,
     * or with status {@code 400 (Bad Request)} if the subjectbasefeeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subjectbasefeeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subjectbasefees")
    public ResponseEntity<SubjectbasefeeDTO> updateSubjectbasefee(@RequestBody SubjectbasefeeDTO subjectbasefeeDTO) throws URISyntaxException {
        log.debug("REST request to update Subjectbasefee : {}", subjectbasefeeDTO);
        if (subjectbasefeeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubjectbasefeeDTO result = subjectbasefeeService.save(subjectbasefeeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subjectbasefeeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /subjectbasefees} : get all the subjectbasefees.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subjectbasefees in body.
     */
    @GetMapping("/subjectbasefees")
    public List<SubjectbasefeeDTO> getAllSubjectbasefees() {
        log.debug("REST request to get all Subjectbasefees");
        return subjectbasefeeService.findAll();
    }

    /**
     * {@code GET  /subjectbasefees/:id} : get the "id" subjectbasefee.
     *
     * @param id the id of the subjectbasefeeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subjectbasefeeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subjectbasefees/{id}")
    public ResponseEntity<SubjectbasefeeDTO> getSubjectbasefee(@PathVariable Long id) {
        log.debug("REST request to get Subjectbasefee : {}", id);
        Optional<SubjectbasefeeDTO> subjectbasefeeDTO = subjectbasefeeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subjectbasefeeDTO);
    }

    /**
     * {@code DELETE  /subjectbasefees/:id} : delete the "id" subjectbasefee.
     *
     * @param id the id of the subjectbasefeeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subjectbasefees/{id}")
    public ResponseEntity<Void> deleteSubjectbasefee(@PathVariable Long id) {
        log.debug("REST request to delete Subjectbasefee : {}", id);
        subjectbasefeeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
