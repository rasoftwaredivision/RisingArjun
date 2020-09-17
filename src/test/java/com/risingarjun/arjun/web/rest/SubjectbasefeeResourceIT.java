package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingarjunApp;
import com.risingarjun.arjun.domain.Subjectbasefee;
import com.risingarjun.arjun.repository.SubjectbasefeeRepository;
import com.risingarjun.arjun.service.SubjectbasefeeService;
import com.risingarjun.arjun.service.dto.SubjectbasefeeDTO;
import com.risingarjun.arjun.service.mapper.SubjectbasefeeMapper;
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
import java.util.List;

import static com.risingarjun.arjun.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link SubjectbasefeeResource} REST controller.
 */
@SpringBootTest(classes = RisingarjunApp.class)
public class SubjectbasefeeResourceIT {

    private static final Integer DEFAULT_BASE_FEE = 1;
    private static final Integer UPDATED_BASE_FEE = 2;

    @Autowired
    private SubjectbasefeeRepository subjectbasefeeRepository;

    @Autowired
    private SubjectbasefeeMapper subjectbasefeeMapper;

    @Autowired
    private SubjectbasefeeService subjectbasefeeService;

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

    private MockMvc restSubjectbasefeeMockMvc;

    private Subjectbasefee subjectbasefee;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubjectbasefeeResource subjectbasefeeResource = new SubjectbasefeeResource(subjectbasefeeService);
        this.restSubjectbasefeeMockMvc = MockMvcBuilders.standaloneSetup(subjectbasefeeResource)
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
    public static Subjectbasefee createEntity(EntityManager em) {
        Subjectbasefee subjectbasefee = new Subjectbasefee()
            .baseFee(DEFAULT_BASE_FEE);
        return subjectbasefee;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subjectbasefee createUpdatedEntity(EntityManager em) {
        Subjectbasefee subjectbasefee = new Subjectbasefee()
            .baseFee(UPDATED_BASE_FEE);
        return subjectbasefee;
    }

    @BeforeEach
    public void initTest() {
        subjectbasefee = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubjectbasefee() throws Exception {
        int databaseSizeBeforeCreate = subjectbasefeeRepository.findAll().size();

        // Create the Subjectbasefee
        SubjectbasefeeDTO subjectbasefeeDTO = subjectbasefeeMapper.toDto(subjectbasefee);
        restSubjectbasefeeMockMvc.perform(post("/api/subjectbasefees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectbasefeeDTO)))
            .andExpect(status().isCreated());

        // Validate the Subjectbasefee in the database
        List<Subjectbasefee> subjectbasefeeList = subjectbasefeeRepository.findAll();
        assertThat(subjectbasefeeList).hasSize(databaseSizeBeforeCreate + 1);
        Subjectbasefee testSubjectbasefee = subjectbasefeeList.get(subjectbasefeeList.size() - 1);
        assertThat(testSubjectbasefee.getBaseFee()).isEqualTo(DEFAULT_BASE_FEE);
    }

    @Test
    @Transactional
    public void createSubjectbasefeeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subjectbasefeeRepository.findAll().size();

        // Create the Subjectbasefee with an existing ID
        subjectbasefee.setId(1L);
        SubjectbasefeeDTO subjectbasefeeDTO = subjectbasefeeMapper.toDto(subjectbasefee);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubjectbasefeeMockMvc.perform(post("/api/subjectbasefees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectbasefeeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Subjectbasefee in the database
        List<Subjectbasefee> subjectbasefeeList = subjectbasefeeRepository.findAll();
        assertThat(subjectbasefeeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSubjectbasefees() throws Exception {
        // Initialize the database
        subjectbasefeeRepository.saveAndFlush(subjectbasefee);

        // Get all the subjectbasefeeList
        restSubjectbasefeeMockMvc.perform(get("/api/subjectbasefees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subjectbasefee.getId().intValue())))
            .andExpect(jsonPath("$.[*].baseFee").value(hasItem(DEFAULT_BASE_FEE)));
    }
    
    @Test
    @Transactional
    public void getSubjectbasefee() throws Exception {
        // Initialize the database
        subjectbasefeeRepository.saveAndFlush(subjectbasefee);

        // Get the subjectbasefee
        restSubjectbasefeeMockMvc.perform(get("/api/subjectbasefees/{id}", subjectbasefee.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subjectbasefee.getId().intValue()))
            .andExpect(jsonPath("$.baseFee").value(DEFAULT_BASE_FEE));
    }

    @Test
    @Transactional
    public void getNonExistingSubjectbasefee() throws Exception {
        // Get the subjectbasefee
        restSubjectbasefeeMockMvc.perform(get("/api/subjectbasefees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubjectbasefee() throws Exception {
        // Initialize the database
        subjectbasefeeRepository.saveAndFlush(subjectbasefee);

        int databaseSizeBeforeUpdate = subjectbasefeeRepository.findAll().size();

        // Update the subjectbasefee
        Subjectbasefee updatedSubjectbasefee = subjectbasefeeRepository.findById(subjectbasefee.getId()).get();
        // Disconnect from session so that the updates on updatedSubjectbasefee are not directly saved in db
        em.detach(updatedSubjectbasefee);
        updatedSubjectbasefee
            .baseFee(UPDATED_BASE_FEE);
        SubjectbasefeeDTO subjectbasefeeDTO = subjectbasefeeMapper.toDto(updatedSubjectbasefee);

        restSubjectbasefeeMockMvc.perform(put("/api/subjectbasefees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectbasefeeDTO)))
            .andExpect(status().isOk());

        // Validate the Subjectbasefee in the database
        List<Subjectbasefee> subjectbasefeeList = subjectbasefeeRepository.findAll();
        assertThat(subjectbasefeeList).hasSize(databaseSizeBeforeUpdate);
        Subjectbasefee testSubjectbasefee = subjectbasefeeList.get(subjectbasefeeList.size() - 1);
        assertThat(testSubjectbasefee.getBaseFee()).isEqualTo(UPDATED_BASE_FEE);
    }

    @Test
    @Transactional
    public void updateNonExistingSubjectbasefee() throws Exception {
        int databaseSizeBeforeUpdate = subjectbasefeeRepository.findAll().size();

        // Create the Subjectbasefee
        SubjectbasefeeDTO subjectbasefeeDTO = subjectbasefeeMapper.toDto(subjectbasefee);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubjectbasefeeMockMvc.perform(put("/api/subjectbasefees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectbasefeeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Subjectbasefee in the database
        List<Subjectbasefee> subjectbasefeeList = subjectbasefeeRepository.findAll();
        assertThat(subjectbasefeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubjectbasefee() throws Exception {
        // Initialize the database
        subjectbasefeeRepository.saveAndFlush(subjectbasefee);

        int databaseSizeBeforeDelete = subjectbasefeeRepository.findAll().size();

        // Delete the subjectbasefee
        restSubjectbasefeeMockMvc.perform(delete("/api/subjectbasefees/{id}", subjectbasefee.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Subjectbasefee> subjectbasefeeList = subjectbasefeeRepository.findAll();
        assertThat(subjectbasefeeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Subjectbasefee.class);
        Subjectbasefee subjectbasefee1 = new Subjectbasefee();
        subjectbasefee1.setId(1L);
        Subjectbasefee subjectbasefee2 = new Subjectbasefee();
        subjectbasefee2.setId(subjectbasefee1.getId());
        assertThat(subjectbasefee1).isEqualTo(subjectbasefee2);
        subjectbasefee2.setId(2L);
        assertThat(subjectbasefee1).isNotEqualTo(subjectbasefee2);
        subjectbasefee1.setId(null);
        assertThat(subjectbasefee1).isNotEqualTo(subjectbasefee2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubjectbasefeeDTO.class);
        SubjectbasefeeDTO subjectbasefeeDTO1 = new SubjectbasefeeDTO();
        subjectbasefeeDTO1.setId(1L);
        SubjectbasefeeDTO subjectbasefeeDTO2 = new SubjectbasefeeDTO();
        assertThat(subjectbasefeeDTO1).isNotEqualTo(subjectbasefeeDTO2);
        subjectbasefeeDTO2.setId(subjectbasefeeDTO1.getId());
        assertThat(subjectbasefeeDTO1).isEqualTo(subjectbasefeeDTO2);
        subjectbasefeeDTO2.setId(2L);
        assertThat(subjectbasefeeDTO1).isNotEqualTo(subjectbasefeeDTO2);
        subjectbasefeeDTO1.setId(null);
        assertThat(subjectbasefeeDTO1).isNotEqualTo(subjectbasefeeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(subjectbasefeeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(subjectbasefeeMapper.fromId(null)).isNull();
    }
}
