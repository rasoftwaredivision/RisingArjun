package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.TestresultService;
import com.risingarjun.arjun.domain.Testresult;
import com.risingarjun.arjun.repository.TestresultRepository;
import com.risingarjun.arjun.service.dto.TestresultDTO;
import com.risingarjun.arjun.service.mapper.TestresultMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Testresult}.
 */
@Service
@Transactional
public class TestresultServiceImpl implements TestresultService {

    private final Logger log = LoggerFactory.getLogger(TestresultServiceImpl.class);

    private final TestresultRepository testresultRepository;

    private final TestresultMapper testresultMapper;

    public TestresultServiceImpl(TestresultRepository testresultRepository, TestresultMapper testresultMapper) {
        this.testresultRepository = testresultRepository;
        this.testresultMapper = testresultMapper;
    }

    /**
     * Save a testresult.
     *
     * @param testresultDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TestresultDTO save(TestresultDTO testresultDTO) {
        log.debug("Request to save Testresult : {}", testresultDTO);
        Testresult testresult = testresultMapper.toEntity(testresultDTO);
        testresult = testresultRepository.save(testresult);
        return testresultMapper.toDto(testresult);
    }

    /**
     * Get all the testresults.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TestresultDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Testresults");
        return testresultRepository.findAll(pageable)
            .map(testresultMapper::toDto);
    }

    /**
     * Get all the testresults with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<TestresultDTO> findAllWithEagerRelationships(Pageable pageable) {
        return testresultRepository.findAllWithEagerRelationships(pageable).map(testresultMapper::toDto);
    }
    

    /**
     * Get one testresult by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TestresultDTO> findOne(Long id) {
        log.debug("Request to get Testresult : {}", id);
        return testresultRepository.findOneWithEagerRelationships(id)
            .map(testresultMapper::toDto);
    }

    /**
     * Delete the testresult by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Testresult : {}", id);
        testresultRepository.deleteById(id);
    }
}
