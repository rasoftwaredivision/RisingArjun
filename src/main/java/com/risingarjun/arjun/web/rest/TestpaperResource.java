package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.TestpaperService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.TestpaperDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.risingarjun.arjun.domain.Testpaper}.
 */
@RestController
@RequestMapping("/api")
public class TestpaperResource {

    private final Logger log = LoggerFactory.getLogger(TestpaperResource.class);

    private static final String ENTITY_NAME = "testpaper";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TestpaperService testpaperService;

    public TestpaperResource(TestpaperService testpaperService) {
        this.testpaperService = testpaperService;
    }

    /**
     * {@code POST  /testpapers} : Create a new testpaper.
     *
     * @param testpaperDTO the testpaperDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new testpaperDTO, or with status {@code 400 (Bad Request)} if the testpaper has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/testpapers")
    public ResponseEntity<TestpaperDTO> createTestpaper(@Valid @RequestBody TestpaperDTO testpaperDTO) throws URISyntaxException {
        log.debug("REST request to save Testpaper : {}", testpaperDTO);
        if (testpaperDTO.getId() != null) {
            throw new BadRequestAlertException("A new testpaper cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestpaperDTO result = testpaperService.save(testpaperDTO);
        return ResponseEntity.created(new URI("/api/testpapers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /testpapers} : Updates an existing testpaper.
     *
     * @param testpaperDTO the testpaperDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated testpaperDTO,
     * or with status {@code 400 (Bad Request)} if the testpaperDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the testpaperDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/testpapers")
    public ResponseEntity<TestpaperDTO> updateTestpaper(@Valid @RequestBody TestpaperDTO testpaperDTO) throws URISyntaxException {
        log.debug("REST request to update Testpaper : {}", testpaperDTO);
        if (testpaperDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestpaperDTO result = testpaperService.save(testpaperDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, testpaperDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /testpapers} : get all the testpapers.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of testpapers in body.
     */
    @GetMapping("/testpapers")
    public List<TestpaperDTO> getAllTestpapers(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Testpapers");
        return testpaperService.findAll();
    }

    /**
     * {@code GET  /testpapers/:id} : get the "id" testpaper.
     *
     * @param id the id of the testpaperDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the testpaperDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/testpapers/{id}")
    public ResponseEntity<TestpaperDTO> getTestpaper(@PathVariable Long id) {
        log.debug("REST request to get Testpaper : {}", id);
        Optional<TestpaperDTO> testpaperDTO = testpaperService.findOne(id);
        return ResponseUtil.wrapOrNotFound(testpaperDTO);
    }

    /**
     * {@code DELETE  /testpapers/:id} : delete the "id" testpaper.
     *
     * @param id the id of the testpaperDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/testpapers/{id}")
    public ResponseEntity<Void> deleteTestpaper(@PathVariable Long id) {
        log.debug("REST request to delete Testpaper : {}", id);
        testpaperService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
