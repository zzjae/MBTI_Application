package org.zzjae.featureDescription.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zzjae.featureDescription.domain.FeatureDescription;


import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RestController
public class FeatureDescriptionController {
    @Autowired
    FeatureDescriptionService featureDescriptionService;

    @GetMapping("/featureDescription")
    public ResponseEntity<List<FeatureDescription>> getAllFeature() {
        List<FeatureDescription> questions = featureDescriptionService.findAll();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("/featureDescription/{mbti}")
    public ResponseEntity<List<FeatureDescription>> getFeatureByMbti(@PathVariable String mbti) {
        List<FeatureDescription> feature = featureDescriptionService.findByMbti(mbti);
        return new ResponseEntity<>(feature, HttpStatus.OK);
    }
}
