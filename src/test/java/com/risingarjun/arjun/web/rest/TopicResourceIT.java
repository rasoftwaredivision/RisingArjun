package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingarjunApp;
import com.risingarjun.arjun.domain.Topic;
import com.risingarjun.arjun.repository.TopicRepository;
import com.risingarjun.arjun.service.TopicService;
import com.risingarjun.arjun.service.dto.TopicDTO;
import com.risingarjun.arjun.service.mapper.TopicMapper;
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
 * Integration tests for the {@Link TopicResource} REST controller.
 */
@SpringBootTest(classes = RisingarjunApp.class)
public class TopicResourceIT {

    private static final String DEFAULT_TOPIC_ID = "AAAAAAAAAA";
    private static final String UPDATED_TOPIC_ID = "BBBBBBBBBB";

    private static final String DEFAULT_TOPIC_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TOPIC_TITLE = "BBBBBBBBBB";

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private TopicMapper topicMapper;

    @Autowired
    private TopicService topicService;

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

    private MockMvc restTopicMockMvc;

    private Topic topic;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TopicResource topicResource = new TopicResource(topicService);
        this.restTopicMockMvc = MockMvcBuilders.standaloneSetup(topicResource)
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
    public static Topic createEntity(EntityManager em) {
        Topic topic = new Topic()
            .topicId(DEFAULT_TOPIC_ID)
            .topicTitle(DEFAULT_TOPIC_TITLE);
        return topic;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Topic createUpdatedEntity(EntityManager em) {
        Topic topic = new Topic()
            .topicId(UPDATED_TOPIC_ID)
            .topicTitle(UPDATED_TOPIC_TITLE);
        return topic;
    }

    @BeforeEach
    public void initTest() {
        topic = createEntity(em);
    }

    @Test
    @Transactional
    public void createTopic() throws Exception {
        int databaseSizeBeforeCreate = topicRepository.findAll().size();

        // Create the Topic
        TopicDTO topicDTO = topicMapper.toDto(topic);
        restTopicMockMvc.perform(post("/api/topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(topicDTO)))
            .andExpect(status().isCreated());

        // Validate the Topic in the database
        List<Topic> topicList = topicRepository.findAll();
        assertThat(topicList).hasSize(databaseSizeBeforeCreate + 1);
        Topic testTopic = topicList.get(topicList.size() - 1);
        assertThat(testTopic.getTopicId()).isEqualTo(DEFAULT_TOPIC_ID);
        assertThat(testTopic.getTopicTitle()).isEqualTo(DEFAULT_TOPIC_TITLE);
    }

    @Test
    @Transactional
    public void createTopicWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = topicRepository.findAll().size();

        // Create the Topic with an existing ID
        topic.setId(1L);
        TopicDTO topicDTO = topicMapper.toDto(topic);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTopicMockMvc.perform(post("/api/topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(topicDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Topic in the database
        List<Topic> topicList = topicRepository.findAll();
        assertThat(topicList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTopicIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = topicRepository.findAll().size();
        // set the field null
        topic.setTopicId(null);

        // Create the Topic, which fails.
        TopicDTO topicDTO = topicMapper.toDto(topic);

        restTopicMockMvc.perform(post("/api/topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(topicDTO)))
            .andExpect(status().isBadRequest());

        List<Topic> topicList = topicRepository.findAll();
        assertThat(topicList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTopics() throws Exception {
        // Initialize the database
        topicRepository.saveAndFlush(topic);

        // Get all the topicList
        restTopicMockMvc.perform(get("/api/topics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(topic.getId().intValue())))
            .andExpect(jsonPath("$.[*].topicId").value(hasItem(DEFAULT_TOPIC_ID.toString())))
            .andExpect(jsonPath("$.[*].topicTitle").value(hasItem(DEFAULT_TOPIC_TITLE.toString())));
    }
    
    @Test
    @Transactional
    public void getTopic() throws Exception {
        // Initialize the database
        topicRepository.saveAndFlush(topic);

        // Get the topic
        restTopicMockMvc.perform(get("/api/topics/{id}", topic.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(topic.getId().intValue()))
            .andExpect(jsonPath("$.topicId").value(DEFAULT_TOPIC_ID.toString()))
            .andExpect(jsonPath("$.topicTitle").value(DEFAULT_TOPIC_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTopic() throws Exception {
        // Get the topic
        restTopicMockMvc.perform(get("/api/topics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTopic() throws Exception {
        // Initialize the database
        topicRepository.saveAndFlush(topic);

        int databaseSizeBeforeUpdate = topicRepository.findAll().size();

        // Update the topic
        Topic updatedTopic = topicRepository.findById(topic.getId()).get();
        // Disconnect from session so that the updates on updatedTopic are not directly saved in db
        em.detach(updatedTopic);
        updatedTopic
            .topicId(UPDATED_TOPIC_ID)
            .topicTitle(UPDATED_TOPIC_TITLE);
        TopicDTO topicDTO = topicMapper.toDto(updatedTopic);

        restTopicMockMvc.perform(put("/api/topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(topicDTO)))
            .andExpect(status().isOk());

        // Validate the Topic in the database
        List<Topic> topicList = topicRepository.findAll();
        assertThat(topicList).hasSize(databaseSizeBeforeUpdate);
        Topic testTopic = topicList.get(topicList.size() - 1);
        assertThat(testTopic.getTopicId()).isEqualTo(UPDATED_TOPIC_ID);
        assertThat(testTopic.getTopicTitle()).isEqualTo(UPDATED_TOPIC_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingTopic() throws Exception {
        int databaseSizeBeforeUpdate = topicRepository.findAll().size();

        // Create the Topic
        TopicDTO topicDTO = topicMapper.toDto(topic);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTopicMockMvc.perform(put("/api/topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(topicDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Topic in the database
        List<Topic> topicList = topicRepository.findAll();
        assertThat(topicList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTopic() throws Exception {
        // Initialize the database
        topicRepository.saveAndFlush(topic);

        int databaseSizeBeforeDelete = topicRepository.findAll().size();

        // Delete the topic
        restTopicMockMvc.perform(delete("/api/topics/{id}", topic.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Topic> topicList = topicRepository.findAll();
        assertThat(topicList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Topic.class);
        Topic topic1 = new Topic();
        topic1.setId(1L);
        Topic topic2 = new Topic();
        topic2.setId(topic1.getId());
        assertThat(topic1).isEqualTo(topic2);
        topic2.setId(2L);
        assertThat(topic1).isNotEqualTo(topic2);
        topic1.setId(null);
        assertThat(topic1).isNotEqualTo(topic2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TopicDTO.class);
        TopicDTO topicDTO1 = new TopicDTO();
        topicDTO1.setId(1L);
        TopicDTO topicDTO2 = new TopicDTO();
        assertThat(topicDTO1).isNotEqualTo(topicDTO2);
        topicDTO2.setId(topicDTO1.getId());
        assertThat(topicDTO1).isEqualTo(topicDTO2);
        topicDTO2.setId(2L);
        assertThat(topicDTO1).isNotEqualTo(topicDTO2);
        topicDTO1.setId(null);
        assertThat(topicDTO1).isNotEqualTo(topicDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(topicMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(topicMapper.fromId(null)).isNull();
    }
}
