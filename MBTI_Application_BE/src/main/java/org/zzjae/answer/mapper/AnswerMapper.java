package org.zzjae.answer.mapper;

import org.apache.ibatis.annotations.*;
import org.zzjae.answer.domain.Answer;
import org.zzjae.answer.domain.DimensionScore;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Mapper
public interface AnswerMapper {

    //answer와 question를 join해서 dimension 별로 스코어 합 구하기
    @Select("SELECT q.dimension, SUM(a.score) AS total_score " +
            "FROM Answer a " +
            "JOIN Question q ON a.q_id = q.q_id " +
            "WHERE a.u_id = #{u_id} AND a.m_id = #{m_id} " +
            "GROUP BY q.dimension " +
            "ORDER BY FIELD(q.dimension, 'i', 'e', 's', 'n', 't', 'f', 'j', 'p')")
    List<Map<String, Object>> findResult(int m_id, int u_id);

    //새로운 답변 추가
    @Insert("insert into answer (q_id, m_id, u_id, score) values (#{q_id},#{m_id},#{u_id},#{score})")
    int addAnswer(Answer answer);

}
