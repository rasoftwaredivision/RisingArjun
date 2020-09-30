package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingarjunApp;
import com.risingarjun.arjun.domain.Testpaper;
import com.risingarjun.arjun.repository.TestpaperRepository;
import com.risingarjun.arjun.service.TestpaperService;
import com.risingarjun.arjun.service.dto.TestpaperDTO;
import com.risingarjun.arjun.service.mapper.TestpaperMapper;
import com.risingarjun.arjun.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.risingarjun.arjun.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.risingarjun.arjun.domain.enumeration.Questionlevel;
/**
 * Integration tests for the {@Link TestpaperResource} REST controller.
 */
@SpringBootTest(classes = RisingarjunApp.class)
public class TestpaperResourceIT {

    private static final Integer DEFAULT_MAX_MARKS = 1;
    private static final Integer UPDATED_MAX_MARKS = 2;

    private static final Integer DEFAULT_DURATION_MINS = 1;
    private static final Integer UPDATED_DURATION_MINS = 2;

    private static final Questionlevel DEFAULT_LEVEL = Questionlevel.BEGINNERS;
    private static final Questionlevel UPDATED_LEVEL = Questionlevel.MODERATE;

    @Autowired
    private TestpaperRepository testpaperRepository;

    @Mock
    private TestpaperRepository testpaperRepositoryMock;

    @Autowired
    private TestpaperMapper testpaperMapper;

    @Mock
    private TestpaperService testpaperServiceMock;

    @Autowired
    private TestpaperService testpaperService;

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

    private MockMvc restTestpaperMockMvc;

