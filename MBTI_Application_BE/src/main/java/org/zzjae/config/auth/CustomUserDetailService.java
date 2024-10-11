package org.zzjae.config.auth;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.zzjae.member.domain.Member;
import org.zzjae.member.mapper.MemberMapper;
import org.zzjae.member.service.MemberService;

@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {
//    @Autowired
//    MemberMapper memberMapper;

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailService.class);
    private final MemberMapper memberMapper;


    @Override
    public UserDetails loadUserByUsername(String user_id) throws UsernameNotFoundException {
        logger.debug("Loading user by user_id: {}", user_id);
        Member member = memberMapper.findByUserId(user_id);
        if (member == null) {
            logger.warn("User not found with id: {}", user_id);
            throw new UsernameNotFoundException("User not found with id: " + user_id);
        }
        logger.debug("User found: {}", member);
        return new CustomUserDetails(member);
    }
}
