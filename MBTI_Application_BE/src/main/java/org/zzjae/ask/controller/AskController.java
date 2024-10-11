package org.zzjae.ask.controller;

import org.zzjae.ask.domain.AskRequest;
import org.zzjae.ask.domain.AskResponse;
import org.zzjae.ask.service.AskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zzjae.ask.service.AskService;

@RestController
@RequestMapping("/ask")
public class AskController {

    @Autowired
    private AskService askService;

    @PostMapping
    public ResponseEntity<?> askQuestion(@RequestBody AskRequest askRequest) {
        String answer = askService.getAnswer(askRequest.getQuestion(), askRequest.getMbti(), askRequest.getNickname());
        return ResponseEntity.ok(new AskResponse(answer));
    }
}
