import { memo } from "react";
import { Link } from "react-router-dom";

const VideoCardLandscape = ({
  thumbnail,
  title,
  author,
  id,
  views,
  uploadedAt,
  duration,
}) => {
  return (
    <>
      <Link to={`/watch/${id}`}>
        <div id="card-wrapper" className="flex h-32 md:h-48 my-4">
          <div
            id="image-holder"
            className="relative flex justify-around align-middle w-auto h-full aspect-video rounded-md  bg-black"
          >
            <img src={thumbnail} className="w-full h-full rounded-md" />
            <div className="absolute px-2 w-fit h-fit bottom-2 end-2 rounded-md bg-opacity-90 font-normal text-sm bg-black">
              {duration}
            </div>
          </div>
          <div id="video-details" className="flex-col px-4">
            <p
              id="title"
              className="font-normal text-md lg:text-xl line-clamp-2 text-ellipsis whitespace-normal overflow-hidden"
            >
              {title}
            </p>
            <div
              id="video-info"
              className="mt-1 flex items-center text-sm font-normal opacity-80"
            >
              <span>{views} views</span>
              <span className="mx-1">•</span>
              <span>{`${uploadedAt}`}</span>
            </div>
            <div id="channel-data" className="mt-4 flex items-center">
              <span
                id="channel-logo"
                className="h-6 sm:h-8 md:h-10 w-fit rounded-full overflow-hidden me-2"
              >
                <img
                  src={author?.bestAvatar.url}
                  alt="logo"
                  className="h-full w-auto rounded-full"
                />
              </span>
              <div id="channel-name" className="me-8 flex-col">
                <p className="text-sm md:text-lg leading-5 font-semibold">
                  {author?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default memo(VideoCardLandscape);
