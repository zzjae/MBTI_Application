package org.zzjae.question.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
public class Question implements Serializable {

    private int q_id;
    private String question_text;
    private String dimension;
}
