import React from 'react';
import { connect } from 'dva';
import ReactSwiper from '@components/ReactSwiper'
import VideoPlayer from '@components/VideoPlayer';
import { IMG_BASE } from '@constants';


import style from "./index.less"

class App extends React.PureComponent {
  state = {
  }
  videoArr=[]
  targetVideo=null
  componentDidMount() {
    // setTimeout(this.fullScreen.bind(this),3000)
  }


  fullScreen() {
  
    if(this.videoArr[0]){
      this.targetVideo = this.videoArr[0]
      this.targetVideo.play()
    }
  }


  onPlayerReady(video) {
    this.targetVideo = video;
  }

  saveVideoObj(video){
    var arr = [...this.videoArr];
    arr.push(video);
    this.videoArr = arr;
    console.log(this.videoArr,"videoArr")
  }
  
  render = () => {
    const { banners } = this.props.homePage;
    console.log(banners, "banners")
    var videoName = "media1.MP4"
    return <div className="content_box">
      
      <div onClick={()=>{this.videoArr[0].play()}} >1233</div>
      <div onClick={()=>{document.getElementById("myVideoOne").play()}} >2222</div>
      <video
                          id="myVideoOne"
                          playsInline={true}
                          controls={true}
                           webkit-playsinline=""
                           x5-video-player-type="h5"
                          style={{ width: "100%", height: "100%", background: "rgba(0,0,0,0.3)" }}
                          src={`${IMG_BASE}${videoName}`}
                        ></video>
      <VideoPlayer
        {...{
          fluid: true,
          controls: false,
          preload: true,
          language: 'zh-CN', // 设置语言
          // poster: `${IMG_BASE}${val.image.url}`,
          sources: [{
            src: `${IMG_BASE}${videoName}`
          }],
        }}
        ref={(el) => { this.VideoPlayer = el; }}
        playsInline={""}
        onPlayerReady={this.saveVideoObj.bind(this)}
      ></VideoPlayer>
      <ReactSwiper className="space-carousel"
        // frameOverflow="visible"
        // cellSpacing={30}
        // slideWidth={Tools.px2rem(15225)}
        // // infinite
        // dots={false}
        // style={{ touchAction: 'pan-y' }}
        // onTouchStart={ev => ev.stopPropagation()}
        // afterChange={index => this.setState({ slideIndex: index })}
        // swiperClass={style.caseSwiper}
        // slideClass={style.swiperSlide}
        options={{
          slidesPerView: 'auto',
          spaceBetween: "8%",
          centeredSlides: true,
          observer: true,// 当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
          on: {
            touchStart: function (event) {
              event.stopPropagation();
            },
            slideChangeTransitionEnd: function (index) {
              that.setState({ slideIndex: this.activeIndex })
            }
          },
        }}
      >
       111
      </ReactSwiper>

    </div>
  }
}

export default connect(({ system, homePage }) => ({
  system: system.toJS(),
  homePage: homePage.toJS()
}))(App);
