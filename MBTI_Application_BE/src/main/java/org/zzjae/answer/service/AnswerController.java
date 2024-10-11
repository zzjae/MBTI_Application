package org.zzjae.answer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zzjae.answer.domain.AnswerReqAdd;
import org.zzjae.answer.domain.DimensionScore;
import org.zzjae.answer.service.AnswerService;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RestController
public class AnswerController {

    @Autowired
    AnswerService answerService;

    @GetMapping("/test_result/{m_id}/{u_id}")
    public ResponseEntity<DimensionScore> getTestResult(@PathVariable("m_id") int m_id, @PathVariable("u_id") int u_id) {
        DimensionScore result = answerService.calculateDimensionScore(m_id, u_id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PostMapping("/answer")
    public ResponseEntity<String> addAnswers(@RequestBody List<AnswerReqAdd> requests) {
        try {
            answerService.addAllAnswers(requests);
            return new ResponseEntity<>("All answers added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to add answers", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

