import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ReactPlayer from "react-player";
const VidoePlayerPage = () => {
  const [videoData, setVideoData] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const { videoId } = useParams();
  const { data, isLoading } = useFetch(`/watch/${videoId}`, true);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setVideoData(data);
    document.getElementById("description").innerHTML = videoData
      ? data?.description
      : "";
  }, [data]);

  return (
    <>
      <div
        id="video-page-wrapper"
        className="bg-gray-950 w-full h-fit p-8 flex text-white"
      >
        <div id="watch-section" className="w-full lg:w-[64%] h-auto ">
          <div id="video-holder" className="max-w-[1200px] w-full">
            <ReactPlayer
              width={width * 0.6 + "px"}
              height={(9 / 16) * 0.6 * width + "px"}
              url={`https://www.youtube.com/watch?v=iu-LBY7NXD4`}
              playing
              controls
            />
          </div>
          <div id="video-meta-deta" className="mt-4">
            <p id="title" className="text-xl font-semibold ">
              {videoData && videoData?.title}
            </p>
            <div id="viewer-channel-actions" className="mt-4 flex items-center">
              <span
                id="channel-logo"
                className="h-10 w-fit overflow-hidden me-2"
              >
                {videoData && (
                  <img
                    src={
                      videoData?.thumbnails[2]?.url ||
                      videoData?.thumbnails[1]?.url ||
                      videoData?.thumbnails[0].url
                    }
                    alt="logo"
                    className="h-full w-auto rounded-full"
                  />
                )}
              </span>
              <div id="channel-name" className="me-8 flex-col tewhitext-">
                <p className="text-lg leading-5 font-bold">
                  {videoData && videoData?.name}
                </p>
                <button role="button" className="text-[0.8rem] opacity-60 text">
                  {videoData && videoData?.subscriber_count + " Subscribers"}
                </button>
              </div>
              {/* <div className="h-full py-2 px-4 w-fit  rounded-full text-center font-semibold   bg-red-600 ">
                Subscribe
              </div> */}
            </div>
            {/* <div
              id="viewer-video-actions"
              className="mt-4 overflow-y-hidden flex items-center flex-wrap"
            >
              <div
                id="like-dislike"
                className="py-2 px-3 bg-slate-800 hover:bg-opacity-80  flex items-center rounded-full"
              >
                <span className="material-symbols-outlined">thumb_up</span>
                <span
                  id="likes"
                  className="border-e-[1px] ps-1 pe-2 border-white font-semibold"
                >
                  {videoData?.likes}
                </span>
                <span className="material-symbols-outlined ms-3">
                  thumb_down
                </span>
              </div>
              <div className="py-2 px-3 ms-2 bg-slate-800 hover:opacity-80  flex items-center rounded-full">
                <span className="material-symbols-outlined ">share</span>
                <span>Share</span>
              </div>
              <div className="py-2 px-3 ms-2 bg-slate-800 hover:opacity-80  flex items-center rounded-full">
                Transcript
              </div>
            </div> */}

            <div
              id="description-section"
              className="w-full h-fit mt-4 p-3  bg-slate-800 rounded-xl"
            >
              <div id="description" className="mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VidoePlayerPage;
