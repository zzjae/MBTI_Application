package org.zzjae.mbti.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MbtiReqUpdate {
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
