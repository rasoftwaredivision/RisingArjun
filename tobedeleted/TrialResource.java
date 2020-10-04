package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.TestpaperService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.TestpaperDTO;
import com.risingarjun.arjun.service.dto.QuestionDTO;
import com.risingarjun.arjun.domain.Question;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@RestController
@RequestMapping("/")
public class TrialResource {
	@Autowired
	public TestpaperService testpaperService;

	@PostMapping("gettest")
    public List<Question> getTest(@RequestBody TestpaperDTO testpaperDTO)
    {   
        return testpaperService.findQuestionsforTest(testpaperDTO);
    }


	}
