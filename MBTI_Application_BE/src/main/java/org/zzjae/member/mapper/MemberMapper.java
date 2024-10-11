package org.zzjae.member.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.zzjae.member.domain.Member;

import java.util.ArrayList;

@Mapper
public interface MemberMapper {

    @Select("select * from member")
    ArrayList<Member> findAll();

    //U_ID로 멤버의 정보 조회
    @Select("select * from member where u_id = #{u_id}")
    Member findByUId(long id);

    //닉네임으로 멤버의 정보 조회
    @Select("select * from member where nickname = #{nickname}")
    Member findByNickname(String nickname);

    //아이디로 멤버의 정보 조회
    @Select("select * from member where user_id = #{user_id}")
    Member findByUserId(String user_id);

    //아이디와 이름으로 멤버의 정보 조회(비밀번호 변경에 사용)
    @Select("select * from member where user_id = #{user_id} and user_name = #{user_name}")
    Member findByIdName(String user_id, String user_name);

    //멤버 추가
    @Insert("insert into member (user_id, user_password, user_name, nickname, cd) values (#{user_id},#{user_password},#{user_name},#{nickname},#{cd})")
    int addMember(Member member);

    //멤버 닉네임 변경
    @Update("update member set nickname=#{nickname}  where u_id =#{u_id}")
    int updateMemberNickname(Member member);
    
    //멤버 아이디 변경
    @Update("update member set user_id = #{user_id} where u_id = #{u_id}")
    int updateMemberUserId(Member member);

    //멤버 비밀번호 변경
    @Update("update member set user_password = #{user_password} where u_id = #{u_id}")
    int updateMemberPassword(Member member);

    //멤버 삭제(회원 탈퇴)
    @Delete("delete from member where u_id=#{u_id}")
    int deleteByUId(long u_id);

    //멤버의 user_id로 비밀번호 찾기
    @Select("select user_password from member where user_id = #{user_id}")
    String findPasswordByUserId(String user_id);

    //멤버의 user_id 중복 체크
    @Select("select count(*) > 0 from member where user_id = #{user_id}")
    boolean existsByUserId(String user_id);

    //멤버의 nickname 중복 체크
    @Select("select count(*) > 0 from member where nickname = #{nickname}")
    boolean existsByNickName(String nickname);
}
