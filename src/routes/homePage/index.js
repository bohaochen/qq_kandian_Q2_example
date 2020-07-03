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


  play(index) {
    if(this.videoArr[0]){
      this.targetVideo = this.videoArr[index]
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
    var videoImgName = "mediaImg1.png"
    return <div className="content_box" style={{overflow:"auto"}}>
      
      <div onClick={this.play.bind(this,0)} 
      style={{position:"absolute",top:"20px",left:"20px",color:"#fff"}}>21222</div>
   
    
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
        swiperClass={style.caseSwiper}
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
       <VideoPlayer
        {...{
          fluid: true,
          controls: false,
          preload: true,
          language: 'zh-CN', // 设置语言
          poster: `${IMG_BASE}${videoImgName}`,
          sources: [{
            src: `${IMG_BASE}${videoName}`
          }],
        }}
        ref={(el) => this.VideoPlayer = el}
        style={{objectFit:"fill"}}
        playsInline={""}
        onPlayerReady={this.saveVideoObj.bind(this)}
      ></VideoPlayer>
     
       <VideoPlayer
        {...{
          fluid: true,
          controls: false,
          preload: true,
          language: 'zh-CN', // 设置语言
          poster: `${IMG_BASE}${videoImgName}`,
          sources: [{
            src: `${IMG_BASE}${videoName}`
          }],
        }}
        ref={(el) => this.VideoPlayer = el}
        style={{objectFit:"fill"}}
        playsInline={""}
        onPlayerReady={this.saveVideoObj.bind(this)}
      ></VideoPlayer>
        <div style={{width:"100%",height:"100%",background:"red"}} >
         asd
       </div>
      </ReactSwiper>

    </div>
  }
}

export default connect(({ system, homePage }) => ({
  system: system.toJS(),
  homePage: homePage.toJS()
}))(App);
