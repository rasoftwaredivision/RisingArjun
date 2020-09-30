package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.TestresultService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.TestresultDTO;

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
 * REST controller for managing {@link com.risingarjun.arjun.domain.Testresult}.
 */
@RestController
@RequestMapping("/api")
public class TestresultResource {

    private final Logger log = LoggerFactory.getLogger(TestresultResource.class);

    private static final String ENTITY_NAME = "testresult";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TestresultService testresultService;

    public TestresultResource(TestresultService testresultService) {
        this.testresultService = testresultService;
    }

    /**
     * {@code POST  /testresults} : Create a new testresult.
     *
     * @param testresultDTO the testresultDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new testresultDTO, or with status {@code 400 (Bad Request)} if the testresult has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/testresults")
    public ResponseEntity<TestresultDTO> createTestresult(@Valid @RequestBody TestresultDTO testresultDTO) throws URISyntaxException {
        log.debug("REST request to save Testresult : {}", testresultDTO);
        if (testresultDTO.getId() != null) {
            throw new BadRequestAlertException("A new testresult cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestresultDTO result = testresultService.save(testresultDTO);
        return ResponseEntity.created(new URI("/api/testresults/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /testresults} : Updates an existing testresult.
     *
     * @param testresultDTO the testresultDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated testresultDTO,
     * or with status {@code 400 (Bad Request)} if the testresultDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the testresultDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/testresults")
    public ResponseEntity<TestresultDTO> updateTestresult(@Valid @RequestBody TestresultDTO testresultDTO) throws URISyntaxException {
        log.debug("REST request to update Testresult : {}", testresultDTO);
        if (testresultDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestresultDTO result = testresultService.save(testresultDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, testresultDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /testresults} : get all the testresults.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of testresults in body.
     */
    @GetMapping("/testresults")
    public List<TestresultDTO> getAllTestresults() {
        log.debug("REST request to get all Testresults");
        return testresultService.findAll();
    }

    /**
     * {@code GET  /testresults/:id} : get the "id" testresult.
     *
     * @param id the id of the testresultDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the testresultDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/testresults/{id}")
    public ResponseEntity<TestresultDTO> getTestresult(@PathVariable Long id) {
        log.debug("REST request to get Testresult : {}", id);
        Optional<TestresultDTO> testresultDTO = testresultService.findOne(id);
        return ResponseUtil.wrapOrNotFound(testresultDTO);
    }

    /**
     * {@code DELETE  /testresults/:id} : delete the "id" testresult.
     *
     * @param id the id of the testresultDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/testresults/{id}")
    public ResponseEntity<Void> deleteTestresult(@PathVariable Long id) {
        log.debug("REST request to delete Testresult : {}", id);
        testresultService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
