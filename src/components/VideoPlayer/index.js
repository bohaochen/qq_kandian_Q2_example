import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import style from "./index.less";


var playBtn = require("./playBtn.png");

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    let self = this;
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log("视频组件可以使用了");
      self.props.onPlayerReady && self.props.onPlayerReady(this);
    });
	this.watchFullScreen();
	this.player.on("pause", function(){
        console.log("视频暂停播放")
	});
	this.player.on("play", function(){
		console.log("视频开始播放")
    });
    this.player.generalFullPlay = () => {
		//通用全屏播放方法
      if (!this.inIos() && this.inWX()) {
        //微信安卓全屏播放
        this.player.load();
        this.player.requestFullscreen();
        this.player.play();
      } else {
        //ios全屏播放
        this.player.requestFullscreen();
        this.player.play();
        var _this = this;
        var fn = setInterval(() => {
          _this.player.requestFullscreen();
          _this.player.play();
          if (_this.player.readyState() == 4) {
            clearInterval(fn);
          }
        }, 10);
      }
    };
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  watchFullScreen = () => {
    const that = this;
    this.player.on("fullscreenchange", function (e) {
      const bool =
        document.fullscreen ||
        document.webkitIsFullScreen ||
        document.mozFullScreen ||
        false;
      if (!bool) {
        that.player.pause();
      }
    });
  };

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
	  console.log(this.props.style,"222222")
    return (
		  <div data-vjs-player>
        <video
          ref={(node) => (this.videoNode = node)}
		  className={`video-js ${style.videoPlayer}`}
		  style={this.props.style}
          playsInline={true}
          controls={true}
          webkit-playsinline=""
          x5-video-player-type="h5"
        ></video>
		<div className="ownPlayBtn" onClick={()=>{
			this.player.play();
		}}>
			<img src={playBtn} alt="" className="ownPlayBtn"/>
		</div>
      </div>
     
    );
  }
}
