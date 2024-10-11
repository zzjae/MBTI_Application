package org.zzjae.member.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MemberReqAdd {
    private int u_id;
    private String user_id;
    private String user_password;
    private String user_name;
    private String nickname;
    private String cd = "0";

    public Member toEntity(){
        return Member.builder()
                .u_id(u_id)
                .user_id(user_id)
                .user_password(user_password)
                .user_name(user_name)
                .nickname(nickname)
                .cd(cd)
                .build();
    }
}
