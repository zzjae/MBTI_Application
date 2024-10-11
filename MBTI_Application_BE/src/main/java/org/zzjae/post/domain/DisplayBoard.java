package org.zzjae.post.domain;

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
public class DisplayBoard {
    private int post_id;
    private String board_type;
    private String title;
    private String content;
    private int views;
    private int comments;
    private LocalDateTime post_date;
    private String nickname;
}
