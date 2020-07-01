import React from 'react';
import { withRouter } from 'dva/router';
import kandianAdImg from 'assets/images/kandianAd.png'
import { Tabs } from 'antd-mobile';
import style from './style/head.less';

const tabs = [
  { title: '首页', key: '/homePage' },
  { title: '资源', key: '/advert' },
  { title: '案例', key: '/case' },
  { title: '投放', key: '/putin' },
];

class App extends React.Component {
  state = {
    currentKey: '/homePage'
  }

  componentWillReceiveProps() {
    const { pathname } = this.props.location;
    let name = pathname;
    if (name.indexOf('_detail') > -1) {
      name = name.split('_detail')[0];
    }
    this.setState({ currentKey: name });
  }

  tabChange = (tab, index) => {
    this.setState({
      currentKey: tab.key
    })
    this.props.history.replace(`${tab.key}`);
  }
  goHome = ()=>{
    this.setState({
      currentKey: '/homePage'
    })
    this.props.history.replace(`/homePage`);
  }

  render() {
    const { content, showHeadShadow } = this.props;
    return (
      <div className={`${style.tabHead} common-tab-head`}>
        <div className={`${style.kandianAdImg} ${showHeadShadow && style.shawStyle}`}>
         <div className={style.kandianImgBox} onClick={this.goHome}><img src={kandianAdImg} /></div>
        </div>

        <Tabs tabs={tabs}
          page={this.state.currentKey}
          distanceToChangeTab={0.8}
          useOnPan={false}
          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
          // onChange={(tab, index) => { this.tabChange(tab, index) }}
          onTabClick = {(tab, index) => { this.tabChange(tab, index) }}
        >
          {/* <div 
          className="animateDiv"
           style={{
            height: "100%",
            overflow: "hidden"
          }}>
            {content}
          </div> */}
        </Tabs>
      </div>
    );
  }
}


export default withRouter(App);
