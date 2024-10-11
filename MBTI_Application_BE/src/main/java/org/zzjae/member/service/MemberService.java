package org.zzjae.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zzjae.config.auth.CustomUserDetailService;
import org.zzjae.config.auth.CustomUserDetails;
import org.zzjae.member.domain.Member;
import org.zzjae.member.domain.MemberReqAdd;
import org.zzjae.member.domain.MemberReqUpdate;
import org.zzjae.member.mapper.MemberMapper;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MemberService {
    @Autowired
    final MemberMapper memberMapper;

    private final PasswordEncoder passwordEncoder;

    private final CustomUserDetailService userDetailsService;

    public ArrayList<Member> findAll() {
        return memberMapper.findAll();
    }

    //멤버의 u_id로 정보 조회
    public Member findByUId(long u_id){
        return memberMapper.findByUId(u_id);
    }

    //멤버의 닉네임으로 정보 조회
    public Member findByNickname(String nickname){
        return memberMapper.findByNickname(nickname);
    }

    //멤버의 user_id로 정보 조회
    public Member findByUserId(String user_id){
        return memberMapper.findByUserId(user_id);
    }

    //멤버 추가
    public int add(MemberReqAdd request){
        Member member = request.toEntity();
        String encodedPassword = passwordEncoder.encode(member.getUser_password());
        member.setUser_password(encodedPassword);
        return memberMapper.addMember(member);
    }

    //멤버 닉네임 변경
//    @Transactional
//    public int updateMemberNickname(long u_id, MemberReqUpdate request) {
//        Member member = memberMapper.findByUId(u_id);
//        member.setNickname(request.getNickname());
//        int updateCnt = memberMapper.updateMemberNickname(member);
//        return updateCnt;
//    }
    @Transactional
    public int updateMemberNickname(long u_id, MemberReqUpdate request) {
        Member member = memberMapper.findByUId(u_id);
        member.setNickname(request.getNickname());
        int updateCnt = memberMapper.updateMemberNickname(member);
        if (updateCnt > 0) {
            reloadUserDetails(member.getUser_id());
        }
        return updateCnt;
    }

    //멤버 아이디 변경
//    @Transactional
//    public int updateMemberUserId(long u_id, MemberReqUpdate request) {
//        Member member = memberMapper.findByUId(u_id);
//        member.setUser_id(request.getUser_id());
//        int updateCnt = memberMapper.updateMemberUserId(member);
//        return updateCnt;
//    }
    @Transactional
    public int updateMemberUserId(long u_id, MemberReqUpdate request) {
        Member member = memberMapper.findByUId(u_id);
        member.setUser_id(request.getUser_id());
        int updateCnt = memberMapper.updateMemberUserId(member);
        if (updateCnt > 0) {
            reloadUserDetails(member.getUser_id());
        }
        return updateCnt;
    }

    //멤버 비밀번호 변경
//    @Transactional
//    public int updateMemberPassword(long u_id, MemberReqUpdate request) {
//        Member member = memberMapper.findByUId(u_id);
//        member.setUser_password(request.getUser_password());
//        int updateCnt = memberMapper.updateMemberPassword(member);
//        return updateCnt;
//    }
    @Transactional
    public int updateMemberPassword(long u_id, MemberReqUpdate request) {
        Member member = memberMapper.findByUId(u_id);
        member.setUser_password(passwordEncoder.encode(request.getUser_password()));
        int updateCnt = memberMapper.updateMemberPassword(member);
        if (updateCnt > 0) {
            reloadUserDetails(member.getUser_id());
        }
        return updateCnt;
    }

    //멤버 삭제
    public int delete(long u_id) {
        int deleteCnt = memberMapper.deleteByUId(u_id);
        return deleteCnt;
    }

    // 사용자 정보를 다시 로드하여 SecurityContext에 설정
    public void reloadUserDetails(String userId) {
        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(userId);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    //멤버의 user_id로 password찾기 (이거는 하면 안됨)
    public String findPasswordByUserId(String user_id){
        return memberMapper.findPasswordByUserId(user_id);
    }

    //멤버 user_id 중복 확인
    public boolean checkUserIdExists(String user_id) {
        return memberMapper.existsByUserId(user_id);
    }

    //멤버 nickname 중복 확인
    public boolean checkNickNameExists(String nickname) {
        return memberMapper.existsByNickName(nickname);
    }

    //비밀번호 random으로 재설정
    public void updatePassword(String user_id, String user_name, String newPassword) {
        Member member = memberMapper.findByIdName(user_id, user_name);
        if (member == null) {
            throw new UsernameNotFoundException("User not found with user_id: " + user_id);
        }
        member.setUser_password(passwordEncoder.encode(newPassword));
        memberMapper.updateMemberPassword(member);
    }

    public boolean validatePassword(String userId, String currentPassword) {
        Member member = memberMapper.findByUserId(userId);
        if (member == null || !passwordEncoder.matches(currentPassword, member.getUser_password())) {
            return false;
        }
        return true;
    }
}
