import React from 'react';
import { withRouter } from 'dva/router';
import { Link } from 'react-router-dom';
import ImgPlaceHold from '@components/ImgPlaceHold';
import ReactSwiper from '@components/ReactSwiper'
import { IMG_BASE } from 'constants';
import * as Tools from '@utils/tools'
import style from './CaseSwiper.less';


class CaseSwiper extends React.Component {

	render() {
		const { data } = this.props;
		return (<ReactSwiper
			swiperClass={style.caseSwiper}
			slideClass={style.swiperSlide}
			options={{
				slidesPerView: 'auto',
				spaceBetween: 20,
				observer: true,// 当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
				on: {
					touchStart: function (event) {
						event.stopPropagation();
					},
				},
			}}
		>
			{
				data.map(newItem => {
					var item= newItem.case;
					if(item){
						return <Link key={item.id} to={`/case_details?id=${item.id}`} className={style.caseItem}>
						<div className={style.caseItemCover}>
							<ImgPlaceHold width="624px" height="295px">
								<img src={`${IMG_BASE}${item && item.cover && item.cover[0] && item.cover[0].url}`} alt={item.name} />
							</ImgPlaceHold>
						</div>
						<div className={style.caseItemBody}>
							<div className={style.cibThumb}>
								<ImgPlaceHold width="116px" height="116px" useImgHeight={false}>
									<img src={`${IMG_BASE}${item.brandLogo && item.brandLogo.url}`} alt={item.brandName} />
								</ImgPlaceHold>
							</div>
							<div className={style.cibInfo}>
								<div className={`text-ellipsis-2 ${style.cibInfoTitle}`}>{item.brandName} × {item.exteriorName}</div>
								<div className={`text-ellipsis-2 ${style.cibInfoContent}`}>{item.exteriorContent}</div>
							</div>
						</div>
						<div className={style.caseItemData}>
							{
								item.datas && item.datas.map(subItem => {
									return (<div className={style.cidItem} key={subItem.id}>
										<div className={`${style.cidItemTitle} ${Tools.checkChinese(subItem.value) ? style.pingFangFont : ''}`}>{subItem.value}</div>
										<div className={style.cidItemDesc}>{subItem.label}</div>
									</div>)
								})
							}
						</div>
					</Link>
					}else{
						return ""
					}
					
				})
			}
		</ReactSwiper>)
	}
}


export default withRouter(CaseSwiper);
