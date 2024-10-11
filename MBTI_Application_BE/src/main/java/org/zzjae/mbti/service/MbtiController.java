package org.zzjae.mbti.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zzjae.featureDescription.domain.FeatureDescription;
import org.zzjae.mbti.domain.Mbti;
import org.zzjae.mbti.domain.MbtiReqAdd;
import org.zzjae.mbti.domain.MbtiReqUpdate;
import org.zzjae.mbti.domain.MbtiResponse;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RestController
public class MbtiController {

    @Autowired
    MbtiService mbtiService;

    @GetMapping("/mbti/recent/{u_id}")
    ResponseEntity<MbtiResponse> findRecentMbtiByUId(@PathVariable int u_id) {
        Mbti mbti = mbtiService.findRecentMbtiByUId(u_id);
        return ResponseEntity.ok()
                .body(new MbtiResponse(mbti));
    }

    @GetMapping("/mbti/{u_id}")
    ResponseEntity<MbtiResponse> findMbtiByUid(@PathVariable int u_id) {
        Mbti mbti = mbtiService.findMbtiByUId(u_id);
        return ResponseEntity.ok()
                .body(new MbtiResponse(mbti));
    }

    @GetMapping("/mbti/limit/{u_id}")
    public ResponseEntity<List<Mbti>> findMbtiByUIdLimit(@PathVariable int u_id) {
        List<Mbti> mbti = mbtiService.findMbtiByUIdLimit(u_id);
        return new ResponseEntity<>(mbti, HttpStatus.OK);
    }

    @PostMapping("/mbti/{u_id}")
    public ResponseEntity add(@PathVariable int u_id) {
        int addCnt = mbtiService.add(u_id);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(addCnt);
    }

    @PutMapping("/mbti/{m_id}/{u_id}")
    public ResponseEntity update(@PathVariable int m_id, @PathVariable int u_id, @RequestBody MbtiReqUpdate request) {
        int updateCnt = mbtiService.update(m_id, u_id, request);

        return ResponseEntity.status(HttpStatus.OK)
                .body(updateCnt);
    }
}
