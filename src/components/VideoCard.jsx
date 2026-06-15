import React from "react";

const VideoCard = ({ videoSrc }) => {
  return (
    <div className="w-[280px] md:w-[340px] aspect-[9/16] shrink-0 rounded-xl overflow-hidden relative bg-black shadow-2xl shadow-black/50">
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      
      {/* Subtle vignette/overlay to push the background videos back and make the center text pop */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  );
};

export default VideoCard;