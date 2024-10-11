package org.zzjae.answer.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
public class Answer implements Serializable{

    private int m_id;
    private int q_id;
    private int u_id;
    private int score;
}
