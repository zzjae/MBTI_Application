package org.zzjae.member.domain;

import lombok.Getter;

@Getter
public class MemberResponse {
    private final int u_id;
    private final String user_id;
    private final String user_password;
    private final String user_name;
    private final String nickname;
    private final String cd;

    public MemberResponse(Member member){
        this.u_id = member.getU_id();
        this.user_id = member.getUser_id();
        this.user_password = member.getUser_password();
        this.user_name = member.getUser_name();
        this.nickname = member.getNickname();
        this.cd = member.getCd();
    }
}
