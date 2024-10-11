package org.zzjae.comment.domain;

import java.time.LocalDateTime;

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
public class DisplayComment implements Serializable{
    private int comment_id;
    private int post_id;
    //new
    private int u_id;
    private String content;
    private LocalDateTime comment_date;
    private String nickname;
}
