import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Mypage.css';

const Mypage = () => {
  const [member, setMember] = useState(null);
  const [mbtiData, setMbtiData] = useState(null);
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

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
          if (data && data.ie) {
            setMbtiData(data);
          } else {
            setMbtiData(null);
          }
        })
        .catch(error => {
          console.error('Error fetching MBTI data:', error);
          setMbtiData(null);
        });
    } else {
      setMbtiData(null);
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
        alert('MBTI 검사를 먼저 진행해주세요!');
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
        alert('MBTI 검사를 먼저 진행해주세요!');
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
  };

  const handleCosClick = () => {
    if (member) {
      if (mbtiData) {
        navigate('/Cos');
      } else {
        alert('MBTI 검사를 먼저 진행해주세요!');
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

  const handleNicknameChange = () => {
    if (!window.confirm('정말 닉네임을 변경하시겠습니까?')) {
      return;
    }
    if (nickname && member && member.u_id) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/member/checkNickName/${nickname}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then(response => response.json())
        .then(isDuplicate => {
          if (isDuplicate) {
            alert('이미 사용 중인 닉네임입니다.');
          } else {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/member/n/${member.u_id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ nickname }),
              credentials: 'include',
            })
              .then(response => response.json())
              .then(data => {
                setMember(data);
                setNickname('');
                alert("닉네임이 변경 되었습니다!");
                window.location.reload();
              })
              .catch(error => console.error('Error updating nickname:', error));
          }
        })
        .catch(error => console.error('Error checking nickname:', error));
    }
  };
  
  const handlePasswordChange = () => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!window.confirm('정말 비밀번호를 변경하시겠습니까?')) {
      return;
    }
    if (!passwordPattern.test(newPassword)) {
      alert('비밀번호는 최소 8자, 하나 이상의 대문자, 소문자, 숫자 및 특수 문자를 포함해야 합니다.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (currentPassword && newPassword && member && member.u_id) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/member/validatePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: member.user_id, currentPassword }),
        credentials: 'include',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('현재 비밀번호가 일치하지 않습니다.');
          }
          return fetch(`${process.env.REACT_APP_BACKEND_URL}/member/p/${member.u_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_password: newPassword }),
            credentials: 'include',
          });
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update password');
          }
          return response.json();
        })
        .then(() => {
          setCurrentPassword('');
          setNewPassword('');
          setConfirmNewPassword('');
          alert('비밀번호가 변경 되었습니다!');
        })
        .catch(error => console.error('Error updating password:', error));
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

      <div className="mypage-section">
        <h2>마이페이지</h2>
        <div className="update-section">
          <h3>닉네임 변경</h3>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="새로운 닉네임을 입력해 주세요!"
          />
          <button onClick={handleNicknameChange}>닉네임 변경</button>
        </div>
        <div className="update-section">
          <h3>비밀번호 변경</h3>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호를 입력해 주세요"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새로운 비밀번호를 입력해 주세요!"
          />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="새로운 비밀번호를 다시 입력해 주세요!"
          />
          <button onClick={handlePasswordChange}>비밀번호 변경</button>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
