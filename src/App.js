import { Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
