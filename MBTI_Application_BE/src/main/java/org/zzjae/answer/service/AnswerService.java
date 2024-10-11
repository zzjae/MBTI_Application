package org.zzjae.answer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zzjae.answer.domain.Answer;
import org.zzjae.answer.domain.AnswerReqAdd;
import org.zzjae.answer.domain.DimensionScore;
import org.zzjae.answer.mapper.AnswerMapper;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnswerService {
    @Autowired
    final AnswerMapper answerMapper;

    public DimensionScore calculateDimensionScore(int m_id, int u_id) {
        List<Map<String, Object>> rawScores = answerMapper.findResult(m_id, u_id);

        // 초기 점수 설정
        int i = 50, e = 50, s = 50, n = 50, t = 50, f = 50, j = 50, p = 50;

        // 점수 계산
        for (Map<String, Object> scoreMap : rawScores) {
            String dimension = (String) scoreMap.get("dimension");
            BigDecimal scoreBD = (BigDecimal) scoreMap.get("total_score");
            int score = scoreBD.intValue();

            switch (dimension) {
                case "i":
                    i += score;
                    e -= score;
                    break;
                case "e":
                    e += score;
                    i -= score;
                    break;
                case "s":
                    s += score;
                    n -= score;
                    break;
                case "n":
                    n += score;
                    s -= score;
                    break;
                case "t":
                    t += score;
                    f -= score;
                    break;
                case "f":
                    f += score;
                    t -= score;
                    break;
                case "j":
                    j += score;
                    p -= score;
                    break;
                case "p":
                    p += score;
                    j -= score;
                    break;
            }
        }

        // 비교하여 최종 MBTI 유형 결정 및 퍼센트 계산
        String ie = (i >= e) ? "i" : "e";
        String sn = (s >= n) ? "s" : "n";
        String tf = (t >= f) ? "t" : "f";
        String jp = (j >= p) ? "j" : "p";

        int ie_percent = (ie.equals("i")) ? i : e;
        int sn_percent = (sn.equals("s")) ? s : n;
        int tf_percent = (tf.equals("t")) ? t : f;
        int jp_percent = (jp.equals("j")) ? j : p;

        return new DimensionScore(ie, sn, tf, jp,ie_percent, sn_percent, tf_percent, jp_percent);
    }
    //답변 추가
    public int addAnswer(AnswerReqAdd request){
        return answerMapper.addAnswer(request.toEntity());
    }

    public void addAllAnswers(List<AnswerReqAdd> requests) {
        List<Answer> answers = requests.stream()
                .map(AnswerReqAdd::toEntity)
                .collect(Collectors.toList());

        System.out.print(answers);

        answers.forEach(answerMapper::addAnswer); // Add answers individually
    }
}
