package org.zzjae.member.domain;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
public class Member implements Serializable{
    private int u_id;
    private String user_id;
    private String user_password;
    private String user_name;
    private String nickname;
    private String cd = "0";

    private Role role;

    public void setCd(String cd){
        this.cd = cd;

        if ( cd.equals("0") ) {  // 회원 코드가 0 이면 Role은 User
            this.role = Role.MEMBER ;
        }else if ( cd.equals("1") ) {// 회원 코드가 1 이면 Role은 ADMIN
            this.role = Role.ADMIN ;
        }
    }
}
