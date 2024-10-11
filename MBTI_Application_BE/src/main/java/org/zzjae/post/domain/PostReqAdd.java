package org.zzjae.post.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PostReqAdd {
    private String board_type;
    private String title;
    private String content;
    private LocalDateTime post_date;
    private int u_id;
    private int views = 0;
    private int comments = 0;

    public Post toEntity(){
        return Post.builder()
                .board_type(board_type)
                .title(title)
                .content(content)
                .post_date(post_date)
                .u_id(u_id)
                .views(views)
                .comments(comments)
                .build();
    }
}
