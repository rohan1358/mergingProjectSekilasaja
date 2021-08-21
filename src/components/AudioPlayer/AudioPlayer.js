import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

// Custom components
import Typography from "../Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import AudioControls from "./AudioControls";

// Material-UI components
import { Container, makeStyles } from "@material-ui/core";

const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

export default function AudioPlayer({ vidLink }) {
  const mobile = MultiUseMobile();

  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [state, setState] = useState({
    pip: false,
    playing: true,
    controls: false,
    light: false,

    muted: true,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });

  const playerRef = useRef(null);
  const { playing, light, muted, loop, playbackRate, pip, played, volume } =
    state;

  const handleSeekChange = (e, newValue) => {
    console.log({ newValue });
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    console.log({ value: e.target });
    setState({ ...state, seeking: false });
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleDuration = (duration) => {
    setState({ ...state, duration });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
  };
  const handleVolumeChange = (e, newValue) => {
    // console.log(newValue);
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat == "normal" ? "remaining" : "normal"
    );
  };

  const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
  const elapsedTime =
    timeDisplayFormat == "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        width="100%"
        height="100%"
        url={vidLink}
        pip={pip}
        playing={playing}
        controls={false}
        light={light}
        loop={loop}
        playbackRate={playbackRate}
        // volume={volume}
        muted={muted}
      />

      <AudioControls
        onSeek={handleSeekChange}
        onSeekMouseDown={handleSeekMouseDown}
        onSeekMouseUp={handleSeekMouseUp}
        onDuration={handleDuration}
        onPlayPause={handlePlayPause}
        playing={playing}
        played={played}
        elapsedTime={elapsedTime}
        totalDuration={totalDuration}
        onMute={handleMute}
        muted={muted}
        // onVolumeChange={handleVolumeChange}
        // onVolumeSeekDown={handleVolumeSeekDown}
        onChangeDispayFormat={handleDisplayFormat}
        playbackRate={playbackRate}
        onPlaybackRateChange={handlePlaybackRate}
        // volume={volume}
      />
    </div>
  );
}
