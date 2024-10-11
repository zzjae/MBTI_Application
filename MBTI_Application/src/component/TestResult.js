import React, { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './CSS/TestResult.css';
import html2canvas from 'html2canvas';
import { FacebookShareButton, TwitterShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon } from 'react-share';

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

const TestResult = () => {
  const [mbtiData, setMbtiData] = useState(null);
  const [feature, setFeature] = useState({
    subNickName: "검사결과"
  });
  const [member, setMember] = useState(null);
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
          setMbtiData(data);
          if (data) {
            const { ie, sn, tf, jp } = data;
            const mbtiType = `${ie}${sn}${tf}${jp}`;
            fetch(`${process.env.REACT_APP_BACKEND_URL}/featureDescription/${mbtiType}`, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then(response => response.json())
              .then(data1 => {
                if (data1 && data1.length > 0) setFeature(data1[0]);
              })
              .catch(error => console.error('Error fetching feature data:', error));
          }
        })
        .catch(error => console.error('Error:', error));
    }
  }, [member]);

  useEffect(() => {
    if (mbtiData) {
      const { ie, sn, tf, jp } = mbtiData;
      const mbtiType = `${ie}${sn}${tf}${jp}`;
      fetch(`${process.env.REACT_APP_BACKEND_URL}/featureDescription/${mbtiType}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0) setFeature(data[0]);
        })
        .catch(error => console.error('Error fetching feature data:', error));
    }
  }, [mbtiData]);

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_SHARE);
      console.log('Kakao initialized');
    }
  }, []);


  if (!mbtiData) {
    return <div>Loading...</div>;
  }

  const { ie, sn, tf, jp, ie_percent, sn_percent, tf_percent, jp_percent } = mbtiData;
  const mbtiType = `${ie}${sn}${tf}${jp}`;
  const mbtiUrl = `${window.location.origin}/Mbti_characteristic/${mbtiData ? `${mbtiData.ie}${mbtiData.sn}${mbtiData.tf}${mbtiData.jp}`.toLowerCase() : ''}`;
  const title = `나의 MBTI 결과는 ${mbtiType}!`;

  const data = {
    labels: [ie, sn, tf, jp],
    datasets: [
      {
        data: [ie_percent, sn_percent, tf_percent, jp_percent],
        backgroundColor: ['#7E7E7E', '#4CAF50', '#3F51B5', '#2196F3'],
      },
    ],
  };
  const options = {
    indexAxis: 'x',
    scales: {
      y: {
        max: 100,
        min: 0,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw}%`;
          },
        },
      },
    },
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

  const handleMyCharacteristicClick = () => navigate(`/Mbti_characteristic/${mbtiData ? `${mbtiData.ie}${mbtiData.sn}${mbtiData.tf}${mbtiData.jp}`.toLowerCase() : ''}`);

  const handleSaveAsImage = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'mbti-result.png';
        link.click();
      });
    }
  };

  const handleKakaoShare = () => {
    const mbtiUrl = `${window.location.origin}/Mbti_characteristic/${mbtiData ? `${mbtiData.ie}${mbtiData.sn}${mbtiData.tf}${mbtiData.jp}`.toLowerCase() : ''}`;
    try {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: `나의 MBTI 결과는 ${mbtiType}!`,
          description: feature.short_description,
          imageUrl: illustrations[mbtiType.toLowerCase()],
          link: {
            mobileWebUrl: mbtiUrl,
            webUrl: mbtiUrl,
          },
        },
        buttons: [
          {
            title: 'MBTI 특징 보러가기',
            link: {
              mobileWebUrl: mbtiUrl,
              webUrl: mbtiUrl,
            },
          },
        ],
      });
    } catch (error) {
      console.error('Error sharing via Kakao:', error);
    }
  };

  return (
    <div className="result-page">
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

      <div ref={captureRef}>
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
        <div className="mbti-type-description">
          <h2>{mbtiType} ({feature.subNickName})</h2>
          <p className='mbti-subtitle'>{feature.short_description}</p>
          <div className="image-container">
            <img src={illustrations[mbtiType.toLowerCase()] || '/path/to/default/image.png'} alt={`${mbtiType} illustration`} className='mbti-image' />
          </div>
          <button className="characteristic-btn" onClick={handleMyCharacteristicClick}>내 MBTI특징 보러 가기</button>
        </div>
      </div>

      <button onClick={handleKakaoShare} className="kakao-share-btn">카카오톡 공유</button>
      <button onClick={handleSaveAsImage} className="save-image-btn">이미지로 저장</button>

      <div className="share-buttons">
        <FacebookShareButton url={mbtiUrl} quote={title}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={mbtiUrl} title={title}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <EmailShareButton url={mbtiUrl} subject="나의 MBTI 결과" body={title}>
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default TestResult;