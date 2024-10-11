package org.zzjae.member.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberReqLogin {
    private String userId;
    private String userPassword;

    public MemberReqLogin(String userId, String userPassword) {
        this.userId = userId;
        this.userPassword = userPassword;
    }
}
