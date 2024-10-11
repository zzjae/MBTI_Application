import React from 'react';
import Main from './component/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Characteristic from './component/Characteristic';
import MbtiTest from './component/MbtiTest';
import TestResult from './component/TestResult';
import Mychange from './component/Mychange';
import MbtiBoard from './component/MbtiBoard';
import Mbti from './component/Mbti_characteristic';
import Post from './component/Post';
import Posting from './component/Posting';
import UpdatePost from './component/UpdatePost';
import Mypage from './component/Mypage';
import Cos from './component/Cos'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Main" element={<Main />} />
        <Route path="/" element={<Main />} />
        <Route path="/Characteristic" element={<Characteristic />} />
        <Route path="/MbtiTest" element={<MbtiTest />} />
        <Route path="/TestResult" element={<TestResult />} />
        <Route path="/Mychange" element={<Mychange />} />
        <Route path="/MbtiBoard" element={<MbtiBoard />} />
        <Route path="/Mbti_characteristic/:mbti" element={<Mbti />} />
        <Route path="/Post" element={<Post />} />
        <Route path="/Posting/:postId" element={<Posting />} />
        <Route path="/UpdatePost/:postId" element={<UpdatePost />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Cos" element={<Cos />} />
      </Routes>
    </Router>
  );
}

export default App;