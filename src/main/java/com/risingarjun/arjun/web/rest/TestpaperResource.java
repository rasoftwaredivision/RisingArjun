package com.risingarjun.arjun.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.risingarjun.arjun.service.TestpaperService;
import com.risingarjun.arjun.service.dto.QuestionDTO;
import com.risingarjun.arjun.service.dto.TestpaperDTO;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

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
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of testpapers in body.
     */
    @GetMapping("/testpapers")
    public ResponseEntity<List<TestpaperDTO>> getAllTestpapers(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Testpapers");
        Page<TestpaperDTO> page;
        if (eagerload) {
            page = testpaperService.findAllWithEagerRelationships(pageable);
        } else {
            page = testpaperService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
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
    
	@PostMapping("/questionsfortestpaper")
	public  List<QuestionDTO> getQuestionsForTestpaper(@RequestBody TestpaperDTO testpaperDTO) {
		log.debug("REST request to get gettest : {}", testpaperDTO);
		return testpaperService.findAllForTestPaper(testpaperDTO);
	}
    
}
