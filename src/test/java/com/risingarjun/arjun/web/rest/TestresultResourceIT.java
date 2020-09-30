package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingarjunApp;
import com.risingarjun.arjun.domain.Testresult;
import com.risingarjun.arjun.repository.TestresultRepository;
import com.risingarjun.arjun.service.TestresultService;
import com.risingarjun.arjun.service.dto.TestresultDTO;
import com.risingarjun.arjun.service.mapper.TestresultMapper;
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
 * Integration tests for the {@Link TestresultResource} REST controller.
 */
@SpringBootTest(classes = RisingarjunApp.class)
public class TestresultResourceIT {

    private static final Integer DEFAULT_POSITIVE_MARKS = 1;
    private static final Integer UPDATED_POSITIVE_MARKS = 2;

    private static final Integer DEFAULT_NEGATIVE_MARKS = 1;
    private static final Integer UPDATED_NEGATIVE_MARKS = 2;

    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    private static final Integer DEFAULT_TIME_TAKEN = 1;
    private static final Integer UPDATED_TIME_TAKEN = 2;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private TestresultRepository testresultRepository;

    @Autowired
    private TestresultMapper testresultMapper;

    @Autowired
    private TestresultService testresultService;

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

    private MockMvc restTestresultMockMvc;

    private Testresult testresult;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestresultResource testresultResource = new TestresultResource(testresultService);
        this.restTestresultMockMvc = MockMvcBuilders.standaloneSetup(testresultResource)
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
    public static Testresult createEntity(EntityManager em) {
        Testresult testresult = new Testresult()
            .positiveMarks(DEFAULT_POSITIVE_MARKS)
            .negativeMarks(DEFAULT_NEGATIVE_MARKS)
            .score(DEFAULT_SCORE)
            .timeTaken(DEFAULT_TIME_TAKEN)
            .date(DEFAULT_DATE);
        return testresult;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Testresult createUpdatedEntity(EntityManager em) {
        Testresult testresult = new Testresult()
            .positiveMarks(UPDATED_POSITIVE_MARKS)
            .negativeMarks(UPDATED_NEGATIVE_MARKS)
            .score(UPDATED_SCORE)
            .timeTaken(UPDATED_TIME_TAKEN)
            .date(UPDATED_DATE);
        return testresult;
    }

    @BeforeEach
    public void initTest() {
        testresult = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestresult() throws Exception {
        int databaseSizeBeforeCreate = testresultRepository.findAll().size();

        // Create the Testresult
        TestresultDTO testresultDTO = testresultMapper.toDto(testresult);
        restTestresultMockMvc.perform(post("/api/testresults")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testresultDTO)))
            .andExpect(status().isCreated());

        // Validate the Testresult in the database
        List<Testresult> testresultList = testresultRepository.findAll();
        assertThat(testresultList).hasSize(databaseSizeBeforeCreate + 1);
        Testresult testTestresult = testresultList.get(testresultList.size() - 1);
        assertThat(testTestresult.getPositiveMarks()).isEqualTo(DEFAULT_POSITIVE_MARKS);
        assertThat(testTestresult.getNegativeMarks()).isEqualTo(DEFAULT_NEGATIVE_MARKS);
        assertThat(testTestresult.getScore()).isEqualTo(DEFAULT_SCORE);
        assertThat(testTestresult.getTimeTaken()).isEqualTo(DEFAULT_TIME_TAKEN);
        assertThat(testTestresult.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createTestresultWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testresultRepository.findAll().size();

        // Create the Testresult with an existing ID
        testresult.setId(1L);
        TestresultDTO testresultDTO = testresultMapper.toDto(testresult);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestresultMockMvc.perform(post("/api/testresults")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testresultDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Testresult in the database
        List<Testresult> testresultList = testresultRepository.findAll();
        assertThat(testresultList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkPositiveMarksIsRequired() throws Exception {
        int databaseSizeBeforeTest = testresultRepository.findAll().size();
        // set the field null
        testresult.setPositiveMarks(null);

        // Create the Testresult, which fails.
        TestresultDTO testresultDTO = testresultMapper.toDto(testresult);

        restTestresultMockMvc.perform(post("/api/testresults")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testresultDTO)))
            .andExpect(status().isBadRequest());

        List<Testresult> testresultList = testresultRepository.findAll();
        assertThat(testresultList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNegativeMarksIsRequired() throws Exception {
        int databaseSizeBeforeTest = testresultRepository.findAll().size();
        // set the field null
        testresult.setNegativeMarks(null);

        // Create the Testresult, which fails.
        TestresultDTO testresultDTO = testresultMapper.toDto(testresult);

        restTestresultMockMvc.perform(post("/api/testresults")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testresultDTO)))
            .andExpect(status().isBadRequest());

        List<Testresult> testresultList = testresultRepository.findAll();
        assertThat(testresultList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkScoreIsRequired() throws Exception {
        int databaseSizeBeforeTest = testresultRepository.findAll().size();
        // set the field null
        testresult.setScore(null);

        // Create the Testresult, which fails.
        TestresultDTO testresultDTO = testresultMapper.toDto(testresult);

        restTestresultMockMvc.perform(post("/api/testresults")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testresultDTO)))
            .andExpect(status().isBadRequest());

        List<Testresult> testresultList = testresultRepository.findAll();
        assertThat(testresultList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTimeTakenIsRequired() throws Exception {
        int databaseSizeBeforeTest = testresultRepository.findAll().size();
        // set the field null
        testresult.setTimeTaken(null);

        // Create the Testresult, which fails.
        TestresultDTO testresultDTO = testresultMapper.toDto(testresult);

        restTestresultMockMvc.perform(post("/api/testresults")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testresultDTO)))
            .andExpect(status().isBadRequest());

        List<Testresult> testresultList = testresultRepository.findAll();
        assertThat(testresultList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = testresultRepository.findAll().size();
        // set the field null
        testresult.setDate(null);

        // Create the Testresult, which fails.
        TestresultDTO testresultDTO = testresultMapper.toDto(testresult);

        restTestresultMockMvc.perform(post("/api/testresults")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testresultDTO)))
            .andExpect(status().isBadRequest());

        List<Testresult> testresultList = testresultRepository.findAll();
        assertThat(testresultList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTestresults() throws Exception {
        // Initialize the database
        testresultRepository.saveAndFlush(testresult);

        // Get all the testresultList
        restTestresultMockMvc.perform(get("/api/testresults?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testresult.getId().intValue())))
            .andExpect(jsonPath("$.[*].positiveMarks").value(hasItem(DEFAULT_POSITIVE_MARKS)))
            .andExpect(jsonPath("$.[*].negativeMarks").value(hasItem(DEFAULT_NEGATIVE_MARKS)))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)))
            .andExpect(jsonPath("$.[*].timeTaken").value(hasItem(DEFAULT_TIME_TAKEN)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getTestresult() throws Exception {
        // Initialize the database
        testresultRepository.saveAndFlush(testresult);

        // Get the testresult
        restTestresultMockMvc.perform(get("/api/testresults/{id}", testresult.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testresult.getId().intValue()))
            .andExpect(jsonPath("$.positiveMarks").value(DEFAULT_POSITIVE_MARKS))
            .andExpect(jsonPath("$.negativeMarks").value(DEFAULT_NEGATIVE_MARKS))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE))
            .andExpect(jsonPath("$.timeTaken").value(DEFAULT_TIME_TAKEN))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTestresult() throws Exception {
        // Get the testresult
        restTestresultMockMvc.perform(get("/api/testresults/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestresult() throws Exception {
        // Initialize the database
        testresultRepository.saveAndFlush(testresult);

        int databaseSizeBeforeUpdate = testresultRepository.findAll().size();

        // Update the testresult
        Testresult updatedTestresult = testresultRepository.findById(testresult.getId()).get();
        // Disconnect from session so that the updates on updatedTestresult are not directly saved in db
        em.detach(updatedTestresult);
        updatedTestresult
            .positiveMarks(UPDATED_POSITIVE_MARKS)
            .negativeMarks(UPDATED_NEGATIVE_MARKS)
            .score(UPDATED_SCORE)
            .timeTaken(UPDATED_TIME_TAKEN)
            .date(UPDATED_DATE);
        TestresultDTO testresultDTO = testresultMapper.toDto(updatedTestresult);

        restTestresultMockMvc.perform(put("/api/testresults")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testresultDTO)))
            .andExpect(status().isOk());

        // Validate the Testresult in the database
        List<Testresult> testresultList = testresultRepository.findAll();
        assertThat(testresultList).hasSize(databaseSizeBeforeUpdate);
        Testresult testTestresult = testresultList.get(testresultList.size() - 1);
        assertThat(testTestresult.getPositiveMarks()).isEqualTo(UPDATED_POSITIVE_MARKS);
        assertThat(testTestresult.getNegativeMarks()).isEqualTo(UPDATED_NEGATIVE_MARKS);
        assertThat(testTestresult.getScore()).isEqualTo(UPDATED_SCORE);
        assertThat(testTestresult.getTimeTaken()).isEqualTo(UPDATED_TIME_TAKEN);
        assertThat(testTestresult.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTestresult() throws Exception {
        int databaseSizeBeforeUpdate = testresultRepository.findAll().size();

        // Create the Testresult
        TestresultDTO testresultDTO = testresultMapper.toDto(testresult);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestresultMockMvc.perform(put("/api/testresults")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testresultDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Testresult in the database
        List<Testresult> testresultList = testresultRepository.findAll();
        assertThat(testresultList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTestresult() throws Exception {
        // Initialize the database
        testresultRepository.saveAndFlush(testresult);

        int databaseSizeBeforeDelete = testresultRepository.findAll().size();

        // Delete the testresult
        restTestresultMockMvc.perform(delete("/api/testresults/{id}", testresult.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Testresult> testresultList = testresultRepository.findAll();
        assertThat(testresultList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Testresult.class);
        Testresult testresult1 = new Testresult();
        testresult1.setId(1L);
        Testresult testresult2 = new Testresult();
        testresult2.setId(testresult1.getId());
        assertThat(testresult1).isEqualTo(testresult2);
        testresult2.setId(2L);
        assertThat(testresult1).isNotEqualTo(testresult2);
        testresult1.setId(null);
        assertThat(testresult1).isNotEqualTo(testresult2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestresultDTO.class);
        TestresultDTO testresultDTO1 = new TestresultDTO();
        testresultDTO1.setId(1L);
        TestresultDTO testresultDTO2 = new TestresultDTO();
        assertThat(testresultDTO1).isNotEqualTo(testresultDTO2);
        testresultDTO2.setId(testresultDTO1.getId());
        assertThat(testresultDTO1).isEqualTo(testresultDTO2);
        testresultDTO2.setId(2L);
        assertThat(testresultDTO1).isNotEqualTo(testresultDTO2);
        testresultDTO1.setId(null);
        assertThat(testresultDTO1).isNotEqualTo(testresultDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(testresultMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(testresultMapper.fromId(null)).isNull();
    }
}
