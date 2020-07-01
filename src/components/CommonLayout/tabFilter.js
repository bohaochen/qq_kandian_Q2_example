import React from 'react';
import { withRouter } from 'dva/router';
import * as Tools from '@utils/tools';
import { compareObj } from '@utils/tools';
import "assets/css/iconfont/iconfont.css";
import style from './style/tabFilter.less';
class App extends React.PureComponent {
  state = {
    filterData: [],
    isChanged: false,
    fixedTab: false,
    filter: [],
    filterOne: {},
    filterSecondary: {},
    hideTab: false
  }
x
  showMore = (item, index) => {
    const { hideTab, filterOne, filterSecondary, filterMoreData } = this.state;
    var hasData = false;
    var isNewItemName = false;
    Object.keys(filterOne).map((item1) => {
      if (filterOne[item1]) {
        hasData = true
        isNewItemName = (item1 != item.type)
      }
    })
    if (hideTab && hasData && !isNewItemName) {
      //已选择选项，并且下拉被隐藏，则显示
      this.setState({ hideTab: false })
      return
    } else if (!hasData) {
      //如果没选项，则无论如何都应该显示
      this.setState({ hideTab: false })
    } else if (isNewItemName) {
      this.setState({ hideTab: false })
    }

    if (filterMoreData && filterMoreData.type !== item.type) {
      filterOne[filterMoreData.type] = false;
    }
    filterOne[item.type] = (filterOne[item.type]) ? false : true;
    //初始化二级菜单全部字段被选中
    filterSecondary[item.type] = filterSecondary[item.type] ? filterSecondary[item.type] : { 0: true };
    const _index = index;
    this.setState({ selectFilterIndex: _index, filterOne, filterMoreData: { data: item.children, type: item.type }, showMore: (_index === null ? false : true) })
  }
  filter = (item, index) => {
    const { filterSecondary, filterMoreData } = this.state;
    const { filterOne } = this.state;
    if (filterMoreData && filterMoreData.type) {
      filterOne[filterMoreData.type] = false;
    }
    filterOne[item.type] = filterOne[item.type] ? false : true;
    this.setState({ showMore: false, filterOne });
    this.props.refresh(filterOne, filterSecondary);
  }
  checkSecondary = (item, uid) => {
    const { filterSecondary, filterMoreData, filterOne } = this.state;
    const type = filterMoreData.type;
    let secondArr = filterSecondary[type] || [];
    let isAllCheck = true;
    if (uid === 0) {//点击全部时 其他元素默认都被选中不展示check图标
      filterMoreData.data.map((item) => {
        if (item.uid === 0) {
          secondArr[0] = true;
        } else {
          secondArr[item.uid] = false;
        }
      })

    } else {// 子项被选中时，全部字段取消被选中
      if (!secondArr[uid]) {
        secondArr[0] = false;
        secondArr[uid] = true;
        const uidArr = Object.keys(secondArr);
        if (uidArr.length === filterMoreData.data.length) {
          uidArr.map((i) => {
            if (i !== '0' && !secondArr[i]) {
              isAllCheck = false
            }
          })
          if (isAllCheck) {
            uidArr.map((_i) => {
              if (_i !== '0') {
                secondArr[_i] = false;
              } else {
                secondArr['0'] = true;
              }
            })
          }
        } else {
          isAllCheck = false;
        }
      } else {
        // 子项被取消时
        secondArr[uid] = !filterSecondary[type][uid];
        const uidArr = Object.keys(secondArr);
        uidArr.map((i) => {
          if (i && secondArr[i]) {
            isAllCheck = false //有子项没被取消，全选按钮依然不被选中
          }
        })
      }
    }
    if (isAllCheck) {
      secondArr[0] = true;
    }
    this.getTypeName(uid, isAllCheck);
    filterSecondary[type] = secondArr;
    setTimeout(() => {
      this.setState({ filterSecondary, [type + 'isAllCheck']: isAllCheck });
      this.props.refresh(filterOne, filterSecondary)
    }, 10)
  }
  // getInitName = (arr,source)=>{
  //   const { filterSecondary, filterData, filterMoreData, selectFilterIndex } = this.state;
  //   if (uid === 0 || !uid || isAllCheck) {
  //     name = this.getuidName(0, filterMoreData.data);
  //   }else{
  //     let uidArr = [];
  //     if (uid && Object.prototype.toString.call(uid) === '[object Array]') {
  //       uidArr = uid;
  //     } else {
  //       uidArr = Object.keys(filterSecondary[type]);
  //     }
  //     uidArr.map((item) => {
  //       if (item && filterSecondary[type][item]) {
  //         let sourceName = this.getuidName(item, filterMoreData.data);
  //         if (sourceName === "QQ浏览器") {
  //           sourceName = "浏览器"
  //         }
  //         name = name ? name + '/' + sourceName : sourceName
  //       }
  //     })
  //   }
  //   this.setState({ filterData: source, isChanged: true });
  // }
  getTypeName = (uid, isAllCheck, setIndex, setType, setMoreData) => {
    const { filterSecondary, filterData, isChanged } = this.state;
    const { source } = this.props;
    let { selectFilterIndex, filterMoreData } = this.state;
    filterMoreData = setMoreData !== undefined ? setMoreData : filterMoreData;
    selectFilterIndex = setIndex !== undefined ? setIndex : selectFilterIndex;
    const type = setType !== undefined ? setType : filterMoreData.type;
    let name = ''
    if (uid === 0 || !uid || isAllCheck) {
      name = this.getuidName(0, filterMoreData.data);
    } else {
      let uidArr = [];
      if (uid && Object.prototype.toString.call(uid) === '[object Array]') {
        uidArr = uid;
      } else {
        uidArr = Object.keys(filterSecondary[type]);
      }
      uidArr.map((item) => {
        if (item && filterSecondary[type][item]) {
          let sourceName = this.getuidName(item, filterMoreData.data);
          if (sourceName === "QQ浏览器") {
            sourceName = "浏览器"
          }
          name = name ? name + '/' + sourceName : sourceName
        }
      })
    }
    const sourceFilterData = !isChanged ? source : filterData;
    sourceFilterData[selectFilterIndex].name = name;
    this.setState({ filterData: sourceFilterData, isChanged: true });
  }
  getuidName = (uid, arr) => {
    let name = ''
    arr.map(item => {
      if ((String(item.uid) === String(uid)) || (!item.uid && !uid)) {
        if (String(uid) === '0' || !uid) {
          name = item.showName
        } else {
          name = item.name

        }
      }
    })

    return name;
  }

