import React from 'react';
import videojs from 'video.js'
import "video.js/dist/video-js.css"
import style from './index.less'

export default class VideoPlayer extends React.Component {
	componentDidMount() {
		let self = this;
		this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
			console.log('视频组件可以使用了')
			self.props.onPlayerReady && self.props.onPlayerReady(this);
		});
		// this.watchFullScreen()
	}

	// destroy player on unmount
	componentWillUnmount() {
		if (this.player) {
			this.player.dispose()
		}
	}

	watchFullScreen = () => {
		const that = this;
		this.player.on('fullscreenchange', function (e) {
			alert(1)
			const bool = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || false;
			if (!bool) {
				that.player.pause()
			};
		});
	}

	// wrap the player in a div with a `data-vjs-player` attribute
	// so videojs won't create additional wrapper in the DOM
	// see https://github.com/videojs/video.js/pull/3856
	render() {
		return (
			<div data-vjs-player>
				<video ref={node => this.videoNode = node}  className={`video-js ${style.videoPlayer}`}  playsInline={true}
                          controls={true}
                           webkit-playsinline="" x5-video-player-type="h5"></video>
			</div>
		)
	}
}