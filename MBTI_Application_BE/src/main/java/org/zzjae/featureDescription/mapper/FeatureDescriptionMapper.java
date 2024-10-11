package org.zzjae.featureDescription.mapper;

import org.apache.ibatis.annotations.*;
import org.zzjae.featureDescription.domain.FeatureDescription;

import java.util.ArrayList;

@Mapper
public interface FeatureDescriptionMapper {

    //모든 mbti 특징 조회
    @Select("select * from featuredescription ORDER BY " +
            "CASE mbti " +
            "WHEN 'ISTJ' THEN 1 " +
            "WHEN 'ISFJ' THEN 2 " +
            "WHEN 'INFJ' THEN 3 " +
            "WHEN 'INTJ' THEN 4 " +
            "WHEN 'ISTP' THEN 5 " +
            "WHEN 'ISFP' THEN 6 " +
            "WHEN 'INFP' THEN 7 " +
            "WHEN 'INTP' THEN 8 " +
            "WHEN 'ESTP' THEN 9 " +
            "WHEN 'ESFP' THEN 10 " +
            "WHEN 'ENFP' THEN 11 " +
            "WHEN 'ENTP' THEN 12 " +
            "WHEN 'ESTJ' THEN 13 " +
            "WHEN 'ESFJ' THEN 14 " +
            "WHEN 'ENFJ' THEN 15 " +
            "WHEN 'ENTJ' THEN 16 " +
            "END ASC")
    ArrayList<FeatureDescription> findAll();

    //mbti 에 따른 mbti 특징 조회
    @Select("select * from featuredescription where mbti = #{mbti}")
    ArrayList<FeatureDescription> findByMbti(String mbti);
}
