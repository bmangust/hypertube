import { Container, makeStyles } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import PlayerControls from './PlayerControls.jsx';

const useStyles = makeStyles({
	playerWrapper: {
		position: 'relative',
		width: '100%'
	},
})

const format = (seconds) => {
	if (isNaN(seconds)) {
		return '00:00';
	}
	const date = new Date (seconds * 1000);
	const hh = date.getUTCHours();
	const mm = date.getUTCMinutes();
	const ss = date.getUTCSeconds().toString().padStart(2, "0");
	if (hh) {
		return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
	}
	return `${mm}:${ss}`;
}
let count = 0;

function Player() {
	const classes = useStyles();
	const [state, setState] = useState({
		playing: true,
		muted: true,
		volume: 0.5,
		playbackRate: 1.0,
		played: 0,
		seeking: false
	});
	const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");
	const {playing, muted, volume, playbackRate, played, seeking} = state;
	const playerRef = useRef(null);
	const playerContainerRef = useRef(null);
	const controlsRef = useRef(null);

	const handlePlayPause = () => {
		setState({...state, playing: !state.playing})
	}
	const handleRewind = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
	}
	const handleFastForward = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
	}
	const handleMute = () => {
		setState({...state, muted: !state.muted})
	}
	const handleVolumeChange = (e, newValue) => {
		setState({...state, volume: parseFloat(newValue / 100), muted: newValue === 0? true : false})
	}
	const handleVolumeSeekUp = (e, newValue) => {
		setState({...state, volume: parseFloat(newValue / 100), muted: newValue === 0? true : false})
	}
	const handlePlaybackRateChange = (rate) => {
		setState({...state, playbackRate: rate})
	}
	const toggleFullScreen = () => {
		screenfull.toggle(playerContainerRef.current);
	}
	const handleProgress = (changeState) => {
		if (count > 3) {
			controlsRef.current.style.visibility = "hidden";
			count = 0;
			
		}
		if (controlsRef.current.style.visibility === "visible") {
			count += 1;
		}
		if (!state.seeking) {
			setState({...state, ...changeState});
		}
	}
	const handleSeekChange = (e, newValue) => {
		setState({...state, played: parseFloat(newValue / 100)});
		playerRef.current.seekTo(newValue / 100);
	}
	const handleSeekMouseDown = (e) => {
		setState({...state, seeking: true});
	}
	const handleSeekMouseUp = (e, newValue) => {
		setState({...state, seeking: false});
	}
	const handleChangeDisplayFormat = () => {
		setTimeDisplayFormat(timeDisplayFormat === 'normal' ? 'remaining' : 'normal');
	}
	const handleMouseMove = () => {
		controlsRef.current.style.visibility = "visible";
		count = 0;
	}
	const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
	const duration = playerRef.current ? playerRef.current.getDuration() : '00:00';
	const elapsedTime = timeDisplayFormat === 'normal' ? format(currentTime) : `-${format(duration - currentTime)}`;
	const totalDuration = format(duration);
	return (
		<Container maxWidth="md">
			<div ref={playerContainerRef} className={classes.playerWrapper} onMouseMove={handleMouseMove}>
				<ReactPlayer
					ref={playerRef}
					width='100%'
					height='100%'
					url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
					muted={muted}
					playing={playing}
					volume={volume}
					controls={false}
					playbackRate={playbackRate}
					onProgress={handleProgress}
				/>
				<PlayerControls ref={controlsRef}
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
					onChangeDisplayFormat={handleChangeDisplayFormat}/>
			</div>
		</Container>
	);
}

export default Player;