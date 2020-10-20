package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingarjunApp;
import com.risingarjun.arjun.domain.Answersheet;
import com.risingarjun.arjun.repository.AnswersheetRepository;
import com.risingarjun.arjun.service.AnswersheetService;
import com.risingarjun.arjun.service.dto.AnswersheetDTO;
import com.risingarjun.arjun.service.mapper.AnswersheetMapper;
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

import com.risingarjun.arjun.domain.enumeration.Answeroption;
import com.risingarjun.arjun.domain.enumeration.Answerstatus;
/**
 * Integration tests for the {@Link AnswersheetResource} REST controller.
 */
@SpringBootTest(classes = RisingarjunApp.class)
public class AnswersheetResourceIT {

    private static final Answeroption DEFAULT_ANSWER = Answeroption.A;
    private static final Answeroption UPDATED_ANSWER = Answeroption.B;

    private static final Integer DEFAULT_MARKS = 1;
    private static final Integer UPDATED_MARKS = 2;

    private static final Answerstatus DEFAULT_STATUS = Answerstatus.DRAFT;
    private static final Answerstatus UPDATED_STATUS = Answerstatus.FINAL;

    @Autowired
    private AnswersheetRepository answersheetRepository;

    @Mock
    private AnswersheetRepository answersheetRepositoryMock;

    @Autowired
    private AnswersheetMapper answersheetMapper;

    @Mock
    private AnswersheetService answersheetServiceMock;

    @Autowired
    private AnswersheetService answersheetService;

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

    private MockMvc restAnswersheetMockMvc;

