package org.zzjae.mbti.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zzjae.mbti.domain.Mbti;
import org.zzjae.mbti.domain.MbtiReqAdd;
import org.zzjae.mbti.domain.MbtiReqUpdate;
import org.zzjae.mbti.domain.MbtiResponse;
import org.zzjae.mbti.mapper.MbtiMapper;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MbtiService {
    @Autowired
    final MbtiMapper mbtiMapper;

    //member의 u_id로 mbti 가장 최근 정보 조회
    public Mbti findRecentMbtiByUId(int u_id){
        return mbtiMapper.findRecentMbtiByUId(u_id);
    }

    //member의 u_id로 mbti 정보 조회
    public Mbti findMbtiByUId(int u_id){
        return mbtiMapper.findMbtiByUId(u_id);
    }

    //member의 u_id로 mbti 정보 조회 input_date를 기준으로 10개만
    public ArrayList<Mbti> findMbtiByUIdLimit(int u_id){
        return mbtiMapper.findMbtiByUIdLimit(u_id);
    }

    //멤버의 MBTI 추가
    public int add(int u_id){
        return mbtiMapper.addMbti(u_id);
    }

    //멤버의 MBTI 수정
    @Transactional
    public int update(int m_id, int u_id, MbtiReqUpdate request) {
        Mbti mbti = mbtiMapper.findByIds(m_id, u_id);

        mbti.setIe(request.getIe());
        mbti.setSn(request.getSn());
        mbti.setTf(request.getTf());
        mbti.setJp(request.getJp());
        mbti.setIe_percent(request.getIe_percent());
        mbti.setSn_percent(request.getSn_percent());
        mbti.setTf_percent(request.getTf_percent());
        mbti.setJp_percent(request.getJp_percent());
        mbti.setInput_date(request.getInput_date());

        int updateCnt = mbtiMapper.updateMbti(mbti);
        return updateCnt;
    }
}
