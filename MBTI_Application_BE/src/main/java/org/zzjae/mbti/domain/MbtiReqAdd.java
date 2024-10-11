package org.zzjae.mbti.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MbtiReqAdd {

    private int u_id;

    public Mbti toEntity(){
        return Mbti.builder()
                .u_id(u_id)
                .ie(null)
                .sn(null)
                .tf(null)
                .jp(null)
                .ie_percent(0)
                .sn_percent(0)
                .tf_percent(0)
                .jp_percent(0)
                .build();
    }
}
