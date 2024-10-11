package org.zzjae.post.domain;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostResponse {
    private int post_id;
    private String board_type;
    private String title;
    private String content;
    private int views;
    private int comments;
    private LocalDateTime post_date;
    private int u_id;

    public PostResponse(Post post){
        this.post_id = post.getPost_id();
        this.board_type = post.getBoard_type();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.views = post.getViews();
        this.comments = post.getComments();
        this.post_date = post.getPost_date();
        this.u_id = post.getPost_id();
    }
}
