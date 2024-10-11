package org.zzjae.comment.domain;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentResponse {
    private int comment_id;
    private int post_id;
    private int u_id;
    private String content;
    private LocalDateTime comment_date;

    public CommentResponse(Comment comment){
        this.comment_id = comment.getComment_id();
        this.post_id = comment.getPost_id();
        this.u_id = comment.getU_id();
        this.content = comment.getContent();
        this.comment_date = comment.getComment_date();
    }
}
