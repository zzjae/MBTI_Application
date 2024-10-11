package org.zzjae.post.mapper;

import org.apache.ibatis.annotations.*;
import org.zzjae.post.domain.DisplayBoard;
import org.zzjae.post.domain.Post;
import org.zzjae.post.domain.PostReqAdd;
import org.zzjae.post.domain.PostReqUpdate;

import java.util.ArrayList;

@Mapper
public interface PostMapper {

    //모든 게시글
    @Select("select * from post")
    ArrayList<Post> findAll();

    //post_id로 조회
    @Select("select * from post where post_id = #{post_id}")
    Post findByPostId(int post_id);

    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.post_id = #{post_id}")
    DisplayBoard findByPostIdDisplay(int post_id);

    //board_type으로 조회
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.board_type = #{board_type}")
    ArrayList<DisplayBoard> findByBoardType(String board_type);

    //u_id로 조회
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.u_id = #{u_id}")
    ArrayList<DisplayBoard> findByUId(int u_id);

    //title로 조회
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.title = #{title}")
    ArrayList<DisplayBoard> findByTitle(String title);

    //post 추가
    @Insert("insert into post (board_type, title, content, post_date, u_id, views, comments) values (#{board_type},#{title},#{content},#{post_date},#{u_id},#{views},#{comments})")
    int addPost(PostReqAdd postReqAdd);

    //글 제목,내용,작성일 변경
    @Update("update post set title=#{title}, content = #{content}, post_date = #{post_date}  where post_id =#{post_id}")
    int updatePost(Post post);

    //뷰 증가
    @Update("update post set views = views + 1 where post_id = #{post_id}")
    int plusViews(int post_id);

    //댓글 수 반영
    @Update("UPDATE Post p " +
            "JOIN ( " +
            "SELECT post_id, COUNT(*) AS comment_count " +
            "FROM Comment " +
            "WHERE post_id = #{post_id} " + // 공백 추가
            "GROUP BY post_id " +
            ") c ON p.post_id = c.post_id " +
            "SET p.comments = c.comment_count " +
            "WHERE p.post_id = #{post_id}")
    int reflectionComments(int post_id);

    //게시글 삭제
    @Delete("delete from post where post_id=#{post_id}")
    int deleteByPostId(int post_id);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //board_type으로 조회 post_date기준 오름 차순
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.board_type = #{board_type} " +
            "ORDER BY p.post_date ASC")
    ArrayList<DisplayBoard> findByBoardTypeDateAsc(String board_type);
    //board_type으로 조회 post_date기준 내림 차순
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.board_type = #{board_type} " +
            "ORDER BY p.post_date DESC")
    ArrayList<DisplayBoard> findByBoardTypeDateDesc(String board_type);
    //board_type으로 조회 views기준 오름 차순
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.board_type = #{board_type} " +
            "ORDER BY p.views ASC")
    ArrayList<DisplayBoard> findByBoardTypeViewsAsc(String board_type);
    //board_type으로 조회 views기준 내림 차순
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.board_type = #{board_type} " +
            "ORDER BY p.views DESC")
    ArrayList<DisplayBoard> findByBoardTypeViewsDesc(String board_type);
    //board_type으로 조회 comments기준 오름 차순
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.board_type = #{board_type} " +
            "ORDER BY p.comments ASC")
    ArrayList<DisplayBoard> findByBoardTypeCommentsAsc(String board_type);
    //board_type으로 조회 comments기준 내림 차순
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.board_type = #{board_type} " +
            "ORDER BY p.comments DESC")
    ArrayList<DisplayBoard> findByBoardTypeCommentsDesc(String board_type);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //u_id로 조회 post_date기준 오름 차순
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.u_id = #{u_id} " +
            "ORDER BY p.post_date ASC")
    ArrayList<DisplayBoard> findByUIdDateAsc(int u_id);
    //u_id로 조회 post_date기준 내림 차순
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.u_id = #{u_id} " +
            "ORDER BY p.post_date DESC")
    ArrayList<DisplayBoard> findByUIdDateDesc(int u_id);
    //u_id로 조회 views기준 오름 차순
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.u_id = #{u_id} " +
            "ORDER BY p.views ASC")
    ArrayList<DisplayBoard> findByUIdViewsAsc(int u_id);
    //u_id로 조회 views기준 내림 차순
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.u_id = #{u_id} " +
            "ORDER BY p.views DESC")
    ArrayList<DisplayBoard> findByUIdViewsDesc(int u_id);
    //u_id로 조회 comments기준 오름 차순
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.u_id = #{u_id} " +
            "ORDER BY p.comments ASC")
    ArrayList<DisplayBoard> findByUIdCommentsAsc(int u_id);
    //u_id로 조회 comments기준 내림 차순
    @Select("SELECT p.post_id, p.board_type, p.title, p.content, p.views, p.comments, p.post_date, m.nickname, p.views, p.comments " +
            "FROM Post p " +
            "JOIN Member m ON p.u_id = m.u_id " +
            "WHERE p.u_id = #{u_id} " +
            "ORDER BY p.comments DESC")
    ArrayList<DisplayBoard> findByUIdCommentsDesc(int u_id);
}
