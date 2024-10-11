import React, { useEffect, useState, useRef } from 'react';
import './CSS/Mbti_characteristic.css';
import { useNavigate, useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';

import istj from '../images/mbti_characteristic/istj.jpg';
import isfj from '../images/mbti_characteristic/isfj.jpg';
import infj from '../images/mbti_characteristic/infj.jpg';
import intj from '../images/mbti_characteristic/intj.jpg';
import istp from '../images/mbti_characteristic/istp.jpg';
import isfp from '../images/mbti_characteristic/isfp.jpg';
import infp from '../images/mbti_characteristic/infp.jpg';
import intp from '../images/mbti_characteristic/intp.jpg';
import estp from '../images/mbti_characteristic/estp.jpg';
import esfp from '../images/mbti_characteristic/esfp.jpg';
import enfp from '../images/mbti_characteristic/enfp.jpg';
import entp from '../images/mbti_characteristic/entp.jpg';
import estj from '../images/mbti_characteristic/estj.jpg';
import esfj from '../images/mbti_characteristic/esfj.jpg';
import enfj from '../images/mbti_characteristic/enfj.jpg';
import entj from '../images/mbti_characteristic/entj.jpg';

const illustrations = {
  istj: istj,
  isfj: isfj,
  infj: infj,
  intj: intj,
  istp: istp,
  isfp: isfp,
  infp: infp,
  intp: intp,
  estp: estp,
  esfp: esfp,
  enfp: enfp,
  entp: entp,
  estj: estj,
  esfj: esfj,
  enfj: enfj,
  entj: entj
};

const Mbti_characteristic = () => {
  const [member, setMember] = useState(null);
  const [mbtiData, setMbtiData] = useState(null);
  const [feature, setFeature] = useState(null);
  const { mbti } = useParams();
  const navigate = useNavigate();
  const captureRef = useRef(null);

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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/featureDescription/${mbti}`, { credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (Array.isArray(data) && data.length > 0) {
          setFeature(data[0]);
        } else {
          console.error("Received data is not an array or is empty.");
        }
      })
      .catch(error => console.error('Fetch error:', error));
  }, [mbti]);

  const imageSrc = illustrations[mbti] || illustrations['default'];

  const handleMainClick = () => {
    navigate('../Main');
  };
  const handleCharacteristicClick = () => {
    navigate('../Characteristic');
  };
  const handleTestClick = () => {
    if (member) {
      navigate('../MbtiTest');
    } else {
      alert('로그인을 먼저 해주세요!');
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
    }
  };
  const handleMyChangeClick = () => {
    if (member) {
      if (mbtiData) {
        navigate('../Mychange');
      } else {
        alert('MBTI 검사를 먼저 진행해주세요!')
        navigate('../MbtiTest');
      }
    } else {
      alert('로그인을 먼저 해주세요!');
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
    }
  };
  const handleMbtiBoardClick = () => {
    if (member) {
      if (mbtiData) {
        navigate('../MbtiBoard');
      } else {
        alert('MBTI 검사를 먼저 진행해주세요!')
        navigate('../MbtiTest');
      }
    } else {
      alert('로그인을 먼저 해주세요!');
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
    }
  };
  const handleMypageClick = () => {
    if (member) {
      navigate('../Mypage');
    } else {
      alert('로그인을 먼저 해주세요!');
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
    }
  }

  const handleCosClick = () => {
    if (member) {
      if (mbtiData) {
        navigate('../Cos');
      } else {
        alert('MBTI 검사를 먼저 진행해주세요!')
        navigate('../MbtiTest');
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
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
  };

  const handleBackClick = () => {
    navigate(-1);
  }

  const handleSaveAsImage = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'mbti-characteristic.png';
        link.click();
      });
    }
  };

  return (
    <div className="main-container">
      {/* menu section */}
      <header className="header">
        <nav className="navbar">
          <div onClick={handleMainClick} className="title">zzjae's</div>
          <ul className="nav-menu">
            <li onClick={handleMainClick} className="nav-link">HOME</li>
            <li onClick={handleCharacteristicClick} className="nav-link character-link">MBTI 특징</li>
            <li onClick={handleTestClick} className="nav-link">MBTI 검사</li>
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

      <div className="mbti-container" ref={captureRef}>
        <div className="mbti-content">
          <div className="mbti-image-section">
            <img src={imageSrc} alt={`${mbti} illustration`} className="mbti-image" />
          </div>
          <div className="mbti-info">
            {feature && <>
              <h1 className="mbti-title">{feature.mbti} ({feature.subNickName})</h1>
              <h2 className="mbti-subtitle">{feature.short_description}</h2>
              <p className="mbti-text">특징: {feature.feature}</p>
              <p className="mbti-text">장점: {feature.advantages}</p>
              <p className="mbti-text">단점: {feature.disAdvantages}</p>
            </>}
          </div>
        </div>
      </div>

      <div className="button-wrapper-characteristic">
        <button className="back-btn" onClick={handleBackClick}>뒤로 가기</button>
        <button className="save-btn" onClick={handleSaveAsImage}>이미지로 저장</button>
      </div>
    </div>
  );
};

export default Mbti_characteristic;