    private Testpaper testpaper;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestpaperResource testpaperResource = new TestpaperResource(testpaperService);
        this.restTestpaperMockMvc = MockMvcBuilders.standaloneSetup(testpaperResource)
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
    public static Testpaper createEntity(EntityManager em) {
        Testpaper testpaper = new Testpaper()
            .maxMarks(DEFAULT_MAX_MARKS)
            .durationMins(DEFAULT_DURATION_MINS)
            .level(DEFAULT_LEVEL);
        return testpaper;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Testpaper createUpdatedEntity(EntityManager em) {
        Testpaper testpaper = new Testpaper()
            .maxMarks(UPDATED_MAX_MARKS)
            .durationMins(UPDATED_DURATION_MINS)
            .level(UPDATED_LEVEL);
        return testpaper;
    }

    @BeforeEach
    public void initTest() {
        testpaper = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestpaper() throws Exception {
        int databaseSizeBeforeCreate = testpaperRepository.findAll().size();

        // Create the Testpaper
        TestpaperDTO testpaperDTO = testpaperMapper.toDto(testpaper);
        restTestpaperMockMvc.perform(post("/api/testpapers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testpaperDTO)))
            .andExpect(status().isCreated());

        // Validate the Testpaper in the database
        List<Testpaper> testpaperList = testpaperRepository.findAll();
        assertThat(testpaperList).hasSize(databaseSizeBeforeCreate + 1);
        Testpaper testTestpaper = testpaperList.get(testpaperList.size() - 1);
        assertThat(testTestpaper.getMaxMarks()).isEqualTo(DEFAULT_MAX_MARKS);
        assertThat(testTestpaper.getDurationMins()).isEqualTo(DEFAULT_DURATION_MINS);
        assertThat(testTestpaper.getLevel()).isEqualTo(DEFAULT_LEVEL);
    }

    @Test
    @Transactional
    public void createTestpaperWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testpaperRepository.findAll().size();

        // Create the Testpaper with an existing ID
        testpaper.setId(1L);
        TestpaperDTO testpaperDTO = testpaperMapper.toDto(testpaper);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestpaperMockMvc.perform(post("/api/testpapers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testpaperDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Testpaper in the database
        List<Testpaper> testpaperList = testpaperRepository.findAll();
        assertThat(testpaperList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMaxMarksIsRequired() throws Exception {
        int databaseSizeBeforeTest = testpaperRepository.findAll().size();
        // set the field null
        testpaper.setMaxMarks(null);

        // Create the Testpaper, which fails.
        TestpaperDTO testpaperDTO = testpaperMapper.toDto(testpaper);

        restTestpaperMockMvc.perform(post("/api/testpapers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testpaperDTO)))
            .andExpect(status().isBadRequest());

        List<Testpaper> testpaperList = testpaperRepository.findAll();
        assertThat(testpaperList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDurationMinsIsRequired() throws Exception {
        int databaseSizeBeforeTest = testpaperRepository.findAll().size();
        // set the field null
        testpaper.setDurationMins(null);

        // Create the Testpaper, which fails.
        TestpaperDTO testpaperDTO = testpaperMapper.toDto(testpaper);

        restTestpaperMockMvc.perform(post("/api/testpapers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testpaperDTO)))
            .andExpect(status().isBadRequest());

        List<Testpaper> testpaperList = testpaperRepository.findAll();
        assertThat(testpaperList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLevelIsRequired() throws Exception {
        int databaseSizeBeforeTest = testpaperRepository.findAll().size();
        // set the field null
        testpaper.setLevel(null);

        // Create the Testpaper, which fails.
        TestpaperDTO testpaperDTO = testpaperMapper.toDto(testpaper);

        restTestpaperMockMvc.perform(post("/api/testpapers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testpaperDTO)))
            .andExpect(status().isBadRequest());

        List<Testpaper> testpaperList = testpaperRepository.findAll();
        assertThat(testpaperList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTestpapers() throws Exception {
        // Initialize the database
        testpaperRepository.saveAndFlush(testpaper);

        // Get all the testpaperList
        restTestpaperMockMvc.perform(get("/api/testpapers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testpaper.getId().intValue())))
            .andExpect(jsonPath("$.[*].maxMarks").value(hasItem(DEFAULT_MAX_MARKS)))
            .andExpect(jsonPath("$.[*].durationMins").value(hasItem(DEFAULT_DURATION_MINS)))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTestpapersWithEagerRelationshipsIsEnabled() throws Exception {
        TestpaperResource testpaperResource = new TestpaperResource(testpaperServiceMock);
        when(testpaperServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTestpaperMockMvc = MockMvcBuilders.standaloneSetup(testpaperResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestpaperMockMvc.perform(get("/api/testpapers?eagerload=true"))
        .andExpect(status().isOk());

        verify(testpaperServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTestpapersWithEagerRelationshipsIsNotEnabled() throws Exception {
        TestpaperResource testpaperResource = new TestpaperResource(testpaperServiceMock);
            when(testpaperServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTestpaperMockMvc = MockMvcBuilders.standaloneSetup(testpaperResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestpaperMockMvc.perform(get("/api/testpapers?eagerload=true"))
        .andExpect(status().isOk());

            verify(testpaperServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTestpaper() throws Exception {
        // Initialize the database
        testpaperRepository.saveAndFlush(testpaper);

        // Get the testpaper
        restTestpaperMockMvc.perform(get("/api/testpapers/{id}", testpaper.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testpaper.getId().intValue()))
            .andExpect(jsonPath("$.maxMarks").value(DEFAULT_MAX_MARKS))
            .andExpect(jsonPath("$.durationMins").value(DEFAULT_DURATION_MINS))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTestpaper() throws Exception {
        // Get the testpaper
        restTestpaperMockMvc.perform(get("/api/testpapers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestpaper() throws Exception {
        // Initialize the database
        testpaperRepository.saveAndFlush(testpaper);

        int databaseSizeBeforeUpdate = testpaperRepository.findAll().size();

        // Update the testpaper
        Testpaper updatedTestpaper = testpaperRepository.findById(testpaper.getId()).get();
        // Disconnect from session so that the updates on updatedTestpaper are not directly saved in db
        em.detach(updatedTestpaper);
        updatedTestpaper
            .maxMarks(UPDATED_MAX_MARKS)
            .durationMins(UPDATED_DURATION_MINS)
            .level(UPDATED_LEVEL);
        TestpaperDTO testpaperDTO = testpaperMapper.toDto(updatedTestpaper);

        restTestpaperMockMvc.perform(put("/api/testpapers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testpaperDTO)))
            .andExpect(status().isOk());

        // Validate the Testpaper in the database
        List<Testpaper> testpaperList = testpaperRepository.findAll();
        assertThat(testpaperList).hasSize(databaseSizeBeforeUpdate);
        Testpaper testTestpaper = testpaperList.get(testpaperList.size() - 1);
        assertThat(testTestpaper.getMaxMarks()).isEqualTo(UPDATED_MAX_MARKS);
        assertThat(testTestpaper.getDurationMins()).isEqualTo(UPDATED_DURATION_MINS);
        assertThat(testTestpaper.getLevel()).isEqualTo(UPDATED_LEVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingTestpaper() throws Exception {
        int databaseSizeBeforeUpdate = testpaperRepository.findAll().size();

        // Create the Testpaper
        TestpaperDTO testpaperDTO = testpaperMapper.toDto(testpaper);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestpaperMockMvc.perform(put("/api/testpapers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testpaperDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Testpaper in the database
        List<Testpaper> testpaperList = testpaperRepository.findAll();
        assertThat(testpaperList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTestpaper() throws Exception {
        // Initialize the database
        testpaperRepository.saveAndFlush(testpaper);

        int databaseSizeBeforeDelete = testpaperRepository.findAll().size();

        // Delete the testpaper
        restTestpaperMockMvc.perform(delete("/api/testpapers/{id}", testpaper.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Testpaper> testpaperList = testpaperRepository.findAll();
        assertThat(testpaperList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Testpaper.class);
        Testpaper testpaper1 = new Testpaper();
        testpaper1.setId(1L);
        Testpaper testpaper2 = new Testpaper();
        testpaper2.setId(testpaper1.getId());
        assertThat(testpaper1).isEqualTo(testpaper2);
        testpaper2.setId(2L);
        assertThat(testpaper1).isNotEqualTo(testpaper2);
        testpaper1.setId(null);
        assertThat(testpaper1).isNotEqualTo(testpaper2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestpaperDTO.class);
        TestpaperDTO testpaperDTO1 = new TestpaperDTO();
        testpaperDTO1.setId(1L);
        TestpaperDTO testpaperDTO2 = new TestpaperDTO();
        assertThat(testpaperDTO1).isNotEqualTo(testpaperDTO2);
        testpaperDTO2.setId(testpaperDTO1.getId());
        assertThat(testpaperDTO1).isEqualTo(testpaperDTO2);
        testpaperDTO2.setId(2L);
        assertThat(testpaperDTO1).isNotEqualTo(testpaperDTO2);
        testpaperDTO1.setId(null);
        assertThat(testpaperDTO1).isNotEqualTo(testpaperDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(testpaperMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(testpaperMapper.fromId(null)).isNull();
    }
}
