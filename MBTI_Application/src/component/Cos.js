import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Cos.css';
import loadingImg from '../images/loading.gif';
import answerImg from '../images/answer.png';
import NangKozImg from '../images/NangKoz.jpg';
const Cos = () => {

  const [member, setMember] = useState(null);
  const [mbtiData, setMbtiData] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if (data && data.nickname) {
          setMember(data);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (member && member.u_id) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/mbti/recent/${member.u_id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.ie) { // MBTI 정보 중 하나를 예로 들어 검사
            setMbtiData(data);
          } else {
            setMbtiData(null); // 데이터가 비어있거나 MBTI 정보가 없는 경우
          }
        })
        .catch(error => {
          console.error('Error fetching MBTI data:', error);
          setMbtiData(null); // 에러 발생 시
        });
    } else {
      setMbtiData(null); // member가 유효하지 않은 경우
    }
  }, [member]);

  const handleMainClick = () => {
    navigate('/Main');
  };
  const handleCharacteristicClick = () => {
    navigate('/Characteristic');
  };
  const handleTestClick = () => {
    if (member) {
      navigate('/MbtiTest');
    } else {
      alert('로그인을 먼저 해주세요!');
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
    }
  };
  const handleMyChangeClick = () => {
    if (member) {
      if (mbtiData) {
        navigate('/Mychange');
      } else {
        alert('MBTI 검사를 먼저 진행해주세요!')
        navigate('/MbtiTest');
      }
    } else {
      alert('로그인을 먼저 해주세요!');
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
    }
  };
  const handleMbtiBoardClick = () => {
    if (member) {
      if (mbtiData) {
        navigate('/MbtiBoard');
      } else {
        alert('MBTI 검사를 먼저 진행해주세요!')
        navigate('/MbtiTest');
      }
    } else {
      alert('로그인을 먼저 해주세요!');
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
    }
  };
  const handleMypageClick = () => {
    if (member) {
      navigate('/Mypage');
    } else {
      alert('로그인을 먼저 해주세요!');
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
    }
  }

  const handleCosClick = () => {
    if (member) {
      if (mbtiData) {
        navigate('/Cos');
      } else {
        alert('MBTI 검사를 먼저 진행해주세요!')
        navigate('/MbtiTest');
      }
    } else {
      alert('로그인을 먼저 해주세요!');
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
    }
  }
  const handleOutClick = () => {
    if (window.confirm('정말 로그아웃 하시겠습니까?')) {
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/logout`;
    }
  };
  const handleStartClick = () => {
    window.location.href = '/login';
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleQuestionSubmit = () => {
    const trimmedQuestion = question.trim();
    if (trimmedQuestion === '' || /\n\s*\n/.test(trimmedQuestion)) {
      alert('유효한 질문을 입력해 주세요. 빈 줄이 없어야 합니다.');
      return;
    }
    setIsLoading(true); // 로딩 시작
    fetch(`${process.env.REACT_APP_BACKEND_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: trimmedQuestion,
        mbti: `${mbtiData.ie}${mbtiData.sn}${mbtiData.tf}${mbtiData.jp}`,
        nickname: member.nickname
      }),
    })
      .then(response => response.json())
      .then(data => {
        setAnswer(data.answer);
        setIsLoading(false); // 로딩 종료
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false); // 로딩 종료
      });
  };


  const handleReload = () => {
    window.location.reload();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleQuestionSubmit();
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <nav className="navbar">
          <div onClick={handleMainClick} className="title">zzjae's</div>
          <ul className="nav-menu">
            <li onClick={handleMainClick} className="nav-link">HOME</li>
            <li onClick={handleCharacteristicClick} className="nav-link">MBTI 특징</li>
            <li onClick={handleTestClick} className="nav-link">MBTI 검사</li>
            <li onClick={handleMyChangeClick} className="nav-link">내 MBTI 변화량</li>
            <li onClick={handleMbtiBoardClick} className="nav-link">MBTI 별 게시판</li>
            <li onClick={handleCosClick} className="nav-link nangkoz-link">낭코즈의 고민해결</li>
          </ul>
          <div className="member-area">
            {member ? (
              <>
                {mbtiData ? (
                  <span className="member-nickname">{mbtiData.ie}{mbtiData.sn}{mbtiData.tf}{mbtiData.jp} - </span>
                ) : (
                  <></>
                )}
                <span className="member-nickname">{member.nickname}님</span>
                <button onClick={handleMypageClick} className="mypage-btn">마이페이지</button>
                <button onClick={handleOutClick} className="logout-btn">로그아웃</button>
              </>
            ) : (
              <button onClick={handleStartClick} className="start-btn">로그인</button>
            )}
          </div>
        </nav>
      </header>

      <div className="cos-section">
        {isLoading ? (
          <div className="loading">
            <img src={loadingImg} alt="생성 중..." />
          </div>
        ) : answer ? (
          <div className="answer-wrapper">
            <img src={answerImg} alt="Answer Background" className="answer-background" />
            <div className="answer">
              <h3>낭코즈의 답변:</h3>
              <p>{answer}</p>
            </div>
            <div className='back-btn-wrapper-cos'>
              <button className='back-btn' onClick={handleReload}>뒤로 가기</button>
            </div>
          </div>
        ) : (
          <div className='quest-section'>
            {mbtiData ? (
              <>
                <div className="image-and-bubble">
                  <img src={NangKozImg} className='NangKoz-image' alt='NangKoz Images'/>
                  <div className="text-bubble">
                    <p className='solution'>고민이 있으신가요?</p>
                    <p className='solution'>낭코즈가 고민을 해결해 드릴게요!</p>
                  </div>
                </div>
                <textarea value={question} onChange={handleQuestionChange} onKeyDown={handleKeyDown} placeholder="고민을 입력해 주세요!" />
                <button onClick={handleQuestionSubmit}>고민 해결 요청</button>
              </>
            ) : (
              <>
                <p>MBTI 검사 결과가 존재하지 않아요, MBTI검사를 진행해 보세요!</p>
                <button onClick={handleTestClick} className="mbtitest-btn">MBTI 검사하러 가기</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cos;