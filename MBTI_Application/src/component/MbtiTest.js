import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/MbtiTest.css';

const MbtiTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const questionsPerPage = 10;
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [mbtiData, setMbtiData] = useState(null);

  const scoreMapping = {
    1: -5, // '매우 아니다'
    2: -3, // '아니다'
    3: 1,  // '보통이다'
    4: 3,  // '그렇다'
    5: 5   // '매우 그렇다'
  };


  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/question`, { credentials: 'include' })
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if (data && data.nickname) { // Check if the data contains the nickname field
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

  const handleAnswerChange = (q_id, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [q_id]: value
    }));
  };

  const isEveryQuestionAnswered = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const currentQuestions = questions.slice(startIndex, endIndex);

    return currentQuestions.every(question => answers[question.q_id] !== undefined);
  };

  const handleNextPage = () => {
    if (!isEveryQuestionAnswered()) {
      alert('체크가 안된 질문이 있습니다! 모든 질문에 답변해주세요!');
      return;
    }

    if ((currentPage + 1) * questionsPerPage < questions.length) {
      setCurrentPage(currentPage + 1);
    } else {
      handleSubmit();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!member || !member.u_id) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      // 1. 새로운 mbti 생성
      const mbtiResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/mbti/${member.u_id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!mbtiResponse.ok) {
        const errorMessage = await mbtiResponse.text();
        console.error('MBTI 생성 실패:', errorMessage);
        alert(`MBTI 생성에 실패했습니다. 에러: ${errorMessage}`);
        return;
      }

      // 2. 새로 생성한 mbti m_id값 get
      const mbtiInfo = await fetch(`${process.env.REACT_APP_BACKEND_URL}/mbti/recent/${member.u_id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const mbtiData = await mbtiInfo.json();
      const { m_id } = mbtiData;

      // 3. 방금전 생성한 mbti의 m_id와 q_id로 answer등록
      const formattedAnswers = Object.entries(answers).map(([q_id, value]) => ({
        q_id: parseInt(q_id, 10),
        m_id,
        u_id: member.u_id,
        score: scoreMapping[value],
      }));

      // 4. answer를 post해 db에 저장
      const answerResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/answer`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedAnswers),
      });

      if (!answerResponse.ok) {
        const errorMessage = await answerResponse.text();
        console.error('답변 제출 실패:', errorMessage);
        alert(`답변 제출에 실패했습니다. 에러: ${errorMessage}`);
      }

      // 5. 새로 생성한 mbti m_id값 get
      const mbtiResultInfo = await fetch(`${process.env.REACT_APP_BACKEND_URL}/test_result/${m_id}/${member.u_id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const mbtiResultData = await mbtiResultInfo.json();
      const offset = new Date().getTimezoneOffset() * 60000;
      const currentDate = new Date(Date.now() - offset);

      // 6. 결과 업데이트
      const updateMbtiResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/mbti/${m_id}/${member.u_id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...mbtiResultData,
          input_date: currentDate  // 현재 시간을 요청 본문에 추가
        }),
      });

      if (!updateMbtiResponse.ok) {
        const errorMessage = await updateMbtiResponse.text();
        console.error('MBTI 업데이트 실패:', errorMessage);
        alert(`MBTI 업데이트에 실패했습니다. 에러: ${errorMessage}`);
        return;
      }

      // 7. 결과 페이지로 이동
      navigate('/TestResult');

    } catch (error) {
      console.error('서버 오류:', error);
      alert('서버에 오류가 발생했습니다.');
    }
  };

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
  };

  const handleOutClick = () => {
    if(window.confirm('정말 로그아웃 하시겠습니까?')){
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/logout`;
    }
  };
  const handleStartClick = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
  };

  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  const totalNumberOfPages = Math.ceil(questions.length / questionsPerPage);
  const progressPercentage = (currentPage / totalNumberOfPages) * 100;

  return (
    <div className="questionnaire-container">
      {/* menu section */}
      <header className="header">
        <nav className="navbar">
          <div onClick={handleMainClick} className="title">zzjae's</div>
          <ul className="nav-menu">
            <li onClick={handleMainClick} className="nav-link">HOME</li>
            <li onClick={handleCharacteristicClick} className="nav-link">MBTI 특징</li>
            <li onClick={handleTestClick} className="nav-link mtest-link">MBTI 검사</li>
            <li onClick={handleMyChangeClick} className="nav-link">내 MBTI 변화량</li>
            <li onClick={handleMbtiBoardClick} className="nav-link">MBTI 별 게시판</li>
            <li onClick={handleCosClick} className="nav-link">낭코즈의 고민해결</li>
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

      {questions.length > 0 && (
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          <div className="progress-percentage">{`${progressPercentage.toFixed(0)}%`}</div>
        </div>
      )}
      {currentQuestions.map(question => (
        <div key={question.q_id} className="question-block">
          <h1>{question.question_text}</h1>
          <div className="answers">
            {['매우 아니다', '아니다', '보통이다', '그렇다', '매우 그렇다'].map((option, index) => (
              <div key={index} className="answer-option">
                <div className='radio-block'>
                  <input
                    type="radio"
                    name={`question-${question.q_id}`}
                    value={index + 1}
                    checked={answers[question.q_id] === index + 1}
                    onChange={() => handleAnswerChange(question.q_id, index + 1)}
                  />
                </div>
                <div className='option-block'>
                  <label>{option}</label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className='button-block'>
        <button className="submit-button" onClick={handleNextPage}>
          {startIndex + questionsPerPage < questions.length ? '다음' : '제출'}
        </button>
      </div>

    </div>
  );
};

export default MbtiTest;
