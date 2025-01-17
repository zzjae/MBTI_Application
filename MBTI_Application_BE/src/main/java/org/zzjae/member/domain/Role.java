package org.zzjae.member.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    MEMBER("ROLE_USER", "일반사용자"),
    ADMIN("ROLE_ADMIN", "일반관리자");

    private final String key;
    private final String title;
}
