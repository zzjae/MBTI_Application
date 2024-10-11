package org.zzjae.view;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.zzjae.member.domain.Member;
import org.zzjae.member.domain.MemberReqAdd;
import org.zzjae.member.service.MemberService;


@Controller
public class WebViewController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MemberService memberService;


    //  로그인 폼 제출
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    //  회원가입 폼 제출
    @GetMapping("/signup")
    public String showSignup() {
        return "signup";
    }

    //  회원가입 폼 정보 제출
    @PostMapping("/signup")
    public String processSignup(@ModelAttribute Member member, BindingResult result, RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "signup";
        }
        try {
            MemberReqAdd memberReqAdd = new MemberReqAdd(
                    member.getU_id(),
                    member.getUser_id(),
                    passwordEncoder.encode(member.getUser_password()),
                    member.getUser_name(),
                    member.getNickname(),
                    member.getCd()
            );

            memberService.add(memberReqAdd);
            redirectAttributes.addFlashAttribute("success", "Signup successful");
            return "redirect:/login";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Signup failed: " + e.getMessage());
            return "signup";
        }
    }

    @GetMapping("/resetPassword")
    public String showResetPasswordPage() {
        return "resetPassword"; // resetPassword.html을 반환
    }

}