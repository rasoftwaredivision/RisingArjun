package com.risingarjun.arjun.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.risingarjun.arjun.service.TestpaperService;
import com.risingarjun.arjun.service.dto.QuestionDTO;
import com.risingarjun.arjun.service.dto.TestpaperDTO;

@RestController
@RequestMapping("/")
public class TrialResource {
	private final Logger log = LoggerFactory.getLogger(TestpaperResource.class);

	@Autowired
	public TestpaperService testpaperService;
	
	@PostMapping("/questionsfortestpaper")
	public  List<QuestionDTO> getQuestionsForTestpaper(@RequestBody TestpaperDTO testpaperDTO) {
		log.debug("REST request to get gettest : {}", testpaperDTO);
		return testpaperService.findAllForTestPaper(testpaperDTO);
	}
}
