package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.SubjectbasefeeService;
import com.risingarjun.arjun.domain.Subjectbasefee;
import com.risingarjun.arjun.repository.SubjectbasefeeRepository;
import com.risingarjun.arjun.service.dto.SubjectbasefeeDTO;
import com.risingarjun.arjun.service.mapper.SubjectbasefeeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Subjectbasefee}.
 */
@Service
@Transactional
public class SubjectbasefeeServiceImpl implements SubjectbasefeeService {

    private final Logger log = LoggerFactory.getLogger(SubjectbasefeeServiceImpl.class);

    private final SubjectbasefeeRepository subjectbasefeeRepository;

    private final SubjectbasefeeMapper subjectbasefeeMapper;

    public SubjectbasefeeServiceImpl(SubjectbasefeeRepository subjectbasefeeRepository, SubjectbasefeeMapper subjectbasefeeMapper) {
        this.subjectbasefeeRepository = subjectbasefeeRepository;
        this.subjectbasefeeMapper = subjectbasefeeMapper;
    }

    /**
     * Save a subjectbasefee.
     *
     * @param subjectbasefeeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public SubjectbasefeeDTO save(SubjectbasefeeDTO subjectbasefeeDTO) {
        log.debug("Request to save Subjectbasefee : {}", subjectbasefeeDTO);
        Subjectbasefee subjectbasefee = subjectbasefeeMapper.toEntity(subjectbasefeeDTO);
        subjectbasefee = subjectbasefeeRepository.save(subjectbasefee);
        return subjectbasefeeMapper.toDto(subjectbasefee);
    }

    /**
     * Get all the subjectbasefees.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<SubjectbasefeeDTO> findAll() {
        log.debug("Request to get all Subjectbasefees");
        return subjectbasefeeRepository.findAll().stream()
            .map(subjectbasefeeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one subjectbasefee by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SubjectbasefeeDTO> findOne(Long id) {
        log.debug("Request to get Subjectbasefee : {}", id);
        return subjectbasefeeRepository.findById(id)
            .map(subjectbasefeeMapper::toDto);
    }

    /**
     * Delete the subjectbasefee by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Subjectbasefee : {}", id);
        subjectbasefeeRepository.deleteById(id);
    }
}
