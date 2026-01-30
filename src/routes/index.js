// import React from "react";
// import { Route, Switch } from "react-router-dom";
// import Components from "./components/index";
// import Main from "./main/index";
// import { Col, Row } from "antd";


// const App = ({ match }) => (

//   <div className="gx-main-content-wrapper">
//     <Row justify={"center"} >
//       <Col xs={24} lg={24} >
//         <Switch>
//           <Route path={`${match.url}main`} component={Main} />
//           <Route path={`${match.url}components`} component={Components} />
//         </Switch>
//       </Col>
//     </Row>
//   </div>
// );

// export default App;





import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Components from "./components/index";
import Main from "./main/index";
import { Col, Row } from "antd";
import MobileDetect from 'mobile-detect';

const App = ({ match }) => {
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 927);

  // const checkDevice = () => {
  //   // const isMobileSize = window.innerWidth <= 927;
  //   // const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  //   // const isMobileAgent = /android|iPad|iPhone|iPod|IEMobile|WPDesktop|BlackBerry|Opera Mini|IEMobile|Windows Phone/.test(userAgent);
  //   // console.log('isMobileSize:', isMobileSize);
  //   // console.log('isMobileAgent:', isMobileAgent);
    
  //   const md = new MobileDetect(window.navigator.userAgent);
  //   const isMobileSize = window.innerWidth <= 768;
  //   const isMobileAgent = md.mobile() !== null;

  //   // Detect if developer tools are open
  //   const isDebuggerOpen = () => {
  //     const threshold = 160; // Threshold can vary
  //     return (
  //       window.outerWidth - window.innerWidth > threshold ||
  //       window.outerHeight - window.innerHeight > threshold
  //     );
  //   };
    
    

  //   setIsMobile(isMobileSize && isMobileAgent && isDebuggerOpen());
  // };

  useEffect(() => {

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      if (event.keyCode === 123) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);

    // checkDevice(); // Initial check

    // window.addEventListener('resize', checkDevice);
    // window.addEventListener('focus', checkDevice); // Check on tab switch

    // return () => {
    //   window.removeEventListener('resize', checkDevice);
    //   window.removeEventListener('focus', checkDevice);
    // };
  }, []);

  // if (!isMobile) {
  //   return <div className=" gx-container gx-h-100 gx-fs-xxxl gx-text-red gx-font-weight-heavy gx-text-uppercase gx-bg-flex gx-justify-content-center gx-align-items-center"> security reasons  website is only available on mobile devices.</div>;
  // }

  return (
    <div className="gx-main-content-wrapper" style={{marginBottom: '100px'}}>
      <Row justify={"center"} >
        <Col xs={24} lg={24} >
          <Switch>
            <Route path={`${match.url}main`} component={Main} />
            <Route path={`${match.url}components`} component={Components} />
          </Switch>
        </Col>
      </Row>
    </div>
  );
};

export default App;
