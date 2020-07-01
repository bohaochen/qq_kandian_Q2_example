import React from 'react';
import "./Loading.css"

const Loading = () => (<div
  style={{
    height: '100%',
    paddingTop: "15%",
    textAlign: "center"
  }}
>

  <div className="loadingPage">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>

  <span   className="fontS40" >
    正在努力为您加载...
    </span>
</div>);

const Error = () => (   <div
  style={{
    height: '100%',
    paddingTop: "15%",
    textAlign: "center"
  }}
>

  <div className="loadingPage">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>

  <span   className="fontS40" >
    Oops，页面似乎崩溃了！
    </span>
</div>
  );

export default function MyLoadingComponent({ error, pastDelay }) {
  if (error) {
    console.log(error)
    return <Error />;
  } else if (pastDelay) {
    return <Loading />;
  } else {
    return null;
  }
}
