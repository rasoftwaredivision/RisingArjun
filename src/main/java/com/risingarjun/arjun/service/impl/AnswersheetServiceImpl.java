package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.AnswersheetService;
import com.risingarjun.arjun.domain.Answersheet;
import com.risingarjun.arjun.repository.AnswersheetRepository;
import com.risingarjun.arjun.service.dto.AnswersheetDTO;
import com.risingarjun.arjun.service.mapper.AnswersheetMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Answersheet}.
 */
@Service
@Transactional
public class AnswersheetServiceImpl implements AnswersheetService {

    private final Logger log = LoggerFactory.getLogger(AnswersheetServiceImpl.class);

    private final AnswersheetRepository answersheetRepository;

    private final AnswersheetMapper answersheetMapper;

    public AnswersheetServiceImpl(AnswersheetRepository answersheetRepository, AnswersheetMapper answersheetMapper) {
        this.answersheetRepository = answersheetRepository;
        this.answersheetMapper = answersheetMapper;
    }

    /**
     * Save a answersheet.
     *
     * @param answersheetDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AnswersheetDTO save(AnswersheetDTO answersheetDTO) {
        log.debug("Request to save Answersheet : {}", answersheetDTO);
        Answersheet answersheet = answersheetMapper.toEntity(answersheetDTO);
        answersheet = answersheetRepository.save(answersheet);
        return answersheetMapper.toDto(answersheet);
    }

    /**
     * Get all the answersheets.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AnswersheetDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Answersheets");
        return answersheetRepository.findAll(pageable)
            .map(answersheetMapper::toDto);
    }

    /**
     * Get all the answersheets with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<AnswersheetDTO> findAllWithEagerRelationships(Pageable pageable) {
        return answersheetRepository.findAllWithEagerRelationships(pageable).map(answersheetMapper::toDto);
    }
    

    /**
     * Get one answersheet by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AnswersheetDTO> findOne(Long id) {
        log.debug("Request to get Answersheet : {}", id);
        return answersheetRepository.findOneWithEagerRelationships(id)
            .map(answersheetMapper::toDto);
    }

    /**
     * Delete the answersheet by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Answersheet : {}", id);
        answersheetRepository.deleteById(id);
    }
}
