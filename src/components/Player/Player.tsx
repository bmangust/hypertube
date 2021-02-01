// ts-nocheck

import { Container, makeStyles } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import PlayerControls from './PlayerControls';

const useStyles = makeStyles({
  playerWrapper: {
    position: 'relative',
    width: '100%',
  },
});

interface Props {
  src?: string;
  id: string | number;
}

const format = (seconds: number) => {
  if (isNaN(seconds)) {
    return '00:00';
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, '0');
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  }
  return `${mm}:${ss}`;
};
let count = 0;

function Player({ src, id }: Props) {
  const classes = useStyles();
  const [state, setState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
  });
  const [timeDisplayFormat, setTimeDisplayFormat] = useState('normal');
  const { playing, muted, volume, playbackRate, played, seeking } = state;
  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const url =
    src ||
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };
  const handleRewind = () => {
    if (playerRef === null || playerRef.current === null) return;
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };
  const handleFastForward = () => {
    if (playerRef === null || playerRef.current === null) return;
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };
  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };
  const handleVolumeChange = (
    _e: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    const value = typeof newValue === 'number' ? newValue : newValue[0];
    setState({
      ...state,
      volume: value / 100,
      muted: value === 0,
    });
  };
  const handleVolumeSeekUp = (
    _e: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    const value = typeof newValue === 'number' ? newValue : newValue[0];
    setState({
      ...state,
      volume: value / 100,
      muted: value === 0,
    });
  };
  const handlePlaybackRateChange = (rate: number) => {
    setState({ ...state, playbackRate: rate });
  };
  const toggleFullScreen = () => {
    if (!playerContainerRef || !playerContainerRef.current) return;
    if (screenfull && screenfull.isEnabled && playerContainerRef !== null) {
      screenfull.toggle(playerContainerRef.current);
    }
  };
  const handleProgress = ({ played }: { played: number }) => {
    if (!controlsRef || !controlsRef.current) return;
    if (count > 3) {
      controlsRef.current.style.visibility = 'hidden';
      count = 0;
    }
    if (controlsRef.current.style.visibility === 'visible') {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, played });
    }
  };
  const handleSeekChange = (_e: React.MouseEvent, newValue: number) => {
    if (!playerRef || !playerRef.current) return;
    setState({ ...state, played: newValue / 100 });
    playerRef.current.seekTo(newValue / 100);
  };
  const handleSeekMouseDown = () => {
    setState({ ...state, seeking: true });
  };
  const handleSeekMouseUp = () => {
    setState({ ...state, seeking: false });
  };
  const handleChangeDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === 'normal' ? 'remaining' : 'normal'
    );
  };
  const handleMouseMove = () => {
    if (!controlsRef || !controlsRef.current) return;
    controlsRef.current.style.visibility = 'visible';
    count = 0;
  };

  const currentTime =
    !playerRef || !playerRef.current ? 0 : playerRef.current.getCurrentTime();
  const duration =
    !playerRef || !playerRef.current ? 0 : playerRef.current.getDuration();
  const elapsedTime =
    timeDisplayFormat === 'normal'
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;
  const totalDuration = format(duration);
  return (
    <Container maxWidth="md">
      <div
        ref={playerContainerRef}
        className={classes.playerWrapper}
        onMouseMove={handleMouseMove}
      >
        <ReactPlayer
          ref={playerRef}
          width="100%"
          height="100%"
          url={url}
          muted={muted}
          playing={playing}
          volume={volume}
          controls={false}
          playbackRate={playbackRate}
          onProgress={handleProgress}
        />
        <PlayerControls
          ref={controlsRef}
          onPlayPause={handlePlayPause}
          onMuted={handleMute}
          playing={playing}
          muted={muted}
          volume={volume}
          played={played}
          seeking={seeking}
          onRewind={handleRewind}
          onFastForward={handleFastForward}
          onVolumeChange={handleVolumeChange}
          onVolumeSeekUp={handleVolumeSeekUp}
          playbackRate={playbackRate}
          onPlaybackRateChange={handlePlaybackRateChange}
          onToggleFullScreen={toggleFullScreen}
          onSeek={handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          elapsedTime={elapsedTime}
          totalDuration={totalDuration}
          onChangeDisplayFormat={handleChangeDisplayFormat}
        />
      </div>
    </Container>
  );
}

export default Player;
