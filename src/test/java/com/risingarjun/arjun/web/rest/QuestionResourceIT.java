package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingarjunApp;
import com.risingarjun.arjun.domain.Question;
import com.risingarjun.arjun.repository.QuestionRepository;
import com.risingarjun.arjun.service.QuestionService;
import com.risingarjun.arjun.service.dto.QuestionDTO;
import com.risingarjun.arjun.service.mapper.QuestionMapper;
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
import org.springframework.util.Base64Utils;
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
import com.risingarjun.arjun.domain.enumeration.Questionlevel;
import com.risingarjun.arjun.domain.enumeration.Questionstatus;
/**
 * Integration tests for the {@Link QuestionResource} REST controller.
 */
@SpringBootTest(classes = RisingarjunApp.class)
public class QuestionResourceIT {

    private static final String DEFAULT_QUESTION = "AAAAAAAAAA";
    private static final String UPDATED_QUESTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_QUESTION_DIAGRAM = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_QUESTION_DIAGRAM = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_QUESTION_DIAGRAM_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_QUESTION_DIAGRAM_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_OPTION_A = "AAAAAAAAAA";
    private static final String UPDATED_OPTION_A = "BBBBBBBBBB";

    private static final String DEFAULT_OPTION_B = "AAAAAAAAAA";
    private static final String UPDATED_OPTION_B = "BBBBBBBBBB";

    private static final String DEFAULT_OPTION_C = "AAAAAAAAAA";
    private static final String UPDATED_OPTION_C = "BBBBBBBBBB";

    private static final String DEFAULT_OPTION_D = "AAAAAAAAAA";
    private static final String UPDATED_OPTION_D = "BBBBBBBBBB";

    private static final Boolean DEFAULT_MULTI_CHOICE = false;
    private static final Boolean UPDATED_MULTI_CHOICE = true;

    private static final Answeroption DEFAULT_ANSWER = Answeroption.A;
    private static final Answeroption UPDATED_ANSWER = Answeroption.B;

    private static final Integer DEFAULT_MAX_MARKS = 1;
    private static final Integer UPDATED_MAX_MARKS = 2;

    private static final Integer DEFAULT_NEGATIVE_MARKS = 1;
    private static final Integer UPDATED_NEGATIVE_MARKS = 2;

    private static final Integer DEFAULT_DURATION_MINS = 1;
    private static final Integer UPDATED_DURATION_MINS = 2;

    private static final Questionlevel DEFAULT_LEVEL = Questionlevel.BEGINNERS;
    private static final Questionlevel UPDATED_LEVEL = Questionlevel.MODERATE;

    private static final String DEFAULT_SOLUTION = "AAAAAAAAAA";
    private static final String UPDATED_SOLUTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_ANS_DIAGRAM = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ANS_DIAGRAM = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_ANS_DIAGRAM_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ANS_DIAGRAM_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_VIDEO = "AAAAAAAAAA";
    private static final String UPDATED_VIDEO = "BBBBBBBBBB";

    private static final Questionstatus DEFAULT_STATUS = Questionstatus.CREATED;
    private static final Questionstatus UPDATED_STATUS = Questionstatus.REWRITE;

    @Autowired
    private QuestionRepository questionRepository;

    @Mock
    private QuestionRepository questionRepositoryMock;

    @Autowired
    private QuestionMapper questionMapper;

    @Mock
    private QuestionService questionServiceMock;

    @Autowired
    private QuestionService questionService;

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

    private MockMvc restQuestionMockMvc;

