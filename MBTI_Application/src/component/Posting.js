import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CSS/Posting.css';

const Posting = () => {
  const [member, setMember] = useState(null);
  const [mbtiData, setMbtiData] = useState(null);
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const navigate = useNavigate();
  const [currentCommentPage, setCurrentCommentPage] = useState(0);
  const commentsPerPage = 10;
  const [sortOrder, setSortOrder] = useState('asc');
  const [applySorting, setApplySorting] = useState(false);

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

  useEffect(() => {
    if (postId) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/post/pd/${postId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setPost(data);
        })
        .catch(error => console.error('Error fetching post data:', error));
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/comment/dp/${postId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setComments(data);
        })
        .catch(error => console.error('Error fetching comments:', error));
    }
  }, [postId]);

  const fetchComments = useCallback((order) => {
    const url = order === 'asc'
      ? `${process.env.REACT_APP_BACKEND_URL}/comment/dpda/${postId}`
      : `${process.env.REACT_APP_BACKEND_URL}/comment/dpdd/${postId}`;

    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setComments(data);
      })
      .catch(error => console.error('Error fetching comments:', error));
  }, [postId]);

  useEffect(() => {
    if (applySorting) {
      fetchComments(sortOrder);
      setApplySorting(false); // Reset after applying sorting
    }
  }, [applySorting, sortOrder, fetchComments]);

  useEffect(() => {
    if (postId) {
      fetchComments(sortOrder);
    }
  }, [postId, sortOrder, fetchComments]);

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
  const handleBackClick = () => {
    navigate(-1);
  };
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleEditClick = () => {
    navigate(`/updatePost/${postId}`);
  };
  const offset = new Date().getTimezoneOffset() * 60000;
  const currentDate = new Date(Date.now() - offset);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const commentData = {
      post_id: postId,
      u_id: member.u_id,
      content: newComment,
      comment_date: currentDate.toISOString()
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/comment`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then(response => response.json())
      .then(data => {
        setNewComment('');
        fetchComments(sortOrder); // Refetch comments with current sort order
      })
      .catch(error => console.error('Error posting comment:', error));
  };

  const handleCommentEdit = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditingCommentContent(content);
  };

  const handleEditCommentChange = (e) => {
    setEditingCommentContent(e.target.value);
  };

  const handleEditCommentSubmit = (e, commentId) => {
    if (window.confirm('정말로 댓글을 수정 하시겠습니까?')) {
    e.preventDefault();
    if (editingCommentContent.trim() === '') return;

    const commentData = {
      content: editingCommentContent,
      comment_date: currentDate.toISOString()
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/comment/${commentId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then(response => response.json())
      .then(data => {
        setEditingCommentId(null);
        setEditingCommentContent('');
        fetchComments(sortOrder); // Refetch comments with current sort order
      })
      .catch(error => console.error('Error editing comment:', error));
    }
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm('정말로 댓글을 삭제하시겠습니까?')) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/comment/${commentId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            alert("댓글이 삭제되었습니다!");
            setComments(prevComments =>
              prevComments.filter(comment => comment.comment_id !== commentId)
            );
          } else {
            throw new Error('Failed to delete comment');
          }
        })
        .catch(error => console.error('Error deleting comment:', error));
    }
  };

  const handleDeletePost = () => {
    if (window.confirm('정말로 게시글을 삭제하시겠습니까?')) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/post/${postId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          alert("게시글 삭제가 완료되었습니다!");
          navigate('/MbtiBoard');
        })
        .catch(error => console.error('Error deleting post:', error));
    }
  };

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const currentComments = comments.slice(currentCommentPage * commentsPerPage, (currentCommentPage + 1) * commentsPerPage);

  const handlePreviousPage = () => {
    setCurrentCommentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentCommentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    setApplySorting(true); // Trigger sorting
  };

  const handleResetSorting = () => {
    setSortOrder('asc');
    setApplySorting(true); // Trigger sorting
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

      <div className="posting-section">
        {post ? (
          <>
            <h1>제목: {post.title}</h1>
            <div className="post-content">
              {post.content}
            </div>
            <div className='button-section'>
              {member && post.nickname === member.nickname && (
                <>
                  <button onClick={handleEditClick} className="update-btn">수정</button>
                  <button onClick={handleDeletePost} className="delete-btn">삭제</button>
                </>
              )}
            </div>
          </>
        ) : (
          <p>글을 가져오고 있습니다!</p>
        )}
      </div>
      <div className="divider"></div>
      <div className="comment-section">
        <h2>댓글</h2>
        <div className="sort-options">
          <label>
            정렬 순서:
            <select value={sortOrder} onChange={handleSortOrderChange}>
              <option value="asc">날짜 오름차순</option>
              <option value="desc">날짜 내림차순</option>
            </select>
          </label>
          <button onClick={handleResetSorting} className='reset-btn-posting'>정렬 초기화</button>
        </div>
        {currentComments.length > 0 ? (
          currentComments.map(comment => (
            <div key={comment.comment_id} className="comment">
              <p><strong>{comment.nickname}</strong> ({new Date(comment.comment_date).toLocaleString()})</p>
              <p>{comment.content}</p>
              {member && comment.u_id === member.u_id && (
                <>
                  {editingCommentId === comment.comment_id ? (
                    <form onSubmit={(e) => handleEditCommentSubmit(e, comment.comment_id)} className="edit-comment-form">
                      <textarea
                        className='update-comment-textarea'
                        value={editingCommentContent}
                        onChange={handleEditCommentChange}
                        required
                      ></textarea>
                      {/* <button type="submit" className='update-btn'>수정 완료</button> */}
                      <div className='submit-block'>
          <button type="submit" className="post-submit-btn">수정하기</button>
        </div>
                    </form>
                  ) : (
                    <>
                      <button onClick={() => handleCommentEdit(comment.comment_id, comment.content)} className="update-btn">수정</button>
                      <button onClick={() => handleDeleteComment(comment.comment_id)} className="delete-btn">삭제</button>
                    </>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p>아직 댓글이 없습니다!</p>
        )}
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentCommentPage === 0}>이전</button>
            <span>{currentCommentPage + 1} / {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentCommentPage === totalPages - 1}>다음</button>
          </div>
        )}
        {member && (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="댓글을 입력해 주세요!"
              required
            ></textarea>
            <button type="submit" className='submit-comment-btn'>댓글 작성</button>
          </form>
        )}
      </div>
      <div className="divider"></div>
      <div className='back-section'><button onClick={handleBackClick} className="back-btn">뒤로가기</button>
      </div>
    </div>
  );
}

export default Posting;