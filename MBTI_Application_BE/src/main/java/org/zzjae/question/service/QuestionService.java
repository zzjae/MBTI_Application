package org.zzjae.question.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zzjae.question.domain.Question;
import org.zzjae.question.mapper.QuestionMapper;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class QuestionService {
    @Autowired
    final QuestionMapper questionMapper;

    //모든 질문 조회 찾기
    public ArrayList<Question> findAll(){
        return questionMapper.findAll();
    }
    //Dimension 에 따른 질문 조회
    public ArrayList<Question> findByDimension(String dimension){
        return questionMapper.findByDimension(dimension);
    }

}
