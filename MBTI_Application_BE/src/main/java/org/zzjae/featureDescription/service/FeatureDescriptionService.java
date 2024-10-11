package org.zzjae.featureDescription.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zzjae.featureDescription.domain.FeatureDescription;
import org.zzjae.featureDescription.mapper.FeatureDescriptionMapper;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor

public class FeatureDescriptionService {
    @Autowired
    final FeatureDescriptionMapper featureDescriptionMapper;

    //모든 mbti 특징 조회
    public ArrayList<FeatureDescription> findAll(){
        return featureDescriptionMapper.findAll();
    }
    //mbti 에 따른 mbti 특징 조회
    public ArrayList<FeatureDescription> findByMbti(String mbti){
        return featureDescriptionMapper.findByMbti(mbti);
    }
}
