import {
    FaPlay,
    FaPause,
    FaVolumeUp,
    FaVolumeMute,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaDownload,
    FaClosedCaptioning,
    FaLanguage,
    FaExpand,
    FaCompress,
} from "react-icons/fa";
import ReactPlayer from "react-player";
import { useState, useRef } from "react";
import styles from "./components.module.css";

const VideoPlayer = ({ poster, videoUrl, downloadUrl }) => {
    const playerRef = useRef(null);
    const controlsTimeoutRef = useRef(null);
    const [showControls, setShowControls] = useState(true);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(1.0);
    const [speed, setSpeed] = useState(1.0);
    const [seekTime, setSeekTime] = useState(10);
    const [showPlaybackRateOptions, setShowPlaybackRateOptions] =
        useState(false);
    const [selectedPlaybackRate, setSelectedPlaybackRate] = useState(1.0);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [showClosedCaptionsMenu, setShowClosedCaptionsMenu] = useState(false);
    const [selectedCaption, setSelectedCaption] = useState("");
    const [progress, setProgress] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleVideoClick = () => {
        setPlaying((prevPlaying) => !prevPlaying);
    };

    const handlePlayPause = () => {
        setPlaying((prevPlaying) => !prevPlaying);
    };

    const handleMuteUnmute = () => {
        setMuted((prevMuted) => !prevMuted);
    };

    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    const handleSpeedChange = (speed) => {
        setSpeed(speed);
        setShowPlaybackRateOptions(false);
    };

    const handleSeekForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + seekTime);
    };

    const handleSeekBackward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - seekTime);
    };

    const handleDownload = () => {
        window.open(downloadUrl, '_blank');
      };

    const handlePlaybackRateOptions = () => {
        setShowPlaybackRateOptions((prevValue) => !prevValue);
    };

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
        // Implement logic to change video audio language
    };

    const handleClosedCaptionsMenu = () => {
        setShowClosedCaptionsMenu((prevValue) => !prevValue);
    };

    const handleCaptionChange = (caption) => {
        setSelectedCaption(caption);
        // Implement logic to change closed captions language
    };

    const handleProgress = (state) => {
        setProgress(state.played);
    };

    const showControlsTimeout = () => {
        setShowControls(true);
        clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false);
        }, 5000);
    };

    const handleMouseMove = () => {
        showControlsTimeout();
    };

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            const videoContainer = playerRef.current.wrapper.parentNode;
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.mozRequestFullScreen) {
                videoContainer.mozRequestFullScreen();
            } else if (videoContainer.webkitRequestFullscreen) {
                videoContainer.webkitRequestFullscreen();
            } else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            }
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setIsFullScreen(false);
        }
    };

    return (
        <div
            className={styles["video-player-wrapper"]}
            onMouseMove={handleMouseMove}
            onClick={handleVideoClick}
        >
            <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                playing={playing}
                muted={muted}
                volume={volume}
                playbackRate={speed}
                controls={true}
                light={poster}
                width="100%"
                height="100%"
                onProgress={handleProgress}
                className={styles["react-player"]}
            />
            {/* {showControls && (
                <div className={styles["video-player-controls"]}>
                    <button onClick={handlePlayPause}>
                        {playing ? <FaPause /> : <FaPlay />}
                    </button>
                    <button onClick={handleSeekBackward}>
                        <FaAngleDoubleLeft />
                    </button>
                    <button onClick={handleSeekForward}>
                        <FaAngleDoubleRight />
                    </button>
                    <button onClick={handleMuteUnmute}>
                        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                    <div className={styles["progress-bar"]}>
                        <div
                            className={styles["progress-bar-fill"]}
                            style={{ width: `${progress * 100}%` }}
                        />
                    </div>
                    <div className={styles["playback-rate"]}>
                        <button onClick={handlePlaybackRateOptions}>
                            {speed}x
                        </button>
                        {showPlaybackRateOptions && (
                            <ul className={styles["playback-rate-options"]}>
                                <li onClick={() => handleSpeedChange(0.5)}>
                                    0.5x
                                </li>
                                <li onClick={() => handleSpeedChange(1.0)}>
                                    1x
                                </li>
                                <li onClick={() => handleSpeedChange(2.0)}>
                                    2x
                                </li>
                            </ul>
                        )}
                    </div>
                    <button onClick={handleClosedCaptionsMenu}>
                        <FaClosedCaptioning />
                    </button>
                    {showClosedCaptionsMenu && (
                        <ul className={styles["closed-captions-menu"]}>
                            <li onClick={() => handleCaptionChange("English")}>
                                English
                            </li>
                            <li onClick={() => handleCaptionChange("Spanish")}>
                                Spanish
                            </li>
                            <li onClick={() => handleCaptionChange("French")}>
                                French
                            </li>
                            <li onClick={() => handleCaptionChange("Off")}>
                                Off
                            </li>
                        </ul>
                    )}
                    <button onClick={handleLanguageChange}>
                        <FaLanguage />
                    </button>
                    <select
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                    >
                        <option value="">Select Language</option>
                    </select>
                    <button onClick={handleDownload}>
                        <FaDownload />
                    </button>
                    <button onClick={toggleFullScreen}>
                        {isFullScreen ? <FaCompress /> : <FaExpand />}
                    </button>
                </div>
            )} */}
        </div>
    );
};

export default VideoPlayer;
