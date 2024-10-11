package org.zzjae.ask.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

@Service
public class AskService {
    @Value("${openai.api.key}")
    private String apiKey;

    public String getAnswer(String question, String mbti, String nickname) {
        RestTemplate restTemplate = new RestTemplate();

        String url = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        String requestBody = "{\n" +
                "  \"model\": \"gpt-3.5-turbo\",\n" +
                "  \"messages\": [\n" +
                "    {\"role\": \"system\", \"content\": \"당신은 세계최고의 고민해결사 입니다. 당신이 해결하지 못하는 고민은 없으며 어떤 고민이던지 해결 할 수 있습니다. 당신이 다른 고민해결사와 다른 점은 당신은 MBTI를 바탕으로 고민에 대한 답변을 한다는 것입니다. 예를 들어 당신에게 ESFJ의 MBTI를 가진 유저가 당신에게 고민해결을 부탁 한다면, 당신은 유저의 MBTI인 ESFJ를 바탕으로 고민해결을 위한 답변을 해줍니다. 또한 유저의 MBTI를 기반으로 답변을 작성할 때 상대방의 MBTI를 고려해 상대방이 듣기 좋게 답변을 정합니다.MBTI중 I는 내향적, 내면에 집중, 신중히 행동, E는 외향적, 사교적, 외부 자극 선호, S는 감각적, 현재 중심, 실질적 정보, N는 직관적, 연결성, 비유적 표현, T 는 사고형, 분석적, 원칙 중시, F는 감정형, 인간적 관계, 공감 중시, J는 판단형, 조직적, 체계적, P 는 인식형, 유연성, 변화 선호에 중점을 두어 답변을 작성합니다. 이런 식으로 상대방의 MBTI를 기반으로 답변, 답변의 형식, 답변의 말투를 정해 답변해줍니다. 당신은 항상 256글자 미만의 답변을 해줍니다. 절대로 답변이 중간에 끊기면 안됩니다. 당신의 이름은 낭코즈입니다.\"},\n" +
                "    {\"role\": \"user\", \"content\": \"저의 닉네임은 " + nickname + "입니다. 그리고 내 MBTI는 " + mbti + "입니다.\"},\n" +
                "    {\"role\": \"assistant\", \"content\": \"당신의 닉네임은 " + nickname + "이고 MBTI는 " + mbti + "이군요! 고민을 말씀해주세요!\"},\n" +
                "    {\"role\": \"user\", \"content\": \"" + question + "\"}\n" +
                "  ]\n" +
                "}";

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);


        System.out.println("Response Body: " + response.getBody());


        String responseBody = response.getBody();

        return extractAnswerFromResponse(responseBody);
    }

    private String extractAnswerFromResponse(String responseBody) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(responseBody);
            return root.path("choices").get(0).path("message").path("content").asText();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error parsing response.";
        }
    }
}
