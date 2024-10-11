package org.zzjae.answer.domain;
import lombok.Getter;

@Getter
public class AnswerResponse {
    private final int m_id;
    private final int q_id;
    private final int u_id;
    private final int score;

    public AnswerResponse(Answer answer){
        this.m_id = answer.getM_id();
        this.q_id = answer.getQ_id();
        this.u_id = answer.getU_id();
        this.score = answer.getScore();

    }
}
