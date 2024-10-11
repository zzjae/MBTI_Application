package org.zzjae.member.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MemberReqUpdate {
    private int u_id;
    private String nickname;
    private String user_id;
    private String user_password;
}
