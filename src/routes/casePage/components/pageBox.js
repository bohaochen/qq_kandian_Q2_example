import React from "react";
import style from "./pageBox.less";


class App extends React.Component {
  IconFont;
  state = {};

  state = {};

  render() {
    const { source } = this.props;


    return (
      <div className={style.pageBox}>
        <div className={style.mediaBox} style={{height:"calc(100vw * 1.784 )"}}>{this.props.children}</div>
        <div className={style.textBtnBox}>

          <div className={style.textBox}>
            <div className={style.leftContent}>
              <div className={style.relativeBox}>123</div>
            </div>
            <div className={style.rightContent}></div>
          </div>

          <div className={style.btnBox}>下一个二哥哥</div>

        </div>
      </div>
    );
  }
}

export default App;
