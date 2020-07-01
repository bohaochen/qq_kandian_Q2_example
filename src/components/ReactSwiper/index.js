import React from 'react';
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

export default class ReactSwiper extends React.Component {
	componentDidMount() {
		this.mySwiper = new Swiper(this.swiperNode, this.props.options)
	}

	componentWillUnmount() {
		if (this.mySwiper) {
			this.mySwiper.destroy();
		}
	}

	render() {
		const { options } = this.props;
		return (
			<div className={`swiper-container ${this.props.swiperClass}`} ref={node => this.swiperNode = node}>
				<div className='swiper-wrapper'>
					{
						React.Children.map(this.props.children, (child, index) => {
							return <div className={`swiper-slide ${this.props.slideClass}`} key={index}>{child}</div>
						})
					}
				</div>
			</div>
		)
	}
}