package org.zzjae.mbti.mapper;

import org.apache.ibatis.annotations.*;
import org.zzjae.mbti.domain.Mbti;
import org.zzjae.mbti.domain.MbtiReqAdd;

import java.util.ArrayList;

@Mapper
public interface MbtiMapper {

    @Select("select * from mbti where m_id = #{m_id} and u_id = #{u_id}")
    Mbti findByIds(int m_id, int u_id);

    //member의 u_id로 최근의 mbti 정보 조회
    @Select("SELECT " +
            "mb.m_id, " +
            "m.u_id, " +
            "mb.ie, " +
            "mb.sn, " +
            "mb.tf, " +
            "mb.jp, " +
            "mb.ie_percent, " +
            "mb.sn_percent, " +
            "mb.tf_percent, " +
            "mb.jp_percent, " +
            "mb.input_date " +
            "FROM Member m " +
            "JOIN ( " +
            "  SELECT u_id, MAX(m_id) AS latest_m_id " +
            "  FROM MBTI " +
            "  GROUP BY u_id " +
            ") latest_mb ON m.u_id = latest_mb.u_id " +
            "JOIN MBTI mb ON latest_mb.latest_m_id = mb.m_id AND latest_mb.u_id = mb.u_id " +
            "WHERE m.u_id = #{u_id};")
    Mbti findRecentMbtiByUId(int u_id);

    //멤버의 MBTI 조회(percent)
    @Select("SELECT " +
            "m.u_id, " +
            "m.user_id, " +
            "m.user_name, " +
            "m.nickname, " +
            "mb.m_id, " +
            "mb.ie, " +
            "mb.sn, " +
            "mb.tf, " +
            "mb.jp, " +
            "mb.ie_percent, " +
            "mb.sn_percent, " +
            "mb.tf_percent, " +
            "mb.jp_percent, " +
            "mb.input_date " +
            "FROM Member m " +
            "JOIN MBTI mb ON m.u_id = mb.u_id " +
            "WHERE m.u_id = #{u_id};")
    Mbti findMbtiByUId(int u_id);

    @Select("SELECT " +
            "m.u_id, " +
            "m.user_id, " +
            "m.user_name, " +
            "m.nickname, " +
            "mb.m_id, " +
            "mb.ie, " +
            "mb.sn, " +
            "mb.tf, " +
            "mb.jp, " +
            "mb.ie_percent, " +
            "mb.sn_percent, " +
            "mb.tf_percent, " +
            "mb.jp_percent, " +
            "mb.input_date " +
            "FROM " +
            "Member m " +
            "JOIN " +
            "MBTI mb ON m.u_id = mb.u_id " +
            "WHERE " +
            "m.u_id = #{u_id} " +
            "ORDER BY " +
            "mb.input_date ASC " +
            "LIMIT 10;")
    ArrayList<Mbti> findMbtiByUIdLimit(int u_id);

    //멤버의 새로운 MBTI 추가(새 mbti을 추가 할때는 값을 넣지 않고 검사가 끝난 후 update 한다)
    @Insert("insert into Mbti (u_id) values (#{u_id})")
    int addMbti(int u_id);

    //멤버의 Mbti 수정
    @Update("UPDATE mbti " +
            "SET ie = #{ie}, sn = #{sn}, tf = #{tf}, jp = #{jp}, " +
            "ie_percent = #{ie_percent}, sn_percent = #{sn_percent}, " +
            "tf_percent = #{tf_percent}, jp_percent = #{jp_percent}, " +
            "input_date = #{input_date}" +
            "WHERE m_id = #{m_id} AND u_id = #{u_id}")
    int updateMbti(Mbti mbti);
}
