package org.zzjae.comment.mapper;

import org.apache.ibatis.annotations.*;
import org.zzjae.comment.domain.Comment;
import org.zzjae.comment.domain.CommentReqAdd;
import org.zzjae.comment.domain.DisplayComment;


import java.util.ArrayList;

@Mapper
public interface CommentMapper {

    //comment 형태로 조회 해야됨
    @Select("select * from comment where comment_id = #{comment_id}")
    Comment findComment(int comment_id);

    //post_id로 해당 글에 달린 댓글 조회 ArrayList<DisplayComment>형태
    @Select("SELECT c.comment_id, c.post_id, c.u_id, c.content, c.comment_date, m.nickname " +
            "FROM Comment c " +
            "JOIN Member m ON c.u_id = m.u_id " +
            "WHERE c.post_id = #{post_id}")
    ArrayList<DisplayComment> findAllCommentByPostId(int post_id);

    //comment_id로 댓글 조회 DisplayComment 형태
    @Select("SELECT c.comment_id, c.post_id, c.u_id, c.content, c.comment_date, m.nickname " +
            "FROM Comment c " +
            "JOIN Member m ON c.u_id = m.u_id " +
            "WHERE c.comment_id = #{comment_id}")
    DisplayComment findCommentByCommentId(int comment_id);

    //댓글 추가
    @Insert("insert into comment (post_id, u_id, content, comment_date) values (#{post_id}, #{u_id}, #{content}, #{comment_date})")
    int addComment(CommentReqAdd commentReqAdd);

    //comment_id로 댓글 수정
    @Update("update comment set content = #{content}, comment_date = #{comment_date}  where comment_id =#{comment_id}")
    int updateComment(Comment comment);

    //comment_id로 댓글 삭제
    @Delete("delete from comment where comment_id = #{comment_id}")
    int deleteByCommentId(int comment_id);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //post_id로 해당 글에 달린 댓글 조회 ArrayList<DisplayComment>형태 comment_date기준 오름 차순
    @Select("SELECT c.comment_id, c.post_id, c.u_id, c.content, c.comment_date, m.nickname " +
            "FROM Comment c " +
            "JOIN Member m ON c.u_id = m.u_id " +
            "WHERE c.post_id = #{post_id} " +
            "ORDER BY c.comment_date ASC")
    ArrayList<DisplayComment> findAllCommentByPostIdDateAsc(int post_id);
    //post_id로 해당 글에 달린 댓글 조회 ArrayList<DisplayComment>형태 comment_date기준 내림 차순
    @Select("SELECT c.comment_id, c.post_id, c.u_id, c.content, c.comment_date, m.nickname " +
            "FROM Comment c " +
            "JOIN Member m ON c.u_id = m.u_id " +
            "WHERE c.post_id = #{post_id} " +
            "ORDER BY c.comment_date DESC")
    ArrayList<DisplayComment> findAllCommentByPostIdDateDesc(int post_id);
    
}
