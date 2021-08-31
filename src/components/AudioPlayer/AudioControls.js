import React, { forwardRef, useState } from "react";

// Custom components
import Typography from "../Typography";
import { secondaryColor } from "../../styles/Style";
import MultiUseMobile from "../../styles/MultiUseMobile";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// Material ui components
import {
  makeStyles,
  withStyles,
  IconButton,
  Slider,
  Tooltip,
  Grid,
  Popover,
  Link,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

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
      onPlayPause,
      playing,
      played,
      elapsedTime,
      totalDuration,
      onChangeDispayFormat,
      playbackRate,
      onPlaybackRateChange,
      button,
    },
    ref
  ) => {
    const multi = MultiUseMobile();
    const classes = useStyles();
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
      <Grid container direction="row" alignItems="center">
        <Grid item xs={2}>
          <IconButton onClick={onPlayPause} className={classes.bottomIcons}>
            {playing ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Grid>

        <Grid item xs={3}>
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

        <Grid item xs={4}>
          <Link
            className={multi.link}
            underline="none"
            onClick={onChangeDispayFormat}
          >
            <Typography
              className={classes.bottomIcons}
              style={{ marginLeft: 16 }}
            >
              {elapsedTime}/{totalDuration}
            </Typography>
          </Link>
        </Grid>

        <Grid item xs={2}>
          <Link
            className={multi.link}
            underline="none"
            onClick={handleClick}
            aria-describedby={id}
            variant="text"
          >
            <Typography className={classes.bottomIcons}>
              {playbackRate}x
            </Typography>
          </Link>

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
              {[0.5, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                <Link
                  className={multi.link}
                  underline="none"
                  key={rate}
                  onClick={() => onPlaybackRateChange(rate)}
                >
                  <Typography
                    style={{ padding: "10px" }}
                    className={classes.textTransformNormal}
                  >
                    {rate}x
                  </Typography>
                </Link>
              ))}
            </Grid>
          </Popover>
        </Grid>

        <Grid item xs={1}>
          {button}
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
