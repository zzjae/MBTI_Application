package org.zzjae.comment.domain;

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
public class Comment implements Serializable {
    private int comment_id;
    private int post_id;
    private int u_id;
    private String content;
    private LocalDateTime comment_date;
}
