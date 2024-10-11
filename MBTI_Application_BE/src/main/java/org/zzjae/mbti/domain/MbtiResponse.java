package org.zzjae.mbti.domain;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MbtiResponse{
    private final int m_id;
    private final int u_id;

    private final String ie;
    private final String sn;
    private final String tf;
    private final String jp;

    private final int ie_percent;
    private final int sn_percent;
    private final int tf_percent;
    private final int jp_percent;

    private final LocalDateTime input_date;

    public MbtiResponse(Mbti mbti){
        this.m_id = mbti.getM_id();
        this.u_id = mbti.getU_id();

        this.ie = mbti.getIe();
        this.sn = mbti.getSn();
        this.tf = mbti.getTf();
        this.jp = mbti.getJp();

        this.ie_percent = mbti.getIe_percent();
        this.sn_percent = mbti.getSn_percent();
        this.tf_percent = mbti.getTf_percent();
        this.jp_percent = mbti.getJp_percent();

        this.input_date = mbti.getInput_date();

    }
}