  hiddenHead = (fixedTab) => {
    var dom = document.getElementsByClassName("common-tab-head")[0];
    if (dom) {
      if (fixedTab) {
        dom.style.display = "none"
      } else {
        dom.style.display = "block"

      }
    }

  }

  componentDidMount() {
    var { fixedTab } = this.props;
    this.hiddenHead(fixedTab)
    document.getElementById("animateDiv").addEventListener('scroll', this.handlePageScroll, false);
  }
  componentWillReceiveProps(nextProps) {
    if (!compareObj(this.props.source, nextProps.source)) {
      const { querySource } = nextProps;
      if (!this.isEmpty(querySource)) {
        this.setFilter(querySource, nextProps.source);
      }
    }
  }


  componentWillUnmount() {
    document.getElementById("animateDiv").removeEventListener('scroll', this.handlePageScroll);
    document.getElementsByClassName("common-tab-head")[0].style.top = 0 + "px"
  }
  isEmpty = (obj) => {
    /* eslint-disable */
    for (const key in obj) {
      return false;
    }
    return true;
    /* eslint-enable */
  }
  setFilter = (obj, source) => {
    if (this.state.changeFilter) {
      return;
    } else {
      this.setState({ changeFilter: true });
    }
    const { filterSecondary, filterOne } = this.state;
    const key = Object.keys(obj);
    let _index = 0;
    let filterMoreData;
    let filterMoreDataArr = {};
    key.map((item, index) => {
      let typeStr = key[index];
      let type;
      if (typeStr.indexOf('.') > -1) {
        type = typeStr.split('.')[0];
      } else {
        type = typeStr
      }
      // _index = source.findIndex(item => item.type === type);
      source.map((sourceItem, sourceIdx) => {
        if (source[sourceIdx] && source[sourceIdx].type === type) {

          if (source[sourceIdx].children) {
            filterMoreDataArr[type] = { data: source[sourceIdx].children, type: type };
            if (!filterMoreData) {
              _index = sourceIdx;
              filterMoreData = { data: source[sourceIdx].children, type: type };
              filterOne[type] = true;
            }
          } else {
            filterOne[type] = true;
          }
        }
      })
      const uid = obj[typeStr];
      if (uid && Object.prototype.toString.call(uid) === '[object Array]') {
        if (!filterSecondary[type]) {
          filterSecondary[type] = {};
        }
        uid.map(item => {
          filterSecondary[type][item] = true;
        })
      } else {
        if (uid !== 'true') {
          filterSecondary[type] = { [uid]: true };
        }
      }
    })
    // const type = key[0].split('.')[0];
    // const _index = source.findIndex(item => item.type === type);
    // filterOne[type] = true;
    // const uid = obj[key[0]];
    // console.log(uid);
    // if (uid && Object.prototype.toString.call(uid) === '[object Array]') {
    //   if (!filterSecondary[type]) {
    //     filterSecondary[type] = {};
    //   }
    //   uid.map(item => {
    //     filterSecondary[type][item] = true;
    //   })
    // } else {
    //   filterSecondary[type] = { [uid]: true };
    // }
    //初始化二级菜单全部字段被选中
    //  this.getTypeName(uid, false, filterMoreData, _index, source);
    this.setState({
      selectFilterIndex: _index, filterMoreData, filterSecondary,
      filterOne, showMore: (_index === null ? false : true)
    }, function () {
      const typeArr = Object.keys(filterSecondary);
      const twoObj = filterSecondary;
      typeArr.map((item, index) => {
        const newArr = [];
        const valueArr = Object.keys(filterSecondary[item]);
        valueArr.map(id => {
          if (twoObj[item][id] && id) {
            if (id !== '0') {
              newArr.push(id)
            }
          }
        })
        this.getTypeName(newArr, false, index, item, filterMoreDataArr[item]);
      })
    })
  }

