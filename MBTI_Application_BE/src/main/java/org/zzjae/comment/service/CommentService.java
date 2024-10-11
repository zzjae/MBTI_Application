package org.zzjae.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zzjae.comment.domain.Comment;
import org.zzjae.comment.domain.CommentReqAdd;
import org.zzjae.comment.domain.CommentReqUpdate;
import org.zzjae.comment.domain.DisplayComment;
import org.zzjae.comment.mapper.CommentMapper;
import org.zzjae.post.domain.*;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CommentService {

    @Autowired
    final CommentMapper commentMapper;

    public Comment findComment(int comment_id){
        return commentMapper.findComment(comment_id);
    }
    //post_id로 해당 글에 달린 댓글 조회 ArrayList<DisplayComment>형태
    public ArrayList<DisplayComment> findAllCommentByPostId(int post_id){
        return commentMapper.findAllCommentByPostId(post_id);
    }

    //comment_id로 댓글 조회 DisplayComment 형태
    public DisplayComment findCommentByCommentId(int comment_id){
        return commentMapper.findCommentByCommentId(comment_id);
    }

    //댓글 추가
    public int addComment(CommentReqAdd request){
        return commentMapper.addComment(request);
    }

//    comment_id로 댓글 수정
    public int updateComment(int comment_id, CommentReqUpdate request){
        Comment comment = commentMapper.findComment(comment_id); //함수가 comment형태가 아님

        comment.setContent(request.getContent());
        comment.setComment_date(request.getComment_date());

        int updateCnt = commentMapper.updateComment(comment);
        return updateCnt;
    }


    //comment_id로 댓글 삭제
    public int deleteByCommentId(int comment_id){
        return commentMapper.deleteByCommentId(comment_id);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //post_id로 해당 글에 달린 댓글 조회 ArrayList<DisplayComment>형태 comment_date기준 오름 차순
    public ArrayList<DisplayComment> findAllCommentByPostIdDateAsc(int post_id){
        return commentMapper.findAllCommentByPostIdDateAsc(post_id);
    }
    //post_id로 해당 글에 달린 댓글 조회 ArrayList<DisplayComment>형태 comment_date기준 오름 차순
    public ArrayList<DisplayComment> findAllCommentByPostIdDateDesc(int post_id){
        return commentMapper.findAllCommentByPostIdDateDesc(post_id);
    }
}
