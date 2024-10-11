import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/MbtiBoard.css';

const MbtiBoard = () => {
  const [member, setMember] = useState(null);
  const [mbtiData, setMbtiData] = useState(null);
  const [boardType, setBoardType] = useState('my');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [currentPostingPage, setCurrentPostingPage] = useState(0);
  const postingsPerPage = 10;
  const [applySorting, setApplySorting] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('input_date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTitle, setSearchTitle] = useState('');
  const [isSearching, setIsSearching] = useState(false);

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

  const fetchPosts = useCallback((type, criteria, order) => {
    let url;
    if (type === 'my' && member) {
      switch (criteria) {
        case 'input_date':
          url = order === 'asc'
            ? `${process.env.REACT_APP_BACKEND_URL}/post/uda/${member.u_id}`
            : `${process.env.REACT_APP_BACKEND_URL}/post/udd/${member.u_id}`;
          break;
        case 'views':
          url = order === 'asc'
            ? `${process.env.REACT_APP_BACKEND_URL}/post/uva/${member.u_id}`
            : `${process.env.REACT_APP_BACKEND_URL}/post/uvd/${member.u_id}`;
          break;
        case 'comments':
          url = order === 'asc'
            ? `${process.env.REACT_APP_BACKEND_URL}/post/uca/${member.u_id}`
            : `${process.env.REACT_APP_BACKEND_URL}/post/ucd/${member.u_id}`;
          break;
        default:
          url = `${process.env.REACT_APP_BACKEND_URL}/post/u/${member.u_id}`;
      }
    } else {
      switch (criteria) {
        case 'input_date':
          url = order === 'asc'
            ? `${process.env.REACT_APP_BACKEND_URL}/post/tda/${type}`
            : `${process.env.REACT_APP_BACKEND_URL}/post/tdd/${type}`;
          break;
        case 'views':
          url = order === 'asc'
            ? `${process.env.REACT_APP_BACKEND_URL}/post/tva/${type}`
            : `${process.env.REACT_APP_BACKEND_URL}/post/tvd/${type}`;
          break;
        case 'comments':
          url = order === 'asc'
            ? `${process.env.REACT_APP_BACKEND_URL}/post/tca/${type}`
            : `${process.env.REACT_APP_BACKEND_URL}/post/tcd/${type}`;
          break;
        default:
          url = `${process.env.REACT_APP_BACKEND_URL}/post/t/${type}`;
      }
    }
    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        const updateCommentsPromises = data.map(post =>
          fetch(`${process.env.REACT_APP_BACKEND_URL}/post/r/${post.post_id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          })
        );
        Promise.all(updateCommentsPromises)
          .then(() => {
            setPosts(data);
          })
          .catch(error => console.error('Error updating comments count:', error));
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, [member]);

  useEffect(() => {
    if (applySorting && !isSearching) {
      fetchPosts(boardType, sortCriteria, sortOrder);
      setApplySorting(false); // Reset after applying sorting
    }
  }, [applySorting, boardType, sortCriteria, sortOrder, isSearching, fetchPosts]);

  const fetchPostsByTitle = useCallback((title) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/post/tt/${title}`;
    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        const updateCommentsPromises = data.map(post =>
          fetch(`${process.env.REACT_APP_BACKEND_URL}/post/r/${post.post_id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          })
        );
        Promise.all(updateCommentsPromises)
          .then(() => {
            setPosts(data);
            setIsSearching(true);
          })
          .catch(error => console.error('Error updating comments count:', error));
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

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

  const handlePostStartClick = () =>{
    navigate('/Post');
  }
  const handleOutClick = () => {
    if(window.confirm('정말 로그아웃 하시겠습니까?')){
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/logout`;
    }
  };
  const handleStartClick = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
  };

  const handleBoardClick = (type) => {
    if (type !== 'my' && mbtiData) {
      const accessibleBoards = [mbtiData.ie, mbtiData.sn, mbtiData.tf, mbtiData.jp];
      if (!accessibleBoards.includes(type)) {
        alert('접근할 수 없는 게시판입니다.');
        return;
      }
    }
    setBoardType(type);
    setApplySorting(true);
  };

  const handleViewPostClick = (postId) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/post/v/${postId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          navigate(`/posting/${postId}`);
        } else {
          throw new Error('Failed to update post views');
        }
      })
      .catch(error => console.error('Error updating post views:', error));
  };

  const totalPages = Math.ceil(posts.length / postingsPerPage);
  const currentPosts = posts.slice(currentPostingPage * postingsPerPage, (currentPostingPage + 1) * postingsPerPage);

  const handlePreviousPage = () => {
    setCurrentPostingPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPostingPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleApplySorting = () => {
    setIsSearching(false);
    setApplySorting(true);
  };

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleSearch = () => {
    fetchPostsByTitle(searchTitle);
  };
  const handleResetSorting = () => {
    setSortCriteria('input_date');
    setSortOrder('asc');
    setApplySorting(true);
  };

  const handleResetSearch = () => {
    setSearchTitle('');
    setIsSearching(false);
    setApplySorting(true);
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

      <div className='board-container'>
        <div className="sidebar">
          <h1>MBTI 게시판</h1>
          <button onClick={() => handleBoardClick('my')}>내 글 보기</button>
          {mbtiData && (
            <>
              <button onClick={() => handleBoardClick(mbtiData.ie)}>{mbtiData.ie} 게시판</button>
              <button onClick={() => handleBoardClick(mbtiData.sn)}>{mbtiData.sn} 게시판</button>
              <button onClick={() => handleBoardClick(mbtiData.tf)}>{mbtiData.tf} 게시판</button>
              <button onClick={() => handleBoardClick(mbtiData.jp)}>{mbtiData.jp} 게시판</button>
            </>
          )}
        </div>
        <div className="board-section">
          <h1>{boardType.toUpperCase()} 게시판</h1>
          <div className="sort-options">
            <label>
              정렬 기준:
              <select value={sortCriteria} onChange={handleSortChange}>
                <option value="input_date">작성일</option>
                <option value="views">조회수</option>
                <option value="comments">댓글수</option>
              </select>
            </label>
            <label>
              정렬 순서:
              <select value={sortOrder} onChange={handleOrderChange}>
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
              </select>
            </label>
            <button onClick={handleApplySorting} className='apply-btn'>적용</button>
            <button onClick={handleResetSorting} className='reset-btn'>정렬 초기화</button>
          </div>
          <div className="search-options">
            <input
              type="text"
              value={searchTitle}
              onChange={handleSearchTitleChange}
              placeholder="제목으로 검색"
            />
            <button onClick={handleSearch} className='search-btn'>검색</button>
            <button onClick={handleResetSearch} className='reset-btn'>검색 초기화</button>
          </div>
          <table className="board-table">
            <thead>
              <tr>
                <th>제목</th>
                <th>글쓴이</th>
                <th>MBTI</th>
                <th>작성일</th>
                <th>조회수</th>
                <th>댓글수</th>
                <th>자세히</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr key={post.post_id}>
                  <td>{post.title}</td>
                  <td>{post.nickname}</td>
                  <td>{post.board_type.toUpperCase()}</td>
                  <td>{new Date(post.post_date).toLocaleDateString()}</td>
                  <td>{post.views}</td>
                  <td>{post.comments}</td>
                  <td>
                    <button className="view-btn" onClick={() => handleViewPostClick(post.post_id)}>자세히 보기</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={currentPostingPage === 0}>이전</button>
              <span>{currentPostingPage + 1} / {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPostingPage === totalPages - 1}>다음</button>
            </div>
          )}
          <div className="post-start">
            <button onClick={handlePostStartClick} className='post-btn'>글 쓰기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MbtiBoard;