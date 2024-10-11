package org.zzjae.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.zzjae.config.auth.CustomUserDetails;
import org.zzjae.member.domain.Member;
import org.zzjae.member.domain.MemberReqAdd;
import org.zzjae.member.domain.MemberReqUpdate;
import org.zzjae.member.domain.MemberResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RequiredArgsConstructor
@RestController
public class MemberController {

    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @Autowired
    MemberService memberService;

    @GetMapping("/member")
    ResponseEntity<List<MemberResponse>> findall() {
        List<MemberResponse> userlist = memberService.findAll().stream()
                .map(MemberResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(userlist);
    }

    @GetMapping("/member/{u_id}")
    ResponseEntity<MemberResponse> findByUId(@PathVariable long u_id) {
        Member member = memberService.findByUId(u_id);
        return ResponseEntity.ok()
                .body(new MemberResponse(member));
    }

    @GetMapping("/member/{user_id}")
    ResponseEntity<MemberResponse> findByUserId(@PathVariable String user_id) {
        Member member = memberService.findByUserId(user_id);
        return ResponseEntity.ok()
                .body(new MemberResponse(member));
    }

    @PostMapping("/member")
    public ResponseEntity<?> addMember(@RequestBody MemberReqAdd request) {
        int addedCount = memberService.add(request);
        if (addedCount > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create the user.");
        }
    }

    @DeleteMapping("/member/{id}")
    public ResponseEntity<Void> delete(@PathVariable long u_id) {
        memberService.delete(u_id);

        return ResponseEntity.ok()
                .build();
    }

    @PutMapping("/member/n/{u_id}")
    public ResponseEntity<?> updateMemberNickname(@PathVariable long u_id, @RequestBody MemberReqUpdate request) {
        int updateCnt = memberService.updateMemberNickname(u_id, request);
        return ResponseEntity.status(HttpStatus.OK).body(updateCnt);
    }

    @PutMapping("/member/i/{u_id}")
    public ResponseEntity<?> updateMemberUserId(@PathVariable long u_id, @RequestBody MemberReqUpdate request) {
        int updateCnt = memberService.updateMemberUserId(u_id, request);
        return ResponseEntity.status(HttpStatus.OK).body(updateCnt);
    }

    @PutMapping("/member/p/{u_id}")
    public ResponseEntity<?> updateMemberPassword(@PathVariable long u_id, @RequestBody MemberReqUpdate request) {
        int updateCnt = memberService.updateMemberPassword(u_id, request);
        return ResponseEntity.status(HttpStatus.OK).body(updateCnt);
    }

    @GetMapping("/user")
    public ResponseEntity<?> userDetails(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            logger.warn("User is not authenticated");
            return new ResponseEntity<>("User is not authenticated", HttpStatus.FORBIDDEN);
        }
        logger.debug("Authenticated user: {}", userDetails.getUsername());
        var userMap = Map.of(
                "u_id", userDetails.getUId(),
                "user_id", userDetails.getUsername(),
                "nickname", userDetails.getNickname(),
                "user_name", userDetails.getUserRealName()
        );
        return ResponseEntity.ok(userMap);
    }

    @PostMapping("/member/validatePassword")
    public ResponseEntity<?> validatePassword(@RequestBody Map<String, String> request) {
        String userId = request.get("user_id");
        String currentPassword = request.get("currentPassword");
        boolean isValid = memberService.validatePassword(userId, currentPassword);
        if (isValid) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid current password");
        }
    }

    @GetMapping("/main")
    String main(@AuthenticationPrincipal UserDetails userDetails) {
        return userDetails.getUsername() + "님 메인페이지입니다.";
    }

    //멤버의 user_id로 user_password찾기
    @GetMapping("/member/fpbui/{user_id}")
    public ResponseEntity<String> findPasswordByUserId(@PathVariable String user_id) {
        try {
            String password = memberService.findPasswordByUserId(user_id);
            if (password != null) {
                return ResponseEntity.ok(password);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Password not found for user_id: " + user_id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    //user_id 중복 확인
    @GetMapping("/member/checkUserId/{user_id}")
    public ResponseEntity<Boolean> checkUserId(@PathVariable String user_id) {
        boolean exists = memberService.checkUserIdExists(user_id);
        return ResponseEntity.ok(exists);
    }

    //nickname 중복 확인
    @GetMapping("/member/checkNickName/{nickname}")
    public ResponseEntity<Boolean> checkNickName(@PathVariable String nickname) {
        boolean exists = memberService.checkNickNameExists(nickname);
        return ResponseEntity.ok(exists);
    }

    //비밀번호 재설정
    @PostMapping("/reset-password/{user_id}/{user_name}")
    public ResponseEntity<Map<String, String>> resetPassword(@PathVariable String user_id, @PathVariable String user_name) {
        String newPassword = generateRandomPassword();
        memberService.updatePassword(user_id,user_name, newPassword);
        Map<String, String> response = new HashMap<>();
        response.put("newPassword", newPassword);
        return ResponseEntity.ok(response);
    }

    private String generateRandomPassword() {
        int length = 10;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder password = new StringBuilder();
        for (int i = 0; i < length; i++) {
            password.append(characters.charAt(random.nextInt(characters.length())));
        }
        return password.toString();
    }
}