    private Answersheet answersheet;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnswersheetResource answersheetResource = new AnswersheetResource(answersheetService);
        this.restAnswersheetMockMvc = MockMvcBuilders.standaloneSetup(answersheetResource)
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
    public static Answersheet createEntity(EntityManager em) {
        Answersheet answersheet = new Answersheet()
            .answer(DEFAULT_ANSWER)
            .marks(DEFAULT_MARKS)
            .status(DEFAULT_STATUS);
        return answersheet;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Answersheet createUpdatedEntity(EntityManager em) {
        Answersheet answersheet = new Answersheet()
            .answer(UPDATED_ANSWER)
            .marks(UPDATED_MARKS)
            .status(UPDATED_STATUS);
        return answersheet;
    }

    @BeforeEach
    public void initTest() {
        answersheet = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnswersheet() throws Exception {
        int databaseSizeBeforeCreate = answersheetRepository.findAll().size();

        // Create the Answersheet
        AnswersheetDTO answersheetDTO = answersheetMapper.toDto(answersheet);
        restAnswersheetMockMvc.perform(post("/api/answersheets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answersheetDTO)))
            .andExpect(status().isCreated());

        // Validate the Answersheet in the database
        List<Answersheet> answersheetList = answersheetRepository.findAll();
        assertThat(answersheetList).hasSize(databaseSizeBeforeCreate + 1);
        Answersheet testAnswersheet = answersheetList.get(answersheetList.size() - 1);
        assertThat(testAnswersheet.getAnswer()).isEqualTo(DEFAULT_ANSWER);
        assertThat(testAnswersheet.getMarks()).isEqualTo(DEFAULT_MARKS);
        assertThat(testAnswersheet.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createAnswersheetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = answersheetRepository.findAll().size();

        // Create the Answersheet with an existing ID
        answersheet.setId(1L);
        AnswersheetDTO answersheetDTO = answersheetMapper.toDto(answersheet);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnswersheetMockMvc.perform(post("/api/answersheets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answersheetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Answersheet in the database
        List<Answersheet> answersheetList = answersheetRepository.findAll();
        assertThat(answersheetList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkAnswerIsRequired() throws Exception {
        int databaseSizeBeforeTest = answersheetRepository.findAll().size();
        // set the field null
        answersheet.setAnswer(null);

        // Create the Answersheet, which fails.
        AnswersheetDTO answersheetDTO = answersheetMapper.toDto(answersheet);

        restAnswersheetMockMvc.perform(post("/api/answersheets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answersheetDTO)))
            .andExpect(status().isBadRequest());

        List<Answersheet> answersheetList = answersheetRepository.findAll();
        assertThat(answersheetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMarksIsRequired() throws Exception {
        int databaseSizeBeforeTest = answersheetRepository.findAll().size();
        // set the field null
        answersheet.setMarks(null);

        // Create the Answersheet, which fails.
        AnswersheetDTO answersheetDTO = answersheetMapper.toDto(answersheet);

        restAnswersheetMockMvc.perform(post("/api/answersheets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answersheetDTO)))
            .andExpect(status().isBadRequest());

        List<Answersheet> answersheetList = answersheetRepository.findAll();
        assertThat(answersheetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAnswersheets() throws Exception {
        // Initialize the database
        answersheetRepository.saveAndFlush(answersheet);

        // Get all the answersheetList
        restAnswersheetMockMvc.perform(get("/api/answersheets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(answersheet.getId().intValue())))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER.toString())))
            .andExpect(jsonPath("$.[*].marks").value(hasItem(DEFAULT_MARKS)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllAnswersheetsWithEagerRelationshipsIsEnabled() throws Exception {
        AnswersheetResource answersheetResource = new AnswersheetResource(answersheetServiceMock);
        when(answersheetServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restAnswersheetMockMvc = MockMvcBuilders.standaloneSetup(answersheetResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAnswersheetMockMvc.perform(get("/api/answersheets?eagerload=true"))
        .andExpect(status().isOk());

        verify(answersheetServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAnswersheetsWithEagerRelationshipsIsNotEnabled() throws Exception {
        AnswersheetResource answersheetResource = new AnswersheetResource(answersheetServiceMock);
            when(answersheetServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restAnswersheetMockMvc = MockMvcBuilders.standaloneSetup(answersheetResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAnswersheetMockMvc.perform(get("/api/answersheets?eagerload=true"))
        .andExpect(status().isOk());

            verify(answersheetServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getAnswersheet() throws Exception {
        // Initialize the database
        answersheetRepository.saveAndFlush(answersheet);

        // Get the answersheet
        restAnswersheetMockMvc.perform(get("/api/answersheets/{id}", answersheet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(answersheet.getId().intValue()))
            .andExpect(jsonPath("$.answer").value(DEFAULT_ANSWER.toString()))
            .andExpect(jsonPath("$.marks").value(DEFAULT_MARKS))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAnswersheet() throws Exception {
        // Get the answersheet
        restAnswersheetMockMvc.perform(get("/api/answersheets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnswersheet() throws Exception {
        // Initialize the database
        answersheetRepository.saveAndFlush(answersheet);

        int databaseSizeBeforeUpdate = answersheetRepository.findAll().size();

        // Update the answersheet
        Answersheet updatedAnswersheet = answersheetRepository.findById(answersheet.getId()).get();
        // Disconnect from session so that the updates on updatedAnswersheet are not directly saved in db
        em.detach(updatedAnswersheet);
        updatedAnswersheet
            .answer(UPDATED_ANSWER)
            .marks(UPDATED_MARKS)
            .status(UPDATED_STATUS);
        AnswersheetDTO answersheetDTO = answersheetMapper.toDto(updatedAnswersheet);

        restAnswersheetMockMvc.perform(put("/api/answersheets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answersheetDTO)))
            .andExpect(status().isOk());

        // Validate the Answersheet in the database
        List<Answersheet> answersheetList = answersheetRepository.findAll();
        assertThat(answersheetList).hasSize(databaseSizeBeforeUpdate);
        Answersheet testAnswersheet = answersheetList.get(answersheetList.size() - 1);
        assertThat(testAnswersheet.getAnswer()).isEqualTo(UPDATED_ANSWER);
        assertThat(testAnswersheet.getMarks()).isEqualTo(UPDATED_MARKS);
        assertThat(testAnswersheet.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingAnswersheet() throws Exception {
        int databaseSizeBeforeUpdate = answersheetRepository.findAll().size();

        // Create the Answersheet
        AnswersheetDTO answersheetDTO = answersheetMapper.toDto(answersheet);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnswersheetMockMvc.perform(put("/api/answersheets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answersheetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Answersheet in the database
        List<Answersheet> answersheetList = answersheetRepository.findAll();
        assertThat(answersheetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnswersheet() throws Exception {
        // Initialize the database
        answersheetRepository.saveAndFlush(answersheet);

        int databaseSizeBeforeDelete = answersheetRepository.findAll().size();

        // Delete the answersheet
        restAnswersheetMockMvc.perform(delete("/api/answersheets/{id}", answersheet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Answersheet> answersheetList = answersheetRepository.findAll();
        assertThat(answersheetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Answersheet.class);
        Answersheet answersheet1 = new Answersheet();
        answersheet1.setId(1L);
        Answersheet answersheet2 = new Answersheet();
        answersheet2.setId(answersheet1.getId());
        assertThat(answersheet1).isEqualTo(answersheet2);
        answersheet2.setId(2L);
        assertThat(answersheet1).isNotEqualTo(answersheet2);
        answersheet1.setId(null);
        assertThat(answersheet1).isNotEqualTo(answersheet2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnswersheetDTO.class);
        AnswersheetDTO answersheetDTO1 = new AnswersheetDTO();
        answersheetDTO1.setId(1L);
        AnswersheetDTO answersheetDTO2 = new AnswersheetDTO();
        assertThat(answersheetDTO1).isNotEqualTo(answersheetDTO2);
        answersheetDTO2.setId(answersheetDTO1.getId());
        assertThat(answersheetDTO1).isEqualTo(answersheetDTO2);
        answersheetDTO2.setId(2L);
        assertThat(answersheetDTO1).isNotEqualTo(answersheetDTO2);
        answersheetDTO1.setId(null);
        assertThat(answersheetDTO1).isNotEqualTo(answersheetDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(answersheetMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(answersheetMapper.fromId(null)).isNull();
    }
}
