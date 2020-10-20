package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingarjunApp;
import com.risingarjun.arjun.domain.Testimonial;
import com.risingarjun.arjun.repository.TestimonialRepository;
import com.risingarjun.arjun.service.TestimonialService;
import com.risingarjun.arjun.service.dto.TestimonialDTO;
import com.risingarjun.arjun.service.mapper.TestimonialMapper;
import com.risingarjun.arjun.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.risingarjun.arjun.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link TestimonialResource} REST controller.
 */
@SpringBootTest(classes = RisingarjunApp.class)
public class TestimonialResourceIT {

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_RATING = 1;
    private static final Integer UPDATED_RATING = 2;

    @Autowired
    private TestimonialRepository testimonialRepository;

    @Autowired
    private TestimonialMapper testimonialMapper;

    @Autowired
    private TestimonialService testimonialService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTestimonialMockMvc;

    private Testimonial testimonial;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestimonialResource testimonialResource = new TestimonialResource(testimonialService);
        this.restTestimonialMockMvc = MockMvcBuilders.standaloneSetup(testimonialResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Testimonial createEntity(EntityManager em) {
        Testimonial testimonial = new Testimonial()
            .remarks(DEFAULT_REMARKS)
            .date(DEFAULT_DATE)
            .rating(DEFAULT_RATING);
        return testimonial;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Testimonial createUpdatedEntity(EntityManager em) {
        Testimonial testimonial = new Testimonial()
            .remarks(UPDATED_REMARKS)
            .date(UPDATED_DATE)
            .rating(UPDATED_RATING);
        return testimonial;
    }

    @BeforeEach
    public void initTest() {
        testimonial = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestimonial() throws Exception {
        int databaseSizeBeforeCreate = testimonialRepository.findAll().size();

        // Create the Testimonial
        TestimonialDTO testimonialDTO = testimonialMapper.toDto(testimonial);
        restTestimonialMockMvc.perform(post("/api/testimonials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testimonialDTO)))
            .andExpect(status().isCreated());

        // Validate the Testimonial in the database
        List<Testimonial> testimonialList = testimonialRepository.findAll();
        assertThat(testimonialList).hasSize(databaseSizeBeforeCreate + 1);
        Testimonial testTestimonial = testimonialList.get(testimonialList.size() - 1);
        assertThat(testTestimonial.getRemarks()).isEqualTo(DEFAULT_REMARKS);
        assertThat(testTestimonial.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testTestimonial.getRating()).isEqualTo(DEFAULT_RATING);
    }

    @Test
    @Transactional
    public void createTestimonialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testimonialRepository.findAll().size();

        // Create the Testimonial with an existing ID
        testimonial.setId(1L);
        TestimonialDTO testimonialDTO = testimonialMapper.toDto(testimonial);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestimonialMockMvc.perform(post("/api/testimonials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testimonialDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Testimonial in the database
        List<Testimonial> testimonialList = testimonialRepository.findAll();
        assertThat(testimonialList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTestimonials() throws Exception {
        // Initialize the database
        testimonialRepository.saveAndFlush(testimonial);

        // Get all the testimonialList
        restTestimonialMockMvc.perform(get("/api/testimonials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testimonial.getId().intValue())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)));
    }
    
    @Test
    @Transactional
    public void getTestimonial() throws Exception {
        // Initialize the database
        testimonialRepository.saveAndFlush(testimonial);

        // Get the testimonial
        restTestimonialMockMvc.perform(get("/api/testimonials/{id}", testimonial.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testimonial.getId().intValue()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING));
    }

    @Test
    @Transactional
    public void getNonExistingTestimonial() throws Exception {
        // Get the testimonial
        restTestimonialMockMvc.perform(get("/api/testimonials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestimonial() throws Exception {
        // Initialize the database
        testimonialRepository.saveAndFlush(testimonial);

        int databaseSizeBeforeUpdate = testimonialRepository.findAll().size();

        // Update the testimonial
        Testimonial updatedTestimonial = testimonialRepository.findById(testimonial.getId()).get();
        // Disconnect from session so that the updates on updatedTestimonial are not directly saved in db
        em.detach(updatedTestimonial);
        updatedTestimonial
            .remarks(UPDATED_REMARKS)
            .date(UPDATED_DATE)
            .rating(UPDATED_RATING);
        TestimonialDTO testimonialDTO = testimonialMapper.toDto(updatedTestimonial);

        restTestimonialMockMvc.perform(put("/api/testimonials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testimonialDTO)))
            .andExpect(status().isOk());

        // Validate the Testimonial in the database
        List<Testimonial> testimonialList = testimonialRepository.findAll();
        assertThat(testimonialList).hasSize(databaseSizeBeforeUpdate);
        Testimonial testTestimonial = testimonialList.get(testimonialList.size() - 1);
        assertThat(testTestimonial.getRemarks()).isEqualTo(UPDATED_REMARKS);
        assertThat(testTestimonial.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTestimonial.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    public void updateNonExistingTestimonial() throws Exception {
        int databaseSizeBeforeUpdate = testimonialRepository.findAll().size();

        // Create the Testimonial
        TestimonialDTO testimonialDTO = testimonialMapper.toDto(testimonial);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestimonialMockMvc.perform(put("/api/testimonials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testimonialDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Testimonial in the database
        List<Testimonial> testimonialList = testimonialRepository.findAll();
        assertThat(testimonialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTestimonial() throws Exception {
        // Initialize the database
        testimonialRepository.saveAndFlush(testimonial);

        int databaseSizeBeforeDelete = testimonialRepository.findAll().size();

        // Delete the testimonial
        restTestimonialMockMvc.perform(delete("/api/testimonials/{id}", testimonial.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Testimonial> testimonialList = testimonialRepository.findAll();
        assertThat(testimonialList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Testimonial.class);
        Testimonial testimonial1 = new Testimonial();
        testimonial1.setId(1L);
        Testimonial testimonial2 = new Testimonial();
        testimonial2.setId(testimonial1.getId());
        assertThat(testimonial1).isEqualTo(testimonial2);
        testimonial2.setId(2L);
        assertThat(testimonial1).isNotEqualTo(testimonial2);
        testimonial1.setId(null);
        assertThat(testimonial1).isNotEqualTo(testimonial2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestimonialDTO.class);
        TestimonialDTO testimonialDTO1 = new TestimonialDTO();
        testimonialDTO1.setId(1L);
        TestimonialDTO testimonialDTO2 = new TestimonialDTO();
        assertThat(testimonialDTO1).isNotEqualTo(testimonialDTO2);
        testimonialDTO2.setId(testimonialDTO1.getId());
        assertThat(testimonialDTO1).isEqualTo(testimonialDTO2);
        testimonialDTO2.setId(2L);
        assertThat(testimonialDTO1).isNotEqualTo(testimonialDTO2);
        testimonialDTO1.setId(null);
        assertThat(testimonialDTO1).isNotEqualTo(testimonialDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(testimonialMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(testimonialMapper.fromId(null)).isNull();
    }
}
