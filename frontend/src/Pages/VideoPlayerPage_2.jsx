import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import videoData from "../utils/video-sample";
import fetchAPI from "../utils/apiRequests";

const VidoePlayerPage = () => {
  // const [videoData, setVideoData] = useState(undefined);
  const { videoId } = useParams();
  useEffect(() => {
    // fetchData(videoId);
    let temp = `${videoId}`;
    videoData.videoDetails.description.split("\n").forEach((x) => {
      if (x === "") temp += "<br/>";
      else temp += "<p>" + x + "</p>";
    });
    document.getElementById("heya").innerHTML = temp;
  }, []);
  const fetchData = async () => {
    const data = await fetchAPI(`/watch/${videoId}`);
    setVideoData(data);
  };

  const contentMetaData =
    videoData.response.engagementPanels[3].engagementPanelSectionListRenderer
      .content.structuredDescriptionContentRenderer.items[0]
      .videoDescriptionHeaderRenderer;

  return (
    <>
      <div
        id="video-page-wrapper"
        className="bg-gray-950 w-full h-fit p-8 flex "
      >
        <div id="watch-section" className="w-[64%] h-auto text-white">
          <div id="video-holder" className="max-w-[1000px] w-full">
            <video width="1000" height="auto" controls>
              <source
                src="https://rr5---sn-qxaeenlr.googlevideo.com/videoplayback?expire=1688214260&ei=lMafZN38IvuK9fwP1Nm-kAs&ip=103.158.133.206&id=o-AMqKdLNBR_6b4hux1pgIe3cdui_Yl8KzscFQHaTQaIg6&itag=18&source=youtube&requiressl=yes&spc=Ul2Sq5cI0MyiShwSIWyUEp5GDc8nP6m8jb3JUirbUA&vprv=1&svpuc=1&mime=video%2Fmp4&ns=mOiVkqgR-cVp3D83ZwNCnboO&cnr=14&ratebypass=yes&dur=19319.791&lmt=1664277844385107&fexp=24007246,24350017,24363392,51000011&beids=24350017&c=WEB&txp=5438434&n=xWSPcFprLYGNng&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAKFnopGatk8R-_kYtuVAQD4K97EKafsujOAup5C8B6MbAiEAjjg07Lzr5DHmQ1xUmOFcRuZjOzFgjVIiyIk6Fr3Np7U%3D&rm=sn-qpbpjvocq-q5je7z,sn-qxalz76,sn-ci5gup-cvh67d&req_id=e47ea1606719a3ee&ipbypass=yes&redirect_counter=3&cms_redirect=yes&cmsv=e&mh=DS&mip=106.221.163.219&mm=30&mn=sn-qxaeenlr&ms=nxu&mt=1688192201&mv=m&mvi=5&pl=20&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAIkyS5SVfzMxRj81odqsWiP5Y6Q-QDvRpY3liMPp2D0UAiA_xD8DXAVAeguo-cugLjxTzxOYT-PH5ap5JOBsxuQAEQ%3D%3D"
                type="video/webm"
              />
            </video>
          </div>
          <div id="video-meta-deta" className="mt-4">
            <p id="title" className="text-xl font-semibold ">
              {videoData.videoDetails.title}
            </p>
            <div id="viewer-channel-actions" className="mt-4 flex items-center">
              <span
                id="channel-logo"
                className="h-10 w-fit overflow-hidden me-2"
              >
                <img
                  src={
                    videoData.videoDetails.author.thumbnails[2]?.url ||
                    videoData.videoDetails.author.thumbnails[1]?.url ||
                    videoData.videoDetails.author.thumbnails[0].url
                  }
                  alt="logo"
                  className="h-full w-auto rounded-full"
                />
              </span>
              <div id="channel-name" className="me-8 flex-col tewhitext-">
                <p className="text-lg leading-5 font-bold">
                  {videoData.videoDetails.author.name}
                </p>
                <p className="text-[0.8rem] opacity-60 text">
                  {
                    videoData.response.engagementPanels[3]
                      .engagementPanelSectionListRenderer.content
                      .structuredDescriptionContentRenderer.items[4]
                      .videoDescriptionInfocardsSectionRenderer.sectionSubtitle
                      .simpleText
                  }
                </p>
              </div>
              <div className="h-full py-2 px-4 w-fit  rounded-full text-center font-semibold   bg-red-600 ">
                Subscribe
              </div>
            </div>
            <div
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
                  {contentMetaData.factoid[0].factoidRenderer.value.simpleText}
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
            </div>
            <div className="w-fit h-fit mt-4 p-3  bg-slate-800 rounded-xl">
              <p>
                {contentMetaData.views.simpleText}
                {contentMetaData.publishDate.simpleText}
              </p>
              <div id="heya" className="mt-4"></div>
            </div>
          </div>
        </div>
        <div id="suggestions"></div>
      </div>
    </>
  );
};
export default VidoePlayerPage;
