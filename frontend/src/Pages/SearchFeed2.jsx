import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCardLandscape from "../Components/VideoCards/VideoCardLandscape";
import Loader from "../Components/Loader";
import useFetch from "../hooks/useFetch";

const SearchFeed = () => {
  const [videosList, setVideosList] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const { query } = useParams();
  useEffect(() => {
    setVideosList([]);
  }, [query]);

  let { data, isLoading, error } = useFetch(
    `/search/video?query=${query}&next=${nextPage}`
  );
  let nextTemp;
  useEffect(() => {
    if (data) {
      setVideosList((prev) => [...prev, ...data.items]);
      console.log(data);
      nextTemp = data.continueString;
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleScroll = () => {
    try {
      if (
        !isLoading &&
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
      ) {
        console.log("Scrolled", nextPage);
        setNextPage(nextTemp);
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
        Search results for: "{query}"
        {videosList.map((item) => {
          if (item.type === "video")
            return (
              <VideoCardLandscape
                key={item.id + Math.random()}
                id={item.id}
                thumbnail={item.bestThumbnail?.url}
                title={item.title}
                author={item.author}
                uploadedAt={item.uploadedAt}
                views={item.views}
                duration={item.duration}
              />
            );
          if (isLoading) return <Loader />;
        })}
      </div>
    </>
  );
};
export default SearchFeed;
