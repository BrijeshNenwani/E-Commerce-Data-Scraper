const ytdl = require("ytdl-core");

const getVideoData = async (req, res) => {
  try {
    const { videoId } = req.params;

    const info = await ytdl.getBasicInfo(
      `https://www.youtube.com/watch?v=${videoId}`
    );
    let {
      formats,
      related_videos,
      videoDetails: {
        title,
        description,
        lengthSeconds,
        viewCount,
        likes,
        publishDate,
        category,
        ownerChannelName,
        uploadDate,
        channelId,
        author: { name, thumbnails, verified, subscriber_count },
      },
    } = info;

    let temp = `${viewCount} views  ${publishDate}`;
    description.split("\n").forEach((x) => {
      if (x === "") temp += "<br/>";
      else temp += `<p>${x}</p>`;
    });
    description = await temp;

    

    await res.status(200).json({
      title,
      description,
      category,
      lengthSeconds,
      viewCount,
      likes,
      publishDate,
      ownerChannelName,
      channelId,
      name,
      thumbnails,
      verified,
      subscriber_count,
      formats,
      related_videos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};

module.exports = { getVideoData };
