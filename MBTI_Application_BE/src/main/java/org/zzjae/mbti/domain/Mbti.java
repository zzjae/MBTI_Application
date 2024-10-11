package org.zzjae.mbti.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
public class Mbti implements Serializable{
    private int m_id;
    private int u_id;

    private String ie;
    private String sn;
    private String tf;
    private String jp;

    private int ie_percent;
    private int sn_percent;
    private int tf_percent;
    private int jp_percent;

    private LocalDateTime input_date;
}
