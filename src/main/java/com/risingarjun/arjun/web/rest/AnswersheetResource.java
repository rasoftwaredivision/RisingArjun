package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.AnswersheetService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.AnswersheetDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.risingarjun.arjun.domain.Answersheet}.
 */
@RestController
@RequestMapping("/api")
public class AnswersheetResource {

    private final Logger log = LoggerFactory.getLogger(AnswersheetResource.class);

    private static final String ENTITY_NAME = "answersheet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnswersheetService answersheetService;

    public AnswersheetResource(AnswersheetService answersheetService) {
        this.answersheetService = answersheetService;
    }

    /**
     * {@code POST  /answersheets} : Create a new answersheet.
     *
     * @param answersheetDTO the answersheetDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new answersheetDTO, or with status {@code 400 (Bad Request)} if the answersheet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/answersheets")
    public ResponseEntity<AnswersheetDTO> createAnswersheet(@Valid @RequestBody AnswersheetDTO answersheetDTO) throws URISyntaxException {
        log.debug("REST request to save Answersheet : {}", answersheetDTO);
        if (answersheetDTO.getId() != null) {
            throw new BadRequestAlertException("A new answersheet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AnswersheetDTO result = answersheetService.save(answersheetDTO);
        return ResponseEntity.created(new URI("/api/answersheets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /answersheets} : Updates an existing answersheet.
     *
     * @param answersheetDTO the answersheetDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated answersheetDTO,
     * or with status {@code 400 (Bad Request)} if the answersheetDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the answersheetDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/answersheets")
    public ResponseEntity<AnswersheetDTO> updateAnswersheet(@Valid @RequestBody AnswersheetDTO answersheetDTO) throws URISyntaxException {
        log.debug("REST request to update Answersheet : {}", answersheetDTO);
        if (answersheetDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AnswersheetDTO result = answersheetService.save(answersheetDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, answersheetDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /answersheets} : get all the answersheets.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of answersheets in body.
     */
    @GetMapping("/answersheets")
    public ResponseEntity<List<AnswersheetDTO>> getAllAnswersheets(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Answersheets");
        Page<AnswersheetDTO> page;
        if (eagerload) {
            page = answersheetService.findAllWithEagerRelationships(pageable);
        } else {
            page = answersheetService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /answersheets/:id} : get the "id" answersheet.
     *
     * @param id the id of the answersheetDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the answersheetDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/answersheets/{id}")
    public ResponseEntity<AnswersheetDTO> getAnswersheet(@PathVariable Long id) {
        log.debug("REST request to get Answersheet : {}", id);
        Optional<AnswersheetDTO> answersheetDTO = answersheetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(answersheetDTO);
    }

    /**
     * {@code DELETE  /answersheets/:id} : delete the "id" answersheet.
     *
     * @param id the id of the answersheetDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/answersheets/{id}")
    public ResponseEntity<Void> deleteAnswersheet(@PathVariable Long id) {
        log.debug("REST request to delete Answersheet : {}", id);
        answersheetService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
