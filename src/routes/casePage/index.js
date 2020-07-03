import React from "react";
import { connect } from "dva";
import ReactSwiper from "@components/ReactSwiper";
import VideoPlayer from "@components/VideoPlayer";
import PageBox from "./components/pageBox";
import { IMG_BASE } from "@constants";

import style from "./index.less";

class App extends React.PureComponent {
  state = {};
  videoArr = [];
  targetVideo = null;
  componentDidMount() {
    // setTimeout(this.fullScreen.bind(this),3000)
  }

  play(index) {
    if (this.videoArr[0]) {
      this.targetVideo = this.videoArr[index];
      this.targetVideo.play();
    }
  }

  onPlayerReady(video) {
    this.targetVideo = video;
  }

  saveVideoObj(video) {
    var arr = [...this.videoArr];
    arr.push(video);
    this.videoArr = arr;
    console.log(this.videoArr, "videoArr");
  }

  render = () => {
    const { banners } = this.props.homePage;
    console.log(banners, "banners");
    var videoName = "media1.MP4";
    var videoImgName = "mediaImg1.png";

    var randerList = [
      {
        type:"video",
        tip:"节日热点",
        videoFillType:"cover",
        videoName:"media1.MP4",
        videoImgName:"mediaImg1.png",
        imgList:["media1.mp4"],
        logo:{
          name:"和平精英",
          icon:"icon_hpjy.png"
        },
        ctrText:"CTR高达",
        ctrNum:"45.85%",
        contentMsg:"",
        zyxzText:"QQ看点-信息流第3条-超级蒙层",
        rqdxText:"人群包定向，针对品牌流失用户投放",
        cxldText:"采用QQ看点超级蒙层，多套高质量素材结合游戏元素震撼弹出，精准触达流失用户。",
      },
      {
        type:"video",
        tip:"节日热点",
        videoFillType:"cover",
        videoName:"media8.mp4",
        videoImgName:"mediaImg1.png",
        imgList:["media1.mp4"],
        logo:{
          name:"和平精英",
          icon:"icon_hpjy.png"
        },
        ctrText:"CTR高达",
        ctrNum:"45.85%",
        contentMsg:"",
        zyxzText:"QQ看点-信息流第3条-超级蒙层",
        rqdxText:"人群包定向，针对品牌流失用户投放",
        cxldText:"采用QQ看点超级蒙层，多套高质量素材结合游戏元素震撼弹出，精准触达流失用户。",
      }

    ]

    var swiperDomArr = randerList.map((item,index)=>{
      var dom = null;
      switch (item.type) {
        case "video":
          console.log(item.videoFillType,"videoFillType")
          dom =  <PageBox>
          <VideoPlayer
            {...{
              fluid: true,
              controls: false,
              preload: true,
              language: "zh-CN", // 设置语言
              poster: `${IMG_BASE}${videoImgName}`,
              sources: [
                {
                  src: `${IMG_BASE}${item.videoName}`,
                },
              ],
            }}
            ref={(el) => (this.VideoPlayer = el)}
            style={{ objectFit:"cover"}}
            playsInline={""}
            onPlayerReady={this.saveVideoObj.bind(this)}
          ></VideoPlayer>
        </PageBox>
          break;
      
        default:
          break;
      }
      return dom;
    })
    return (
      <div className="content_box blackBg" style={{ overflow: "auto" }}>
        <ReactSwiper
          className="space-carousel"
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
            slidesPerView: "auto",
            spaceBetween: "8%",
            centeredSlides: true,
            direction: "vertical", // 垂直切换选项
            observer: true, // 当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
            on: {
              touchStart: function (event) {
                event.stopPropagation();
              },
              slideChangeTransitionEnd: function (index) {
                that.setState({ slideIndex: this.activeIndex });
              },
            },
          }}
        >
        {swiperDomArr}
        </ReactSwiper>
      </div>
    );
  };
}

export default connect(({ system, homePage }) => ({
  system: system.toJS(),
  homePage: homePage.toJS(),
}))(App);
