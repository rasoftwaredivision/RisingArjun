package com.risingarjun.arjun.service.impl;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.risingarjun.arjun.domain.Testpaper;
import com.risingarjun.arjun.repository.TestpaperRepository;
import com.risingarjun.arjun.service.QuestionService;
import com.risingarjun.arjun.service.TestpaperService;
import com.risingarjun.arjun.service.dto.QuestionDTO;
import com.risingarjun.arjun.service.dto.TestpaperDTO;
import com.risingarjun.arjun.service.mapper.TestpaperMapper;


/**
 * Service Implementation for managing {@link Testpaper}.
 */
@Service
@Transactional
public class TestpaperServiceImpl implements TestpaperService {

    private final Logger log = LoggerFactory.getLogger(TestpaperServiceImpl.class);

    private final TestpaperRepository testpaperRepository;

    private final TestpaperMapper testpaperMapper;

	private final QuestionService questionservice;

    public TestpaperServiceImpl(TestpaperRepository testpaperRepository, TestpaperMapper testpaperMapper,
            QuestionService questionservice) {
        this.testpaperRepository = testpaperRepository;
        this.testpaperMapper = testpaperMapper;
        this.questionservice = questionservice;

    }

    /**
     * Save a testpaper.
     *
     * @param testpaperDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TestpaperDTO save(TestpaperDTO testpaperDTO) {
        log.debug("Request to save Testpaper : {}", testpaperDTO);
        Testpaper testpaper = testpaperMapper.toEntity(testpaperDTO);
        testpaper = testpaperRepository.save(testpaper);
        return testpaperMapper.toDto(testpaper);
    }

    /**
     * Get all the testpapers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TestpaperDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Testpapers");
        return testpaperRepository.findAll(pageable)
            .map(testpaperMapper::toDto);
    }

    /**
     * Get all the testpapers with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<TestpaperDTO> findAllWithEagerRelationships(Pageable pageable) {
        return testpaperRepository.findAllWithEagerRelationships(pageable).map(testpaperMapper::toDto);
    }
    

    /**
     * Get one testpaper by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TestpaperDTO> findOne(Long id) {
        log.debug("Request to get Testpaper : {}", id);
        return testpaperRepository.findOneWithEagerRelationships(id)
            .map(testpaperMapper::toDto);
    }

    /**
     * Delete the testpaper by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Testpaper : {}", id);
        testpaperRepository.deleteById(id);
    }

    public List<QuestionDTO> findAllForTestPaper(TestpaperDTO testpaperdto) {
		log.debug("Request to findAllForTestPaper : {}", testpaperdto);
		return questionservice.findAllForTestPaper(testpaperdto);
	}
}
