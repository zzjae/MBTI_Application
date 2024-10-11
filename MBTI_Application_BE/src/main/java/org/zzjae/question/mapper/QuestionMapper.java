package org.zzjae.question.mapper;

import org.apache.ibatis.annotations.*;
import org.zzjae.question.domain.Question;

import java.util.ArrayList;

@Mapper
public interface QuestionMapper {

    //모든 질문 조회
    @Select("select * from question")
    ArrayList<Question> findAll();

    //Dimension 에 따른 질문 조회
    @Select("select * from question where dimension = #{dimension}")
    ArrayList<Question> findByDimension(String dimension);

}
