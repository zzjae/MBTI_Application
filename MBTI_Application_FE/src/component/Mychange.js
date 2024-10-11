import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import './CSS/Mychange.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Mychange = () => {
  const [member, setMember] = useState(null);
  const [data, setData] = useState([]);
  const [mbtiData, setMbtiData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if (data && data.nickname) {
          setMember(data);
          fetchData(data.u_id);
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

  const fetchData = (u_id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/mbti/limit/${u_id}`, { credentials: 'include' })
      .then(response => response.json())
      .then(mbtiData => setData(mbtiData))
      .catch(error => console.error('Error fetching MBTI data:', error));
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.3,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value, index, values) {
            return value + '%';
          },
          font: {
            size: 15,
            family: 'GmarketSansMedium'
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 15,
            family: 'GmarketSansMedium'
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 30
          }
        }
      },
      title: {
        display: true,
        text: '',
      },
    },
  };

  const labels = data.map(d => new Date(d.input_date).toLocaleDateString());

  const ieData = data.map(d => {
    if (d.ie === 'e') {
      return { e: d.ie_percent, i: 100 - d.ie_percent };
    } else {
      return { i: d.ie_percent, e: 100 - d.ie_percent };
    }
  });

  const snData = data.map(d => {
    if (d.sn === 's') {
      return { s: d.sn_percent, n: 100 - d.sn_percent };
    } else {
      return { n: d.sn_percent, s: 100 - d.sn_percent };
    }
  });

  const tfData = data.map(d => {
    if (d.tf === 't') {
      return { t: d.tf_percent, f: 100 - d.tf_percent };
    } else {
      return { f: d.tf_percent, t: 100 - d.tf_percent };
    }
  });

  const jpData = data.map(d => {
    if (d.jp === 'j') {
      return { j: d.jp_percent, p: 100 - d.jp_percent };
    } else {
      return { p: d.jp_percent, j: 100 - d.jp_percent };
    }
  });

  const chartIEDatasets = [
    {
      label: 'I',
      data: ieData.map(d => d.i),
      borderColor: 'rgb(127, 140, 141)',
      backgroundColor: 'rgba(127, 140, 141, 0.5)',
      borderWidth: 5,
      pointRadius: 5
    },
    {
      label: 'E',
      data: ieData.map(d => d.e),
      borderColor: 'rgb(241, 196, 15)',
      backgroundColor: 'rgba(241, 196, 15, 0.5)',
      borderWidth: 5,
      pointRadius: 5
    }
  ];

  const chartSNDatasets = [
    {
      label: 'S',
      data: snData.map(d => d.s),
      borderColor: 'rgb(39, 174, 96)',
      backgroundColor: 'rgba(39, 174, 96, 0.5)',
      borderWidth: 5,
      pointRadius: 5
    },
    {
      label: 'N',
      data: snData.map(d => d.n),
      borderColor: 'rgb(155, 89, 182)',
      backgroundColor: 'rgba(155, 89, 182, 0.5)',
      borderWidth: 5,
      pointRadius: 5
    }
  ];

  const chartTFDatasets = [
    {
      label: 'T',
      data: tfData.map(d => d.t),
      borderColor: 'rgb(52, 73, 94)',
      backgroundColor: 'rgba(52, 73, 94, 0.5)',
      borderWidth: 5,
      pointRadius: 5
    },
    {
      label: 'F',
      data: tfData.map(d => d.f),
      borderColor: 'rgb(231, 76, 60)',
      backgroundColor: 'rgba(231, 76, 60, 0.5)',
      borderWidth: 5,
      pointRadius: 5
    }
  ];

  const chartJPDatasets = [
    {
      label: 'J',
      data: jpData.map(d => d.j),
      borderColor: 'rgb(41, 128, 185)',
      backgroundColor: 'rgba(41, 128, 185, 0.5)',
      borderWidth: 5,
      pointRadius: 5
    },
    {
      label: 'P',
      data: jpData.map(d => d.p),
      borderColor: 'rgb(243, 156, 18)',
      backgroundColor: 'rgba(243, 156, 18, 0.5)',
      borderWidth: 5,
      pointRadius: 5
    }
  ];
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

  return (
    <div className="main-container">
      {/* menu section */}
      <header className="header">
        <nav className="navbar">
          <div onClick={handleMainClick} className="title">zzjae's</div>
          <ul className="nav-menu">
            <li onClick={handleMainClick} className="nav-link">HOME</li>
            <li onClick={handleCharacteristicClick} className="nav-link">MBTI 특징</li>
            <li onClick={handleTestClick} className="nav-link">MBTI 검사</li>
            <li onClick={handleMyChangeClick} className="nav-link change-link">내 MBTI 변화량</li>
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

      <div className="chart-section">
        <div className="change-chart-container">
          <Line
            options={options}
            data={{
              labels,
              datasets: chartIEDatasets
            }}
          />
        </div>
        <div className="change-chart-container">
          <Line
            options={options}
            data={{
              labels,
              datasets: chartSNDatasets
            }}
          />
        </div>
        <div className="change-chart-container">
          <Line
            options={options}
            data={{
              labels,
              datasets: chartTFDatasets
            }}
          />
        </div>
        <div className="change-chart-container">
          <Line
            options={options}
            data={{
              labels,
              datasets: chartJPDatasets
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Mychange;
