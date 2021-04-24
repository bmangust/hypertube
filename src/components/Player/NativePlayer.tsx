import React, { useRef } from 'react';

interface IdProps {
  id: string;
  src?: string;
}

interface SrcProps {
  id?: string;
  src: string;
}

type Props = IdProps | SrcProps;

const NativePlayer = ({ src, id }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const url = id
    ? `/api/loader/${id}`
    : src ||
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

  return (
    <div>
      <video
        ref={videoRef}
        width="100%"
        height="100%"
        src={url}
        preload="auto"
        controls={true}
      />
    </div>
  );
};

export default NativePlayer;
