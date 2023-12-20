import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import VideoPlayerPage from "./Pages/VideoPlayerPage.jsx";
import SearchFeed from "./Pages/SearchFeed";
import NotFound from "./Pages/NotFound";
function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <Header />
        </>
        <div className=" bg-gray-950 text-white w-full h-full min-h-[calc(100vh-40px)] mt-10 flex justify-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="watch/:videoId" element={<VideoPlayerPage />} />
            <Route path="search/:query" element={<SearchFeed />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
