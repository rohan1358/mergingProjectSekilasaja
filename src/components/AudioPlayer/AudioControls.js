import React, { forwardRef, useState } from "react";

// Custom components
import Typography from "../Typography";
import { primaryColor, secondaryColor } from "../../styles/Style";
import MultiUseMobile from "../../styles/MultiUseMobile";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// Material ui components
import {
  makeStyles,
  withStyles,
  Button,
  IconButton,
  Slider,
  Tooltip,
  Grid,
  Popover,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";

const useStyles = makeStyles((theme) => ({
  primaryCol: {
    color: secondaryColor,
  },
  button: {
    margin: theme.spacing(1),
    width: "100%",
  },
  bottomIcons: {
    textTransform: "capitalize",
    color: secondaryColor,
    "&:hover": {
      color: "#999",
    },
  },
  textTransformNormal: {
    textTransform: "capitalize",
  },
  volumeSlider: {
    width: 60,
  },
}));

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    color: secondaryColor,
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
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

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const AudioControls = forwardRef(
  (
    {
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      onDuration,
      onRewind,
      onPlayPause,
      onFastForward,
      playing,
      played,
      elapsedTime,
      totalDuration,
      onMute,
      muted,
      onVolumeSeekDown,
      onChangeDispayFormat,
      playbackRate,
      onPlaybackRateChange,
      onToggleFullScreen,
      volume,
      onVolumeChange,
    },
    ref
  ) => {
    const classes = useStyles();
    const multi = MultiUseMobile();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={1}>
          <IconButton onClick={onPlayPause} className={classes.bottomIcons}>
            {playing ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          {/* <IconButton
            // onClick={() => setState({ ...state, muted: !state.muted })}
            onClick={onMute}
            className={`${classes.bottomIcons} ${classes.volumeButton}`}
          >
            {muted ? (
              <VolumeMute />
            ) : volume > 0.5 ? (
              <VolumeUp />
            ) : (
              <VolumeDown />
            )}
          </IconButton>

          <Slider
            className={classes.primaryCol}
            min={0}
            max={100}
            value={muted ? 0 : volume * 100}
            onChange={onVolumeChange}
            aria-labelledby="input-slider"
            className={classes.volumeSlider}
            onMouseDown={onSeekMouseDown}
            onChangeCommitted={onVolumeSeekDown}
          /> */}
        </Grid>

        <Grid item xs={5}>
          <PrettoSlider
            className={classes.primaryCol}
            min={0}
            max={100}
            ValueLabelComponent={(props) => (
              <ValueLabelComponent {...props} value={elapsedTime} />
            )}
            aria-label="custom thumb label"
            value={played * 100}
            onChange={onSeek}
            onMouseDown={onSeekMouseDown}
            onChangeCommitted={onSeekMouseUp}
            onDuration={onDuration}
          />
        </Grid>

        <Grid item xs={2}>
          <Button
            className={classes.bottomIcons}
            onClick={onChangeDispayFormat}
          >
            <Typography
              className={classes.bottomIcons}
              style={{ marginLeft: 16 }}
            >
              {elapsedTime}/{totalDuration}
            </Typography>
          </Button>
        </Grid>

        <Grid item xs={1}>
          <Button
            onClick={handleClick}
            aria-describedby={id}
            className={classes.bottomIcons}
            variant="text"
          >
            <Typography className={classes.bottomIcons}>
              {playbackRate}x
            </Typography>
          </Button>

          <Popover
            open={open}
            id={id}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Grid container direction="column-reverse">
              {[0.5, 1, 1.5, 2].map((rate) => (
                <Button key={rate} onClick={() => onPlaybackRateChange(rate)}>
                  <Typography className={classes.textTransformNormal}>
                    {rate}x
                  </Typography>
                </Button>
              ))}
            </Grid>
          </Popover>
        </Grid>
      </Grid>
    );
  }
);

AudioControls.propTypes = {
  onSeek: PropTypes.func,
  onSeekMouseDown: PropTypes.func,
  onSeekMouseUp: PropTypes.func,
  onDuration: PropTypes.func,
  onRewind: PropTypes.func,
  onPlayPause: PropTypes.func,
  onFastForward: PropTypes.func,
  onVolumeSeekDown: PropTypes.func,
  onChangeDispayFormat: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onToggleFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  playing: PropTypes.bool,
  played: PropTypes.number,
  elapsedTime: PropTypes.string,
  totalDuration: PropTypes.string,
  muted: PropTypes.bool,
  playbackRate: PropTypes.number,
};

export default AudioControls;