    private Question question;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuestionResource questionResource = new QuestionResource(questionService);
        this.restQuestionMockMvc = MockMvcBuilders.standaloneSetup(questionResource)
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
    public static Question createEntity(EntityManager em) {
        Question question = new Question()
            .question(DEFAULT_QUESTION)
            .questionDiagram(DEFAULT_QUESTION_DIAGRAM)
            .questionDiagramContentType(DEFAULT_QUESTION_DIAGRAM_CONTENT_TYPE)
            .optionA(DEFAULT_OPTION_A)
            .optionB(DEFAULT_OPTION_B)
            .optionC(DEFAULT_OPTION_C)
            .optionD(DEFAULT_OPTION_D)
            .multiChoice(DEFAULT_MULTI_CHOICE)
            .answer(DEFAULT_ANSWER)
            .maxMarks(DEFAULT_MAX_MARKS)
            .negativeMarks(DEFAULT_NEGATIVE_MARKS)
            .durationMins(DEFAULT_DURATION_MINS)
            .level(DEFAULT_LEVEL)
            .solution(DEFAULT_SOLUTION)
            .ansDiagram(DEFAULT_ANS_DIAGRAM)
            .ansDiagramContentType(DEFAULT_ANS_DIAGRAM_CONTENT_TYPE)
            .video(DEFAULT_VIDEO)
            .status(DEFAULT_STATUS);
        return question;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Question createUpdatedEntity(EntityManager em) {
        Question question = new Question()
            .question(UPDATED_QUESTION)
            .questionDiagram(UPDATED_QUESTION_DIAGRAM)
            .questionDiagramContentType(UPDATED_QUESTION_DIAGRAM_CONTENT_TYPE)
            .optionA(UPDATED_OPTION_A)
            .optionB(UPDATED_OPTION_B)
            .optionC(UPDATED_OPTION_C)
            .optionD(UPDATED_OPTION_D)
            .multiChoice(UPDATED_MULTI_CHOICE)
            .answer(UPDATED_ANSWER)
            .maxMarks(UPDATED_MAX_MARKS)
            .negativeMarks(UPDATED_NEGATIVE_MARKS)
            .durationMins(UPDATED_DURATION_MINS)
            .level(UPDATED_LEVEL)
            .solution(UPDATED_SOLUTION)
            .ansDiagram(UPDATED_ANS_DIAGRAM)
            .ansDiagramContentType(UPDATED_ANS_DIAGRAM_CONTENT_TYPE)
            .video(UPDATED_VIDEO)
            .status(UPDATED_STATUS);
        return question;
    }

    @BeforeEach
    public void initTest() {
        question = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuestion() throws Exception {
        int databaseSizeBeforeCreate = questionRepository.findAll().size();

        // Create the Question
        QuestionDTO questionDTO = questionMapper.toDto(question);
        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isCreated());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeCreate + 1);
        Question testQuestion = questionList.get(questionList.size() - 1);
        assertThat(testQuestion.getQuestion()).isEqualTo(DEFAULT_QUESTION);
        assertThat(testQuestion.getQuestionDiagram()).isEqualTo(DEFAULT_QUESTION_DIAGRAM);
        assertThat(testQuestion.getQuestionDiagramContentType()).isEqualTo(DEFAULT_QUESTION_DIAGRAM_CONTENT_TYPE);
        assertThat(testQuestion.getOptionA()).isEqualTo(DEFAULT_OPTION_A);
        assertThat(testQuestion.getOptionB()).isEqualTo(DEFAULT_OPTION_B);
        assertThat(testQuestion.getOptionC()).isEqualTo(DEFAULT_OPTION_C);
        assertThat(testQuestion.getOptionD()).isEqualTo(DEFAULT_OPTION_D);
        assertThat(testQuestion.isMultiChoice()).isEqualTo(DEFAULT_MULTI_CHOICE);
        assertThat(testQuestion.getAnswer()).isEqualTo(DEFAULT_ANSWER);
        assertThat(testQuestion.getMaxMarks()).isEqualTo(DEFAULT_MAX_MARKS);
        assertThat(testQuestion.getNegativeMarks()).isEqualTo(DEFAULT_NEGATIVE_MARKS);
        assertThat(testQuestion.getDurationMins()).isEqualTo(DEFAULT_DURATION_MINS);
        assertThat(testQuestion.getLevel()).isEqualTo(DEFAULT_LEVEL);
        assertThat(testQuestion.getSolution()).isEqualTo(DEFAULT_SOLUTION);
        assertThat(testQuestion.getAnsDiagram()).isEqualTo(DEFAULT_ANS_DIAGRAM);
        assertThat(testQuestion.getAnsDiagramContentType()).isEqualTo(DEFAULT_ANS_DIAGRAM_CONTENT_TYPE);
        assertThat(testQuestion.getVideo()).isEqualTo(DEFAULT_VIDEO);
        assertThat(testQuestion.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createQuestionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = questionRepository.findAll().size();

        // Create the Question with an existing ID
        question.setId(1L);
        QuestionDTO questionDTO = questionMapper.toDto(question);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkOptionAIsRequired() throws Exception {
        int databaseSizeBeforeTest = questionRepository.findAll().size();
        // set the field null
        question.setOptionA(null);

        // Create the Question, which fails.
        QuestionDTO questionDTO = questionMapper.toDto(question);

        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isBadRequest());

        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOptionBIsRequired() throws Exception {
        int databaseSizeBeforeTest = questionRepository.findAll().size();
        // set the field null
        question.setOptionB(null);

        // Create the Question, which fails.
        QuestionDTO questionDTO = questionMapper.toDto(question);

        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isBadRequest());

        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMultiChoiceIsRequired() throws Exception {
        int databaseSizeBeforeTest = questionRepository.findAll().size();
        // set the field null
        question.setMultiChoice(null);

        // Create the Question, which fails.
        QuestionDTO questionDTO = questionMapper.toDto(question);

        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isBadRequest());

        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAnswerIsRequired() throws Exception {
        int databaseSizeBeforeTest = questionRepository.findAll().size();
        // set the field null
        question.setAnswer(null);

        // Create the Question, which fails.
        QuestionDTO questionDTO = questionMapper.toDto(question);

        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isBadRequest());

        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMaxMarksIsRequired() throws Exception {
        int databaseSizeBeforeTest = questionRepository.findAll().size();
        // set the field null
        question.setMaxMarks(null);

        // Create the Question, which fails.
        QuestionDTO questionDTO = questionMapper.toDto(question);

        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isBadRequest());

        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDurationMinsIsRequired() throws Exception {
        int databaseSizeBeforeTest = questionRepository.findAll().size();
        // set the field null
        question.setDurationMins(null);

        // Create the Question, which fails.
        QuestionDTO questionDTO = questionMapper.toDto(question);

        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isBadRequest());

        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLevelIsRequired() throws Exception {
        int databaseSizeBeforeTest = questionRepository.findAll().size();
        // set the field null
        question.setLevel(null);

        // Create the Question, which fails.
        QuestionDTO questionDTO = questionMapper.toDto(question);

        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isBadRequest());

        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = questionRepository.findAll().size();
        // set the field null
        question.setStatus(null);

        // Create the Question, which fails.
        QuestionDTO questionDTO = questionMapper.toDto(question);

        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isBadRequest());

        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllQuestions() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList
        restQuestionMockMvc.perform(get("/api/questions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(question.getId().intValue())))
            .andExpect(jsonPath("$.[*].question").value(hasItem(DEFAULT_QUESTION.toString())))
            .andExpect(jsonPath("$.[*].questionDiagramContentType").value(hasItem(DEFAULT_QUESTION_DIAGRAM_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].questionDiagram").value(hasItem(Base64Utils.encodeToString(DEFAULT_QUESTION_DIAGRAM))))
            .andExpect(jsonPath("$.[*].optionA").value(hasItem(DEFAULT_OPTION_A.toString())))
            .andExpect(jsonPath("$.[*].optionB").value(hasItem(DEFAULT_OPTION_B.toString())))
            .andExpect(jsonPath("$.[*].optionC").value(hasItem(DEFAULT_OPTION_C.toString())))
            .andExpect(jsonPath("$.[*].optionD").value(hasItem(DEFAULT_OPTION_D.toString())))
            .andExpect(jsonPath("$.[*].multiChoice").value(hasItem(DEFAULT_MULTI_CHOICE.booleanValue())))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER.toString())))
            .andExpect(jsonPath("$.[*].maxMarks").value(hasItem(DEFAULT_MAX_MARKS)))
            .andExpect(jsonPath("$.[*].negativeMarks").value(hasItem(DEFAULT_NEGATIVE_MARKS)))
            .andExpect(jsonPath("$.[*].durationMins").value(hasItem(DEFAULT_DURATION_MINS)))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL.toString())))
            .andExpect(jsonPath("$.[*].solution").value(hasItem(DEFAULT_SOLUTION.toString())))
            .andExpect(jsonPath("$.[*].ansDiagramContentType").value(hasItem(DEFAULT_ANS_DIAGRAM_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].ansDiagram").value(hasItem(Base64Utils.encodeToString(DEFAULT_ANS_DIAGRAM))))
            .andExpect(jsonPath("$.[*].video").value(hasItem(DEFAULT_VIDEO.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllQuestionsWithEagerRelationshipsIsEnabled() throws Exception {
        QuestionResource questionResource = new QuestionResource(questionServiceMock);
        when(questionServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restQuestionMockMvc = MockMvcBuilders.standaloneSetup(questionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restQuestionMockMvc.perform(get("/api/questions?eagerload=true"))
        .andExpect(status().isOk());

        verify(questionServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllQuestionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        QuestionResource questionResource = new QuestionResource(questionServiceMock);
            when(questionServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restQuestionMockMvc = MockMvcBuilders.standaloneSetup(questionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restQuestionMockMvc.perform(get("/api/questions?eagerload=true"))
        .andExpect(status().isOk());

            verify(questionServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getQuestion() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get the question
        restQuestionMockMvc.perform(get("/api/questions/{id}", question.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(question.getId().intValue()))
            .andExpect(jsonPath("$.question").value(DEFAULT_QUESTION.toString()))
            .andExpect(jsonPath("$.questionDiagramContentType").value(DEFAULT_QUESTION_DIAGRAM_CONTENT_TYPE))
            .andExpect(jsonPath("$.questionDiagram").value(Base64Utils.encodeToString(DEFAULT_QUESTION_DIAGRAM)))
            .andExpect(jsonPath("$.optionA").value(DEFAULT_OPTION_A.toString()))
            .andExpect(jsonPath("$.optionB").value(DEFAULT_OPTION_B.toString()))
            .andExpect(jsonPath("$.optionC").value(DEFAULT_OPTION_C.toString()))
            .andExpect(jsonPath("$.optionD").value(DEFAULT_OPTION_D.toString()))
            .andExpect(jsonPath("$.multiChoice").value(DEFAULT_MULTI_CHOICE.booleanValue()))
            .andExpect(jsonPath("$.answer").value(DEFAULT_ANSWER.toString()))
            .andExpect(jsonPath("$.maxMarks").value(DEFAULT_MAX_MARKS))
            .andExpect(jsonPath("$.negativeMarks").value(DEFAULT_NEGATIVE_MARKS))
            .andExpect(jsonPath("$.durationMins").value(DEFAULT_DURATION_MINS))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL.toString()))
            .andExpect(jsonPath("$.solution").value(DEFAULT_SOLUTION.toString()))
            .andExpect(jsonPath("$.ansDiagramContentType").value(DEFAULT_ANS_DIAGRAM_CONTENT_TYPE))
            .andExpect(jsonPath("$.ansDiagram").value(Base64Utils.encodeToString(DEFAULT_ANS_DIAGRAM)))
            .andExpect(jsonPath("$.video").value(DEFAULT_VIDEO.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingQuestion() throws Exception {
        // Get the question
        restQuestionMockMvc.perform(get("/api/questions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuestion() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        int databaseSizeBeforeUpdate = questionRepository.findAll().size();

        // Update the question
        Question updatedQuestion = questionRepository.findById(question.getId()).get();
        // Disconnect from session so that the updates on updatedQuestion are not directly saved in db
        em.detach(updatedQuestion);
        updatedQuestion
            .question(UPDATED_QUESTION)
            .questionDiagram(UPDATED_QUESTION_DIAGRAM)
            .questionDiagramContentType(UPDATED_QUESTION_DIAGRAM_CONTENT_TYPE)
            .optionA(UPDATED_OPTION_A)
            .optionB(UPDATED_OPTION_B)
            .optionC(UPDATED_OPTION_C)
            .optionD(UPDATED_OPTION_D)
            .multiChoice(UPDATED_MULTI_CHOICE)
            .answer(UPDATED_ANSWER)
            .maxMarks(UPDATED_MAX_MARKS)
            .negativeMarks(UPDATED_NEGATIVE_MARKS)
            .durationMins(UPDATED_DURATION_MINS)
            .level(UPDATED_LEVEL)
            .solution(UPDATED_SOLUTION)
            .ansDiagram(UPDATED_ANS_DIAGRAM)
            .ansDiagramContentType(UPDATED_ANS_DIAGRAM_CONTENT_TYPE)
            .video(UPDATED_VIDEO)
            .status(UPDATED_STATUS);
        QuestionDTO questionDTO = questionMapper.toDto(updatedQuestion);

        restQuestionMockMvc.perform(put("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isOk());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeUpdate);
        Question testQuestion = questionList.get(questionList.size() - 1);
        assertThat(testQuestion.getQuestion()).isEqualTo(UPDATED_QUESTION);
        assertThat(testQuestion.getQuestionDiagram()).isEqualTo(UPDATED_QUESTION_DIAGRAM);
        assertThat(testQuestion.getQuestionDiagramContentType()).isEqualTo(UPDATED_QUESTION_DIAGRAM_CONTENT_TYPE);
        assertThat(testQuestion.getOptionA()).isEqualTo(UPDATED_OPTION_A);
        assertThat(testQuestion.getOptionB()).isEqualTo(UPDATED_OPTION_B);
        assertThat(testQuestion.getOptionC()).isEqualTo(UPDATED_OPTION_C);
        assertThat(testQuestion.getOptionD()).isEqualTo(UPDATED_OPTION_D);
        assertThat(testQuestion.isMultiChoice()).isEqualTo(UPDATED_MULTI_CHOICE);
        assertThat(testQuestion.getAnswer()).isEqualTo(UPDATED_ANSWER);
        assertThat(testQuestion.getMaxMarks()).isEqualTo(UPDATED_MAX_MARKS);
        assertThat(testQuestion.getNegativeMarks()).isEqualTo(UPDATED_NEGATIVE_MARKS);
        assertThat(testQuestion.getDurationMins()).isEqualTo(UPDATED_DURATION_MINS);
        assertThat(testQuestion.getLevel()).isEqualTo(UPDATED_LEVEL);
        assertThat(testQuestion.getSolution()).isEqualTo(UPDATED_SOLUTION);
        assertThat(testQuestion.getAnsDiagram()).isEqualTo(UPDATED_ANS_DIAGRAM);
        assertThat(testQuestion.getAnsDiagramContentType()).isEqualTo(UPDATED_ANS_DIAGRAM_CONTENT_TYPE);
        assertThat(testQuestion.getVideo()).isEqualTo(UPDATED_VIDEO);
        assertThat(testQuestion.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingQuestion() throws Exception {
        int databaseSizeBeforeUpdate = questionRepository.findAll().size();

        // Create the Question
        QuestionDTO questionDTO = questionMapper.toDto(question);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestionMockMvc.perform(put("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuestion() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        int databaseSizeBeforeDelete = questionRepository.findAll().size();

        // Delete the question
        restQuestionMockMvc.perform(delete("/api/questions/{id}", question.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Question.class);
        Question question1 = new Question();
        question1.setId(1L);
        Question question2 = new Question();
        question2.setId(question1.getId());
        assertThat(question1).isEqualTo(question2);
        question2.setId(2L);
        assertThat(question1).isNotEqualTo(question2);
        question1.setId(null);
        assertThat(question1).isNotEqualTo(question2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuestionDTO.class);
        QuestionDTO questionDTO1 = new QuestionDTO();
        questionDTO1.setId(1L);
        QuestionDTO questionDTO2 = new QuestionDTO();
        assertThat(questionDTO1).isNotEqualTo(questionDTO2);
        questionDTO2.setId(questionDTO1.getId());
        assertThat(questionDTO1).isEqualTo(questionDTO2);
        questionDTO2.setId(2L);
        assertThat(questionDTO1).isNotEqualTo(questionDTO2);
        questionDTO1.setId(null);
        assertThat(questionDTO1).isNotEqualTo(questionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(questionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(questionMapper.fromId(null)).isNull();
    }
}
