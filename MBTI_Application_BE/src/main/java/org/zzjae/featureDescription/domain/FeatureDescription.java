package org.zzjae.featureDescription.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
public class FeatureDescription {
    private String mbti;
    private String subNickName;
    private String short_description;
    private String feature;
    private String advantages;
    private String disAdvantages;
}
