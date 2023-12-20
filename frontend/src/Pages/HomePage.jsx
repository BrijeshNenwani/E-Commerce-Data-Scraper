import VideoCard from "../Components/VideoCards/VideoCard";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import useFetch from "../hooks/useFetch";

const HomePage = () => {
  return (
    <div className="flex ">
      <Feed />
    </div>
  );
};

const Feed = () => {
  const [listData, setListData] = useState([]);
  const [contentLimit, setContentLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const { data, isLoading } = useFetch(`/suggested/${page}`, loadMore);
  useEffect(() => {
    if (!isLoading) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!loadMore || !data?.itemPage) return;
    const { itemPage, upperLimit } = data;
    setLoadMore(false);
    setPage((prev) => prev + 1);
    setListData((prev) => [...prev, ...itemPage]);
    setContentLimit(upperLimit);
  }, [data]);

  const handleScroll = () => {
    try {
      if (
        !isLoading &&
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
      ) {
        setLoadMore(true);
      }
    } catch (err) {
      console.log("scroll error:", err);
    }
  };

  let videoCards = listData.map((cardData, i) => (
    <VideoCard data={cardData} key={cardData.id + i} />
  ));
  return (
    <div
      id="home-feed"
      className="flex flex-wrap justify-center px-2 h-fit w-full bg-gray-950 scrollbar-hide"
    >
      {videoCards}
      {isLoading && <Loader />}
    </div>
  );
};

export default HomePage;
