package org.zzjae.question.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zzjae.question.domain.Question;
import org.zzjae.question.mapper.QuestionMapper;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RestController
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @GetMapping("/question")
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.findAll();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("/question/{dimension}")
    public ResponseEntity<List<Question>> getQuestionsByDimension(@PathVariable String dimension) {
        List<Question> questions = questionService.findByDimension(dimension);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }
}
