import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './CSS/Main.css';

import characteristicImg from '../images/characteristic.png';
import mbtiCharacteristicImg from '../images/mbti_characteristic.png';
import mbtiTestImg from '../images/mbtiTest.png';
import mbtiTestResultImg from '../images/mbtiTestResult.png';
import myChangeImg from '../images/myChange.png';
import mbtiBoardImg from '../images/mbtiBoard.png';
import cosImg from '../images/cos.png';
import cosResultImg from '../images/cos_result.png';

const Main = () => {
  const [member, setMember] = useState(null);
  const [mbtiData, setMbtiData] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(true);

  const sections = useMemo(() => ['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7'], []);

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
    if(window.confirm('정말 로그아웃 하시겠습니까?')){
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/logout`;
    }
  };
  const handleStartClick = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
  };

  const scrollToSection = (index) => {
    if (index >= 0 && index < sections.length) {
      const section = document.getElementById(sections[index]);
      if (section) {
        const sectionRect = section.getBoundingClientRect();
        const offset = sectionRect.top + window.scrollY - (window.innerHeight / 2) + (sectionRect.height / 2);
        window.scrollTo({ top: offset, behavior: 'smooth' });
        setCurrentSectionIndex(index);
      }
    }
  };

  const handleScrollUp = () => {
    scrollToSection(currentSectionIndex - 1);
  };

  const handleScrollDown = () => {
    scrollToSection(currentSectionIndex + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionPositions = sections.map(sectionId => {
        const section = document.getElementById(sectionId);
        return section ? section.getBoundingClientRect().top : null;
      });

      const middleOfScreen = window.innerHeight / 2;
      const closestSectionIndex = sectionPositions.reduce((closestIndex, currentPos, currentIndex) => {
        if (currentPos !== null && Math.abs(currentPos - middleOfScreen) < Math.abs(sectionPositions[closestIndex] - middleOfScreen)) {
          return currentIndex;
        }
        return closestIndex;
      }, 0);

      setCurrentSectionIndex(closestSectionIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const variants = {
    left: {
      initial: { x: -300, opacity: 0 },
      animate: { x: 0, opacity: 1 }
    },
    right: {
      initial: { x: 300, opacity: 0 },
      animate: { x: 0, opacity: 1 }
    },
    top: {
      initial: { y: -300, opacity: 0 },
      animate: { y: 0, opacity: 1 }
    },
    bottom: {
      initial: { y: 300, opacity: 0 },
      animate: { y: 0, opacity: 1 }
    }
  };

  const scrollToExplaineSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionRect = section.getBoundingClientRect();
      const offset = sectionRect.top + window.scrollY - (window.innerHeight / 2) + (sectionRect.height / 2);
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  const handleTooltipClick = () => {
    setShowTooltip(false);
  };


  return (
    <div className="main-container">
      {/* menu section */}
      <header className="header">
        <nav className="navbar">
          <div onClick={handleMainClick} className="title home-link" title="HOME으로 이동">zzjae's</div>
          <ul className="nav-menu">
            <li onClick={handleMainClick} className="nav-link home-link">HOME</li>
            <li onClick={handleCharacteristicClick} className="nav-link">MBTI 특징</li>
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

      {showTooltip && (
        <div className="tooltip" onClick={handleTooltipClick}>
          <p>낭코서에게 내 고민을 말하고 고민을 해결할 수 있어요!</p>
        </div>
      )}

      {/* 스크롤 버튼 */}
      <div className="scroll-buttons">
        <button onClick={handleScrollUp} className="scroll-btn" title="위로 이동">▲</button>
        <button onClick={handleScrollDown} className="scroll-btn" title="아래로 이동">▼</button>
      </div>

      {/* main1 */}
      <div id="section1" className="welcome-section">
        <div>
          {mbtiData ? (
            <><div className='welcome'>
              <p className='mn'>{mbtiData.ie}{mbtiData.sn}{mbtiData.tf}{mbtiData.jp} - {member.nickname}님</p>
              <p className='mn'> 안녕하세요!</p>
              <p className='mn-2'>MBTI와 관련된 여러가지 기능들을 사용해 보세요!!</p>
            </div>
            </>
          ) : (
            <>
              <div className='description'>
              <p>MBTI 검사 결과가 존재하지 않습니다.</p> 
              <p>MBTI검사를 진행해 보세요!</p>
              <p>MBTI 검사를 하고 아래의 활동들을 해보세요!</p>
              <button onClick={handleTestClick} className="mbtitest-btn">MBTI 검사하러 가기</button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="divider"></div>

      {/* 컨텐츠 전체 설명 */}
      <div id="section2" className="content-explainer">
        <h1>이런걸 할 수 있어요!</h1>
        <div className="function-section" onClick={() => scrollToExplaineSection('section3')}>
          <h2>1. MBTI 특징 확인!</h2>
          <img src={characteristicImg} alt="MBTI Characteristic" className="function-img" onClick={() => scrollToExplaineSection('section3')}/>
        </div>
        <div className="function-section" onClick={() => scrollToExplaineSection('section4')}>
          <h2>2. 쉽고 빠르게 하는 MBTI 검사!</h2>
          <img src={mbtiTestImg} alt="MBTI Test" className="function-img" onClick={() => scrollToExplaineSection('section4')}/>
        </div>
        <div className="function-section" onClick={() => scrollToExplaineSection('section5')}>
          <h2>3. 내 MBTI 변화량 그래프!</h2>
          <img src={myChangeImg} alt="My Change" className="function-img" onClick={() => scrollToExplaineSection('section5')}/>
        </div>
        <div className="function-section" onClick={() => scrollToExplaineSection('section6')}>
          <h2>4. MBTI 별 게시판!</h2>
          <img src={mbtiBoardImg} alt="MBTI Board" className="function-img" onClick={() => scrollToExplaineSection('section6')}/>
        </div>
        <div className="function-section" onClick={() => scrollToExplaineSection('section7')}>
          <h2>5. 고민해결사 낭코즈!</h2>
          <img src={cosImg} alt="Chat" className="function-img" onClick={() => scrollToExplaineSection('section7')}/>
        </div>
      </div>

      <div className="divider"></div>

      {/* MBTI 특징 페이지 설명 */}
      <div id="section3" className="characteristic-explane">
        <div className="characteristic-images">
          <motion.img
            src={characteristicImg}
            alt="characteristic"
            className="characteristic-explane-img"
            initial="initial"
            whileInView="animate"
            viewport={{ once: false }}
            variants={variants.left}
            transition={{
              ease: "easeInOut",
              duration: 0.8,
              y: { duration: 1 },
            }}
            onClick={handleCharacteristicClick}
          />
          <motion.img
            src={mbtiCharacteristicImg}
            alt="mbtiCharacteristic"
            className="mbtiCharacteristic-explane-img"
            initial="initial"
            whileInView="animate"
            viewport={{ once: false }}
            variants={variants.left}
            transition={{
              ease: "easeInOut",
              duration: 0.8,
              y: { duration: 1 },
            }}
            onClick={handleCharacteristicClick}
          />
        </div>
        <motion.div
          className="characteristic-explane-description"
          initial="initial"
          whileInView="animate"
          viewport={{ once: false }}
          variants={variants.right}
          transition={{
            ease: "easeInOut",
            duration: 0.8,
            y: { duration: 1 },
          }}
        >
          <h2>MBTI별 특징</h2>
          <h3>내 MBTI는 어떤 특징을 가지고 있는지 확인해 보세요!</h3>
        </motion.div>
      </div>


      <div className="divider"></div>

      {/* MBTI 검사 설명*/}
      <div id="section4" className="mbtiTest-explane">
        <motion.div
          className="mbtiTest-explane-description"
          initial="initial"
          whileInView="animate"
          viewport={{ once: false }}
          variants={variants.left}
          transition={{
            ease: "easeInOut",
            duration: 0.8,
            y: { duration: 1 },
          }}
        >
          <h2>MBTI 검사</h2>
          <h3>MBTI 검사를 간단하게 한 후 내 MBTI 검사 결과를 확인 하세요!</h3>
        </motion.div>
        <div className="mbtiTest-images">
          <motion.img
            src={mbtiTestImg}
            alt="MBTI Test"
            className="mbtiTest-explane-img"
            initial="initial"
            whileInView="animate"
            viewport={{ once: false }}
            variants={variants.right}
            transition={{
              ease: "easeInOut",
              duration: 0.8,
              y: { duration: 1 },
            }}
            onClick={handleTestClick}
          />
          <motion.img
            src={mbtiTestResultImg}
            alt="MBTI Test Result"
            className="mbtiTestResult-explane-img"
            initial="initial"
            whileInView="animate"
            viewport={{ once: false }}
            variants={variants.right}
            transition={{
              ease: "easeInOut",
              duration: 0.8,
              y: { duration: 1 },
            }}
            onClick={handleTestClick}
          />
        </div>

      </div>

      <div className="divider"></div>

      {/* 내 MBTI 변화량 설명 */}
      <div id="section5" className="myChange-explane">
        <motion.img
          src={myChangeImg}
          alt="My MBTI Change"
          className="myChange-explane-img"
          initial="initial"
          whileInView="animate"
          viewport={{ once: false }}
          variants={variants.left}
          transition={{
            ease: "easeInOut",
            duration: 0.8,
            y: { duration: 1 },
          }}
          onClick={handleMyChangeClick}
        />
        <motion.div
          className="myChange-explane-description"
          initial="initial"
          whileInView="animate"
          viewport={{ once: false }}
          variants={variants.right}
          transition={{
            ease: "easeInOut",
            duration: 0.8,
            y: { duration: 1 },
          }}
        >
          <h2>내 MBTI 변화량</h2>
          <h3>계속해서 바뀌는 내 MBTI의 변화를 확인 하세요!</h3>
        </motion.div>
      </div>

      <div className="divider"></div>

      {/* MBTI 게시판 설명*/}
      <div id="section6" className="mbtiBoard-explane">
        <motion.img
          src={mbtiBoardImg}
          alt="MBTI Board"
          className="mbtiBoard-explane-img"
          initial="initial"
          whileInView="animate"
          viewport={{ once: false }}
          variants={variants.left}
          transition={{
            ease: "easeInOut",
            duration: 0.8,
            y: { duration: 1 },
          }}
          onClick={handleMbtiBoardClick}
        />
        <motion.div
          className="mbtiBoard-explane-description"
          initial="initial"
          whileInView="animate"
          viewport={{ once: false }}
          variants={variants.right}
          transition={{
            ease: "easeInOut",
            duration: 0.8,
            y: { duration: 1 },
          }}
        >
          <h2>MBTI별 게시판</h2>
          <h3>나와 MBTI가 같은 사람들 만의 게시판을 사용해 보세요!</h3>
        </motion.div>
      </div>

      <div className="divider"></div>

      {/* 낭코즈 설명*/}
      <div id="section7" className="cos-explane">
        <div className="cos-images">
          <motion.img
            src={cosImg}
            alt="Cos"
            className="cos-explane-img"
            initial="initial"
            whileInView="animate"
            viewport={{ once: false }}
            variants={variants.left}
            transition={{
              ease: "easeInOut",
              duration: 0.8,
              y: { duration: 1 },
            }}
            onClick={handleCosClick}
          />
          <div className='direction'>↓</div>
          <motion.img
            src={cosResultImg}
            alt="Cos Result"
            className="cosResult-explane-img"
            initial="initial"
            whileInView="animate"
            viewport={{ once: false }}
            variants={variants.left}
            transition={{
              ease: "easeInOut",
              duration: 0.8,
              y: { duration: 1 },
            }}
            onClick={handleCosClick}
          />
        </div>
        <motion.div
          className="cos-explane-description"
          initial="initial"
          whileInView="animate"
          viewport={{ once: false }}
          variants={variants.right}
          transition={{
            ease: "easeInOut",
            duration: 0.8,
            y: { duration: 1 },
          }}
        >
          <h2>고민해결사 낭코즈</h2>
          <h3>고민해결사 낭코즈에게 고민을 말해보세요!</h3>
        </motion.div>
      </div>
    </div>
  );
}

export default Main;