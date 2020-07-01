import React from 'react';
import { withRouter } from 'dva/router';
import IconFont from '@components/IconFont';
import A from '@components/A';
import style from './title.less';


class App extends React.Component {
  IconFont
  state = {
  }

  state = {
  }

  render() {
    const { source } = this.props;
    return (
      <div className={style.titleWrap}>
        <div className={style.titleText}>{source.titleText}</div>
        <div className={style.subTitleBox}>
          <span className={style.subTitle}>{source.subTitle}</span>
          {
            source.moreText ?
              <A
                href={source.moreLink ? source.moreLink : '#!'}
                style={{ display: 'inline-block' }}
              >
                <span className={style.moreText}>{source.moreText}<IconFont name="right-arrow" color="#4343FF" size="22" /></span>
              </A>
              : ''
          }

        </div>
        {/* <div className={style.blueBlock}></div> */}
      </div>
    );
  }
}


export default withRouter(App);
