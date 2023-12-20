import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCardLandscape from "../Components/VideoCards/VideoCardLandscape";
import Loader from "../Components/Loader";
import useFetch from "../hooks/useFetch";
const SearchFeed = () => {
  const [videosList, setVideosList] = useState([]);
  const [route, setRoute] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const { query } = useParams();
  useEffect(() => {
    setVideosList([]);
    setRoute(`/search?query=${query}`);
    setLoadMore(true);
    console.log("query changed");
  }, [query]);

  const { data, isLoading, controller } = useFetch(route, loadMore);
  useEffect(() => {
    if (data?.items) {
      setVideosList((prev) => [...prev, ...data.items]);
      setRoute(`/search/continue/${data.continueString}`);
      setLoadMore(false);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isLoading]);

  const handleScroll = () => {
    try {
      if (
        !isLoading &&
        data?.continueString &&
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
      ) {
        setLoadMore(true);
        console.log(data.continueString);
      }
    } catch (err) {
      console.log("scroll error:", err);
    }
  };

  return (
    <>
      <div
        id="search-feed-wrapper"
        className="text-white font-bold text-lg w-full h-fit mx-2 sm:mx-8 md:mx-16 bg-gray-950"
      >
        Search results for: <span className="text-red-400">{query}</span>
        {videosList.map((item, i) => {
          if (item.type === "video")
            return (
              <VideoCardLandscape
                key={i}
                id={item.id}
                thumbnail={item.bestThumbnail?.url}
                title={item.title}
                author={item.author}
                uploadedAt={item.uploadedAt}
                views={item.views}
                duration={item.duration}
              />
            );
        })}
        {isLoading && <Loader />}
      </div>
    </>
  );
};
export default memo(SearchFeed);
