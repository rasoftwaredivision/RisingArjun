package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.TestimonialService;
import com.risingarjun.arjun.domain.Testimonial;
import com.risingarjun.arjun.repository.TestimonialRepository;
import com.risingarjun.arjun.service.dto.TestimonialDTO;
import com.risingarjun.arjun.service.mapper.TestimonialMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Testimonial}.
 */
@Service
@Transactional
public class TestimonialServiceImpl implements TestimonialService {

    private final Logger log = LoggerFactory.getLogger(TestimonialServiceImpl.class);

    private final TestimonialRepository testimonialRepository;

    private final TestimonialMapper testimonialMapper;

    public TestimonialServiceImpl(TestimonialRepository testimonialRepository, TestimonialMapper testimonialMapper) {
        this.testimonialRepository = testimonialRepository;
        this.testimonialMapper = testimonialMapper;
    }

    /**
     * Save a testimonial.
     *
     * @param testimonialDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TestimonialDTO save(TestimonialDTO testimonialDTO) {
        log.debug("Request to save Testimonial : {}", testimonialDTO);
        Testimonial testimonial = testimonialMapper.toEntity(testimonialDTO);
        testimonial = testimonialRepository.save(testimonial);
        return testimonialMapper.toDto(testimonial);
    }

    /**
     * Get all the testimonials.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TestimonialDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Testimonials");
        return testimonialRepository.findAll(pageable)
            .map(testimonialMapper::toDto);
    }


    /**
     * Get one testimonial by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TestimonialDTO> findOne(Long id) {
        log.debug("Request to get Testimonial : {}", id);
        return testimonialRepository.findById(id)
            .map(testimonialMapper::toDto);
    }

    /**
     * Delete the testimonial by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Testimonial : {}", id);
        testimonialRepository.deleteById(id);
    }
}
