package org.zzjae.post.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zzjae.post.domain.*;
import org.zzjae.post.mapper.PostMapper;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class PostService {

    @Autowired
    final PostMapper postMapper;

    //모든 게시글 조회
    public ArrayList<Post> findAll(){
        return postMapper.findAll();
    }

    //post_id로 조회
    public Post findByPostId(int post_id){
        return postMapper.findByPostId(post_id);
    }

    //post_id로 조회 display형태
    public DisplayBoard findByPostIdDisplay(int post_id){
        return postMapper.findByPostIdDisplay(post_id);
    }

    //board_type으로 조회
    public ArrayList<DisplayBoard> findByBoardType(String board_type){
        return postMapper.findByBoardType(board_type);
    }

    //u_id로 조회
    public ArrayList<DisplayBoard> findByUId(int u_id){
        return postMapper.findByUId(u_id);
    }

    //title로 조회
    public ArrayList<DisplayBoard> findByTitle(String title){
        return postMapper.findByTitle(title);
    }

    //post 추가
    public int addPost(PostReqAdd request){
        return postMapper.addPost(request);
    }

    //글 제목,내용,작성일 변경
    public int updatePost(int post_id, PostReqUpdate request){
        Post post = postMapper.findByPostId(post_id);

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setPost_date(request.getPost_date());

        int updateCnt = postMapper.updatePost(post);
        return updateCnt;
    }

    //views 증가
    public int plusViews(int post_id){
        int plusViewsCnt = postMapper.plusViews(post_id);
        return plusViewsCnt;
    }

    //comments 반영
    public int reflectionComments(int post_id){
        int reflectionCommentsCnt = postMapper.reflectionComments(post_id);
        return reflectionCommentsCnt;
    }

    //게시글 삭제
    public int deleteByPostId(int post_id){
        return postMapper.deleteByPostId(post_id);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //board_type으로 조회 post_date기준 오름 차순
    public ArrayList<DisplayBoard> findByBoardTypeDateAsc(String board_type){
        return postMapper.findByBoardTypeDateAsc(board_type);
    }
    //board_type으로 조회 post_date기준 내림 차순
    public ArrayList<DisplayBoard> findByBoardTypeDateDesc(String board_type){
        return postMapper.findByBoardTypeDateDesc(board_type);
    }
    //board_type으로 조회 views기준 오름 차순
    public ArrayList<DisplayBoard> findByBoardTypeViewsAsc(String board_type){
        return postMapper.findByBoardTypeViewsAsc(board_type);
    }
    //board_type으로 조회 views기준 내림 차순
    public ArrayList<DisplayBoard> findByBoardTypeViewsDesc(String board_type){
        return postMapper.findByBoardTypeViewsDesc(board_type);
    }
    //board_type으로 조회 comments기준 오름 차순
    public ArrayList<DisplayBoard> findByBoardTypeCommentsAsc(String board_type){
        return postMapper.findByBoardTypeCommentsAsc(board_type);
    }
    //board_type으로 조회 comments기준 내림 차순
    public ArrayList<DisplayBoard> findByBoardTypeCommentsDesc(String board_type){
        return postMapper.findByBoardTypeCommentsDesc(board_type);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //u_id로 조회 post_date기준 오름 차순
    public ArrayList<DisplayBoard> findByUIdDateAsc(int u_id){
        return postMapper.findByUIdDateAsc(u_id);
    }
    //u_id로 조회 post_date기준 내림 차순
    public ArrayList<DisplayBoard> findByUIdDateDesc(int u_id){
        return postMapper.findByUIdDateDesc(u_id);
    }
    //u_id로 조회 views기준 오름 차순
    public ArrayList<DisplayBoard> findByUIdViewsAsc(int u_id){
        return postMapper.findByUIdViewsAsc(u_id);
    }
    //u_id로 조회 views기준 내림 차순
    public ArrayList<DisplayBoard> findByUIdViewsDesc(int u_id){
        return postMapper.findByUIdViewsDesc(u_id);
    }
    //u_id로 조회 comments기준 오름 차순
    public ArrayList<DisplayBoard> findByUIdCommentsAsc(int u_id){
        return postMapper.findByUIdCommentsAsc(u_id);
    }
    //u_id로 조회 comments기준 내림 차순
    public ArrayList<DisplayBoard> findByUIdCommentsDesc(int u_id){
        return postMapper.findByUIdCommentsDesc(u_id);
    }
}
