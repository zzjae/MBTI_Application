package org.zzjae.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.zzjae.config.auth.CustomUserDetailService;

import java.util.Collections;
import java.util.List;


@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class WebSpringSecurityConfig implements WebMvcConfigurer {

    private final CustomUserDetailService customUserDetailService;

    @Bean
    public SecurityFilterChain filter(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration config = new CorsConfiguration();
                        config.addAllowedOrigin("http://127.0.0.1:3000");
                        config.addAllowedOrigin("http://localhost:3000");
                        config.setAllowedMethods(Collections.singletonList("*"));
                        config.setAllowCredentials(true);
                        config.setAllowedHeaders(Collections.singletonList("*"));
                        config.setMaxAge(3600L); //1시간
                        return config;
                    }
                }))
                .authorizeHttpRequests((authorizeRequestes) -> authorizeRequestes
                        //.requestMatchers("/","/login/**", "/login", "/oauth2/code/kakao", "/loginKakao").permitAll()  //permitAll() 설정한 요청은 로그인 없이 접근이 가능
                        .anyRequest().permitAll()) // 그외 페이지는 로그인만 하면 접근가능
                .formLogin((formLogin) -> formLogin
                        .loginPage("/login")   //custom login html 를 사용할 때
                        .loginProcessingUrl("/auth/login") // POST /auth/login 는 로그인 요청 url
                        .usernameParameter("userId")
                        .passwordParameter("userPassword")
                        .defaultSuccessUrl("http://localhost:3000/main", true) // 로그인 성공 시 /user로 포워드.
                        .failureUrl("/login?error=true")) // 로그인 실패 시 /login으로 리다이렉트
                .logout((logoutConfig) ->
                        logoutConfig.logoutSuccessUrl("http://localhost:3000/main")
                )
                .userDetailsService(customUserDetailService);

        return http.build();
    }

    // 패스워드 암호화
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}