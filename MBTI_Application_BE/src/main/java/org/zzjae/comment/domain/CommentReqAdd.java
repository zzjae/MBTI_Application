package org.zzjae.comment.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CommentReqAdd {
    private int post_id;
    private int u_id;
    private String content;
    private LocalDateTime comment_date;

    public Comment toEntity(){
        return Comment.builder()
                .post_id(post_id)
                .u_id(u_id)
                .content(content)
                .comment_date(comment_date)
                .build();
    }
}
