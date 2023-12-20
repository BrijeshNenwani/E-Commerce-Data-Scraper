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

  const { data, isLoading, error } = useFetch(`/suggested/${page}`);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!data) return;
    const { itemPage, upperLimit } = data;
    setListData((prev) => [...prev, ...itemPage]);
    setContentLimit(upperLimit);
    console.log("usefetch", itemPage);
  }, [data]);

  const handleScroll = () => {
    try {
      if (
        !isLoading &&
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.log("scroll error:", err);
    }
  };

  let videoCards = listData.map((cardData) => (
    <VideoCard data={cardData} key={(cardData.id, Math.random())} />
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
