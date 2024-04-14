import React, { useState } from "react";
import ReactPlayer from "react-player";

const Video = ({url }) => {
    return (
        <div className="w-[500px] my-2 bg-black">
            <ReactPlayer
            width="100%"
            playing={true}
            pip
            controls="false"
            config={{ file: { forceHLS: true } }}
            url={url}
            />
        </div>
    );
};

export default Video;
