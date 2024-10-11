package org.zzjae.answer.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DimensionScore {
    private String ie;
    private String sn;
    private String tf;
    private String jp;
    private int ie_percent;
    private int sn_percent;
    private int tf_percent;
    private int jp_percent;
}
