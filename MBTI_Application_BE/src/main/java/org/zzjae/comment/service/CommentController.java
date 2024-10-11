package org.zzjae.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zzjae.comment.domain.*;
import org.zzjae.featureDescription.domain.FeatureDescription;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RestController
public class CommentController {
    @Autowired
    CommentService commentService;

    //post_id로 해당 글에 달린 댓글 조회 comment형태
    @GetMapping("/comment")
    ResponseEntity<Comment> findComment(@PathVariable int comment_id){
        Comment comment = commentService.findComment(comment_id);
        return ResponseEntity.ok()
                .body(comment);
    }

    //post_id로 해당 글에 달린 댓글 조회 ArrayList<DisplayComment>형태
    @GetMapping("/comment/dp/{post_id}")
    ResponseEntity<List<DisplayComment>> findByPostIdDisplay(@PathVariable int post_id){
        List<DisplayComment> displayComment = commentService.findAllCommentByPostId(post_id);
        return ResponseEntity.ok()
                .body(displayComment);
    }

    //comment_id로 댓글 조회 DisplayComment 형태
    @GetMapping("/comment/dc/{comment_id}")
    ResponseEntity<DisplayComment> findCommentByCommentId(@PathVariable int comment_id){
        DisplayComment displayComment = commentService.findCommentByCommentId(comment_id);
        return ResponseEntity.ok()
                .body(displayComment);
    }

    //댓글 추가
    @PostMapping("/comment")
    public ResponseEntity addPost(@RequestBody CommentReqAdd request) {
        int addCnt = commentService.addComment(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(addCnt);
    }

    //comment_id로 댓글 수정
    @PutMapping("/comment/{comment_id}")
    public ResponseEntity updateComment(@PathVariable int comment_id,@RequestBody CommentReqUpdate request) {
        int updateCnt = commentService.updateComment(comment_id, request);

        return ResponseEntity.status(HttpStatus.OK)
                .body(updateCnt);
    }

    //comment_id로 댓글 삭제
    @DeleteMapping("/comment/{comment_id}")
    public ResponseEntity<Void> deleteByCommentId(@PathVariable int comment_id) {
        commentService.deleteByCommentId(comment_id);

        return ResponseEntity.ok()
                .build();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //post_id로 해당 글에 달린 댓글 조회 ArrayList<DisplayComment>형태 comment_date기준 오름 차순
    @GetMapping("/comment/dpda/{post_id}")
    ResponseEntity<List<DisplayComment>> findByPostIdDisplayDateAsc(@PathVariable int post_id){
        List<DisplayComment> displayComment = commentService.findAllCommentByPostIdDateAsc(post_id);
        return ResponseEntity.ok()
                .body(displayComment);
    }
    //post_id로 해당 글에 달린 댓글 조회 ArrayList<DisplayComment>형태 comment_date기준 내림 차순
    @GetMapping("/comment/dpdd/{post_id}")
    ResponseEntity<List<DisplayComment>> findByPostIdDisplayDateDesc(@PathVariable int post_id){
        List<DisplayComment> displayComment = commentService.findAllCommentByPostIdDateDesc(post_id);
        return ResponseEntity.ok()
                .body(displayComment);
    }
}
