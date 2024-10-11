package org.zzjae.post.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zzjae.featureDescription.domain.FeatureDescription;
import org.zzjae.post.domain.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RestController
public class PostController {
    @Autowired
    PostService postService;

    //모든 게시글
    @GetMapping("/post")
    ResponseEntity<List<PostResponse>> findAll(){
        List<PostResponse> postlist = postService.findAll().stream()
                .map(PostResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(postlist);
    }

    //post_id로 조회
    @GetMapping("/post/p/{post_id}")
    ResponseEntity<PostResponse> findByPostId(@PathVariable int post_id){
        Post post = postService.findByPostId(post_id);
        return ResponseEntity.ok()
                .body(new PostResponse(post));
    }

    //post_id로 조회 display
    @GetMapping("/post/pd/{post_id}")
    ResponseEntity<DisplayBoard> findByPostIdDisplay(@PathVariable int post_id){
        DisplayBoard displayBoard = postService.findByPostIdDisplay(post_id);
        return ResponseEntity.ok()
                .body(displayBoard);
    }

    //board_type로 조회
    @GetMapping("/post/t/{board_type}")
    public ResponseEntity<List<DisplayBoard>> findByBoardType(@PathVariable String board_type) {
        List<DisplayBoard> displayBoard = postService.findByBoardType(board_type);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }
    
    //u_id로 조회
    @GetMapping("/post/u/{u_id}")
    public ResponseEntity<List<DisplayBoard>> findByUId(@PathVariable int u_id) {
        List<DisplayBoard> displayBoard = postService.findByUId(u_id);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }

    //title로 조회
    @GetMapping("/post/tt/{title}")
    public ResponseEntity<List<DisplayBoard>> findByTitle(@PathVariable String title) {
        List<DisplayBoard> displayBoard = postService.findByTitle(title);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }

    //post 추가
    @PostMapping("/post")
    public ResponseEntity addPost(@RequestBody PostReqAdd request) {
        int addCnt = postService.addPost(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(addCnt);
    }
    
    //post 수정(글쓴이만 가능)
    @PutMapping("/post/{post_id}")
    public ResponseEntity updatePost(@PathVariable int post_id,@RequestBody PostReqUpdate request) {
        int updateCnt = postService.updatePost(post_id, request);

        return ResponseEntity.status(HttpStatus.OK)
                .body(updateCnt);
    }

    //views 증가
    @PutMapping("/post/v/{post_id}")
    public ResponseEntity plusViews(@PathVariable int post_id) {
        int plusViewsCnt = postService.plusViews(post_id);

        return ResponseEntity.status(HttpStatus.OK)
                .body(plusViewsCnt);
    }

    //comments 반영
    @PutMapping("/post/r/{post_id}")
    public ResponseEntity reflectionComments(@PathVariable int post_id) {
        int reflectionCommentsCnt = postService.reflectionComments(post_id);

        return ResponseEntity.status(HttpStatus.OK)
                .body(reflectionCommentsCnt);
    }

    //post 삭제(글쓴이만 가능)
    @DeleteMapping("/post/{post_id}")
    public ResponseEntity<Void> deleteByPostId(@PathVariable int post_id) {
        postService.deleteByPostId(post_id);

        return ResponseEntity.ok()
                .build();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //board_type로 조회 post_date기준 오름 차순
    @GetMapping("/post/tda/{board_type}")
    public ResponseEntity<List<DisplayBoard>> findByBoardTypeDateAsc(@PathVariable String board_type) {
        List<DisplayBoard> displayBoard = postService.findByBoardTypeDateAsc(board_type);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }
    //board_type로 조회 post_date기준 내림 차순
    @GetMapping("/post/tdd/{board_type}")
    public ResponseEntity<List<DisplayBoard>> findByBoardTypeDateDesc(@PathVariable String board_type) {
        List<DisplayBoard> displayBoard = postService.findByBoardTypeDateDesc(board_type);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }
    //board_type로 조회 views기준 오름 차순
    @GetMapping("/post/tva/{board_type}")
    public ResponseEntity<List<DisplayBoard>> findByBoardTypeViewsAsc(@PathVariable String board_type) {
        List<DisplayBoard> displayBoard = postService.findByBoardTypeViewsAsc(board_type);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }
    //board_type로 조회 views기준 내림 차순
    @GetMapping("/post/tvd/{board_type}")
    public ResponseEntity<List<DisplayBoard>> findByBoardTypeViewsDesc(@PathVariable String board_type) {
        List<DisplayBoard> displayBoard = postService.findByBoardTypeViewsDesc(board_type);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }
    //board_type로 조회 comments기준 오름 차순
    @GetMapping("/post/tca/{board_type}")
    public ResponseEntity<List<DisplayBoard>> findByBoardTypeCommentsAsc(@PathVariable String board_type) {
        List<DisplayBoard> displayBoard = postService.findByBoardTypeCommentsAsc(board_type);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }
    //board_type로 조회 comments기준 내림 차순
    @GetMapping("/post/tcd/{board_type}")
    public ResponseEntity<List<DisplayBoard>> findByBoardTypeCommentsDesc(@PathVariable String board_type) {
        List<DisplayBoard> displayBoard = postService.findByBoardTypeCommentsDesc(board_type);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //u_id로 조회 post_date기준 오름 차순
    @GetMapping("/post/uda/{u_id}")
    public ResponseEntity<List<DisplayBoard>> findByUIdDateAsc(@PathVariable int u_id) {
        List<DisplayBoard> displayBoard = postService.findByUIdDateAsc(u_id);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }
    //u_id로 조회 post_date기준 내림 차순
    @GetMapping("/post/udd/{u_id}")
    public ResponseEntity<List<DisplayBoard>> findByUIdDateDesc(@PathVariable int u_id) {
        List<DisplayBoard> displayBoard = postService.findByUIdDateDesc(u_id);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }
    //u_id로 조회 views기준 오름 차순
    @GetMapping("/post/uva/{u_id}")
    public ResponseEntity<List<DisplayBoard>> findByUIdViewsAsc(@PathVariable int u_id) {
        List<DisplayBoard> displayBoard = postService.findByUIdViewsAsc(u_id);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }
    //u_id로 조회 views기준 내림 차순
    @GetMapping("/post/uvd/{u_id}")
    public ResponseEntity<List<DisplayBoard>> findByUIdViewsDesc(@PathVariable int u_id) {
        List<DisplayBoard> displayBoard = postService.findByUIdViewsDesc(u_id);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }
    //u_id로 조회 comments기준 오름 차순
    @GetMapping("/post/uca/{u_id}")
    public ResponseEntity<List<DisplayBoard>> findByUIdCommentsAsc(@PathVariable int u_id) {
        List<DisplayBoard> displayBoard = postService.findByUIdCommentsAsc(u_id);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }
    //u_id로 조회 comments기준 내림 차순
    @GetMapping("/post/ucd/{u_id}")
    public ResponseEntity<List<DisplayBoard>> findByUIdCommentsDesc(@PathVariable int u_id) {
        List<DisplayBoard> displayBoard = postService.findByUIdCommentsDesc(u_id);
        return new ResponseEntity<>(displayBoard, HttpStatus.OK);
    }
}
