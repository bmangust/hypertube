import { Button, Grid, IconButton, makeStyles, Popover, Slider, Tooltip, Typography, withStyles } from '@material-ui/core';
import React, { forwardRef } from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { FastForward, FastRewind, Fullscreen, Pause, PlayArrow, VolumeOff, VolumeUp } from '@material-ui/icons';

const useStyles = makeStyles({
	controlsWrapper: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		background: 'rgba(0,0,0,0.6)',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		zIndex: 1
	},

	controlIcons: {
		color: '#777',
		fontSize: 50,
		transform: 'scale(0.9)',
		"&:hover": {
			color: 'white',
			transform: 'scale(1)',
		}
	},

	bottomIcons: {
		color: '#999',
		"&:hover": {
			color: 'white'
		}
	},

	volumeSlider: {
		width: 100
	}
})

function ValueLabelComponent(props2) {
	// debugger
	const { children, open, value } = props2;

	return (
		<Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
			{children}
		</Tooltip>
	);
}

const PrettoSlider = withStyles({
	root: {
		height: 8,
	},
	thumb: {
		height: 24,
		width: 24,
		backgroundColor: '#fff',
		border: '2px solid currentColor',
		marginTop: -8,
		marginLeft: -12,
		'&:focus, &:hover, &$active': {
			boxShadow: 'inherit',
		},
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 4px)',
	},
	track: {
		height: 8,
		borderRadius: 4,
	},
	rail: {
		height: 8,
		borderRadius: 4,
	},
})(Slider);

const PlayerControls = forwardRef((props, ref) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopover = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'playbackrate-popover' : undefined;
	// debugger
	return (
		<div className={classes.controlsWrapper} ref={ref}>
			<Grid container direction="row" alignItems="center" justify="space-between" style={{ padding: 16 }}>
				<Grid item>
					<Typography variant="h5" style={{ color: "white" }}>Video Title</Typography>
				</Grid>
				{/* <Grid item>
					<Button variant="contained" color="primary" startIcon={<BookmarkIcon />}>
						Bookmark
								</Button>
				</Grid> */}
			</Grid>
			<Grid container direction="row" alignItems="center" justify="center">
				<IconButton onClick={props.onRewind} className={classes.controlIcons} aria-label="reqind">
					<FastRewind fontSize="inherit" />
				</IconButton>
				<IconButton onClick={props.onPlayPause} className={classes.controlIcons} aria-label="reqind">
					{props.playing ? <Pause fontSize="inherit" /> : <PlayArrow fontSize="inherit" />}
				</IconButton>
				<IconButton onClick={props.onFastForward} className={classes.controlIcons} aria-label="reqind">
					<FastForward fontSize="inherit" />
				</IconButton>
			</Grid>
			<Grid container direction="row" alignItems="center" justify="space-between" style={{ padding: 16 }}>
				<Grid item xs={12}>
					<PrettoSlider min={0} max={100}
						ValueLabelComponent={(props2) => (
							<ValueLabelComponent {...props2} value={props.elapsedTime}/>
						)}
						value={props.played * 100}
						onChange={props.onSeek}
						onMouseDown={props.onSeekMouseDown}
						onChangeCommitted={props.onSeekMouseUp}/>
				</Grid>
				<Grid item>
					<Grid container direction="row" justify="flex-start" alignItems="center">
						<IconButton onClick={props.onPlayPause} className={classes.bottomIcons}>
							{props.playing ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
						</IconButton>
						<IconButton onClick={props.onMuted} className={classes.bottomIcons}>
							{props.muted ? <VolumeOff fontSize="large" /> : <VolumeUp fontSize="large" />}
						</IconButton>
						<Slider min={0} max={100} value={props.volume * 100}
							className={classes.volumeSlider}
							onChange={props.onVolumeChange}
							onChangeCommitted={props.onVolumeSeekUp}/>
						<Button onClick={props.onChangeDisplayFormat} variant="text" style={{ color: "#fff", marginLeft: 16 }}>
							<Typography>
								{props.elapsedTime}/{props.totalDuration}
							</Typography>
						</Button>
					</Grid>
				</Grid>
				<Grid item>
					<Button onClick={handlePopover} variant="text" className={classes.bottomIcons}>
						<Typography>{props.playbackRate}X</Typography>
					</Button>
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
					>
						<Grid container direction="column-reverse">
							{[0.5, 1, 1.5, 2].map((rate) => (
								<Button onClick={() => props.onPlaybackRateChange(rate)} variant="text">
									<Typography color={rate === props.playbackRate ? "secondary" : "default"}>{rate}</Typography>
								</Button>
							))}
						</Grid>
					</Popover>
					<IconButton onClick={props.onToggleFullScreen} className={classes.bottomIcons}>
						<Fullscreen fontSize="large" />
					</IconButton>
				</Grid>
			</Grid>
		</div>
	);
})

export default PlayerControls;