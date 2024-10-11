import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Post.css';

const Post = () => {
  const [member, setMember] = useState(null);
  const [mbtiData, setMbtiData] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if (data && data.nickname) {
          setMember(data);
        }
      })
      .catch(error => console.error('Error fetching user data:', error));
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
    if (window.confirm('정말 로그아웃 하시겠습니까?')) {
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/logout`;
    }
  };
  const handleStartClick = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
  };

  const offset = new Date().getTimezoneOffset() * 60000;
  const currentDate = new Date(Date.now() - offset);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const postData = {
      board_type: selectedBoard,
      title: postTitle,
      content: postContent,
      post_date: currentDate.toISOString(),
      u_id: member.u_id
    };
    console.log('Submitting post data:', postData);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/post`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(data => {
        alert('게시글이 성공적으로 작성되었습니다.');
        console.log('Success:', data);
        setPostTitle('');
        setPostContent('');
        setSelectedBoard('');
        navigate('/MbtiBoard');
      })
      .catch(error => {
        console.error('Error submitting post:', error);
        alert('게시글 작성 중 오류가 발생했습니다.');
      });
  };

  const handleBackClick = () => {
    navigate(-1);
  }

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
            <li onClick={handleMbtiBoardClick} className="nav-link board-link">MBTI 별 게시판</li>
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

      <div className="post-section">
        <h1>게시글 작성</h1>
        {member ? (
          <>
            {mbtiData ? (
              <>
                <div className="poster-info">MBTI : {mbtiData.ie}{mbtiData.sn}{mbtiData.tf}{mbtiData.jp}</div>
              </>
            ) : null}
            <div className="poster-info">닉네임 : {member.nickname}</div>
          </>
        ) : null}
        <form onSubmit={handlePostSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="selectedBoard">게시판 선택:</label>
            <select
              id="selectedBoard"
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className='selectedBoard'
              required
            >
              <option value="">게시판을 선택해 주세요</option>
              {mbtiData && (
                <>
                  <option value={mbtiData.ie}>{mbtiData.ie}</option>
                  <option value={mbtiData.sn}>{mbtiData.sn}</option>
                  <option value={mbtiData.tf}>{mbtiData.tf}</option>
                  <option value={mbtiData.jp}>{mbtiData.jp}</option>
                </>
              )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="postTitle">제목:</label>
            <input
              type="text"
              id="postTitle"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              required
              placeholder='제목을 입력해 주세요!'
            />
          </div>
          <div className="form-group">
            <label htmlFor="postContent">내용:</label>
            <textarea
              id="postContent"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              required
              placeholder='내용을 입력해 주세요!'
              className='content-textarea'
            ></textarea>
          </div>
          {/* <div className="form-group-submit">
            <button type="submit" className="post-submit-btn">제출</button>
          </div> */}
          <div className='submit-block'>
            <button type="submit" className="post-submit-btn">제출</button>
          </div>
        </form>
      </div>


      <div className='back-btn-wrapper'>
        <button className='back-btn' onClick={handleBackClick}>뒤로 가기</button>
      </div>

    </div>
  );
}

export default Post;