  handlePageScroll = (e) => {
    //距离顶部的距离
    this.fixLayout()
    this.closeDrop()
  }

  fixLayout = () => {
    //调整位置与dom样式
    var dom = document.getElementsByClassName("common-tab-head")[0];
    var tabOffsetTop = document.getElementById("headBoxHeight").getBoundingClientRect().top;
    let scrollTop = document.getElementById("animateDiv").scrollTop;
    var headHeight = dom.offsetHeight;
    // console.log(tabOffsetTop,headHeight,scrollTop)

    if (tabOffsetTop < headHeight) {
      dom.style.top = tabOffsetTop - headHeight + "px"
    }
    if (tabOffsetTop <= 0 && (!this.state.fixedTab)) {
      this.setState({
        fixedTab: true
      })
    } else if (tabOffsetTop > 0 && this.state.fixedTab) {
      this.setState({
        fixedTab: false
      })
    }
    if ((scrollTop == 0 || tabOffsetTop > headHeight) && dom.style.top != "0px") {
      dom.style.top = 0 + "px"
    }
  }

  closeDrop = () => {
    if (!this.state.hideTab) {
      this.setState({
        hideTab: true
      })
    }
  }



  render() {
    const { filterSecondary, filterData, isChanged, filterOne, hideTab, fixedTab } = this.state;
    const { source } = this.props;
    const filterSource = source && !isChanged ? source : filterData;
    return (
      <div id="headBoxHeight" className={`${style.headBoxHeight} ${fixedTab && style.headBoxFixed}`}>
        <div >
          <div className={`${style.filterWrap}`}>
            {
              filterSource && filterSource.map((item, index) => {
                if (item.children && item.children.length > 0) {
                  return <div className={`${style.filterMore} ${(this.state[item.type + 'isAllCheck'] || this.state[item.type + 'isAllCheck'] === undefined) ? '' : style.filterMoreActive} ${filterOne && filterOne[item.type] ? style.showMoreActive : ''}  ${hideTab && style.litterBox}`} key={`filterMore${index}`} onClick={() => { this.showMore(item, index) }}>{item.name}
                    {

                      ((filterOne[item.type] || !(this.state[item.type + 'isAllCheck'] || this.state[item.type + 'isAllCheck'] === undefined))) ? <span className="icon iconfont icon-up-arrow"></span> : <span className="icon iconfont icon-left-arrow"></span>
                    }
                  </div>
                } else {
                  return <div className={`${style.filterItem} ${filterOne[item.type] ? style.filterActive : ''}`} key={`filterMore${index}`} onClick={() => { this.filter(item, index) }}>{item.name}</div>
                }
              })
            }
          </div>
          <div className={`${(!hideTab && filterOne && this.state.filterMoreData && filterOne[this.state.filterMoreData.type]) ? style.moreWrap : style.hideWrap}`}>
            {
              this.state.filterMoreData && this.state.filterMoreData.data.map((item, index) => {
                return <div className={`${style.secondary} ${filterSecondary[this.state.filterMoreData.type] && filterSecondary[this.state.filterMoreData.type][item.uid] ? style.secondaryActive : ''}`}
                  onClick={() => { this.checkSecondary(item, item.uid) }} key={`filterMoreData${index}`}>
                  {

                    <span className="icon iconfont icon-check-circle"></span>
                  }
                  {item.name}
                </div>
              })
            }
          </div>
        </div>
      </div>


    );
  }
}


export default withRouter(App);
