import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import * as Tools from '@utils/tools'
// import TabHead from './head';
import style from './style/index.less';

class CommonLayout extends React.PureComponent {
  state = {
    hasChildren: false,
    showConsult: false,
    showHeadShadow: false,
  };
  componentWillReceiveProps(nextProps) {
 
  }
  componentDidMount() {
   
  }

  componentWillUnmount() {

  }





  render() {
    const { consultData } = this.props.system;
    console.log(consultData,"consultData")
    return (
      <div id="common-page" ref={node => this.commonPage = node}>
        {/* <TabHead showHeadShadow={showHeadShadow} /> */}
        <div
          id="animateDiv">
          {this.props.children}
        </div>
    
      </div>
    );
  }
}

export default connect(({ system, homePage }) => ({
  system: system.toJS(),
  homePage: homePage.toJS()
}))(withRouter(CommonLayout));
