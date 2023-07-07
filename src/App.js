import { Route, Routes } from 'react-router-dom';
// import { UserContext } from './context/UserContext';

import Issue from './page/Issue';
import CreateIssue from './page/CreateIssue';
import Projects from './page/Projects';
import PullRequest from './page/PullRequest';
import Code from './page/Code';
import Security from './page/Security';
import Actions from './page/Actions';
import Nav from './components/Nav';
import Header from './components/Header';
import Footer from './components/Footer';

import { QueryClient, QueryClientProvider } from 'react-query';

// 캐시 : 쉽게 변하지 않는 데이터를 임시적으로 저장해두는 부분

// Context Api - 전역적인 정보 prop drilling 없이 사용할때
// -> 굳이 사용할지 않아도 된다면, hooks로 빼내어 사용한
// -> hooks로 선언한 부분이 반복적으로 네트워크 콜을 유발한다면, cache를 통해서 개선해볼 수 있을 것.

const queryClient = new QueryClient();

function App() {
  return (
    // <UserContext.Provider value={{ user }}>
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Header />
      <Routes>
        <Route path="/" element={<Issue />} />
        <Route path="/issue" element={<Issue />} />
        <Route path="/new" element={<CreateIssue />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/pulls" element={<PullRequest />} />
        <Route path="/code" element={<Code />} />
        <Route path="/security" element={<Security />} />
        <Route path="/actions" element={<Actions />} />
      </Routes>
      <Footer />
    </QueryClientProvider>
    // </UserContext.Provider>
  );
}

export default App;
