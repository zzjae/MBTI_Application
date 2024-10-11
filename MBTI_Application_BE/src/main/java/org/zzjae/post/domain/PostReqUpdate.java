package org.zzjae.post.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PostReqUpdate {
    private int post_id;
    private String title;
    private String content;
    private LocalDateTime post_date;
}
