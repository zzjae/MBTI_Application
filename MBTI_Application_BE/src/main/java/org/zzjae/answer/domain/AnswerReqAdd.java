package org.zzjae.answer.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AnswerReqAdd {
    private int m_id;
    private int q_id;
    private int u_id;
    private int score;
    public Answer toEntity(){
        return Answer.builder()
                .m_id(m_id)
                .q_id(q_id)
                .u_id(u_id)
                .score(score)
                .build();
    }
}
