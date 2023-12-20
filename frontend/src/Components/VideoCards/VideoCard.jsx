import { memo } from "react";
import { Link } from "react-router-dom";
const VideoCard = ({ data }) => {
  return (
    <>
      <div
        
        className="sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 rounded-lg overflow-hidden m-2 grow min-w-[240px] max-w-[360px] bg-gray-800"
      >
        <Link to={`/watch/${data.id}`}>
          <div className="flex aspect-video justify-around align-middle bg-black">
            <img
              className=" w-full object-contain"
              src={
                data.snippet.thumbnails["maxres"]?.url ||
                data.snippet.thumbnails["standard"]?.url ||
                data.snippet.thumbnails["high"]?.url ||
                data.snippet.thumbnails["medium"]?.url ||
                data.snippet.thumbnails["default"]?.url
              }
              title={data.snippet.title}
            />
            {/* <div className="absolute px-2 w-fit h-fit bottom-2 end-2 rounded-md bg-opacity-90 font-normal text-sm bg-black">
              {duration}
            </div> */}
          </div>
        </Link>
        <div className="w-full h-30 p-2 relative flex">
          {/* <img
            className="h-fit w-1/6 rounded-full m-1"
            src="https://yt3.ggpht.com/ytc/AGIKgqMtuWDbBoKr5uSdFHmdaUCdcyh-5zRENrCDd_VxwA=s48-c-k-c0x00ffffff-no-rj"
            alt={data.id}
            title={data.snippet.channelTitle}
          /> */}
          <div className="w-full h-full flex flex-col">
            <div className="w-full h-auto bg-inherit">
              <p className="w-full h-full line-clamp-2  text-ellipsis whitespace-normal overflow-hidden font-semibold">
                {data.snippet.title}
              </p>
            </div>
            <div
              id="video-info"
              className="mt-1 flex items-center text-sm font-normal opacity-80"
            >
              <span>{data.statistics.viewCount} views</span>
              <span className="mx-1">•</span>
              <span>{`${data.snippet.publishedAt.slice(0, 10)}`}</span>
            </div>
            <Link to="/channel">
              <p className="font-normal text-white opacity-70 hover:opacity-100 line-clamp-1 text-ellipsis overflow-hidden">
                {data.snippet.channelTitle}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(VideoCard);
