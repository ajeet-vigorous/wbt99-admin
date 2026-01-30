import React, {useState} from "react";
import {Button, Drawer, Radio} from "antd";
import {useDispatch, useSelector} from "react-redux";
import CustomScrollbars from "util/CustomScrollbars";
import { setThemeType} from "appRedux/actions/Setting";

import {

  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_TYPE_DARK,
  THEME_TYPE_LITE,

} from "../constants/ThemeSetting";
import {onNavStyleChange} from "../appRedux/actions";

const CustomizerSystem = () => {

  const [isCustomizerOpened, setIsCustomizerOpened] = useState(false);
  const {themeType, navStyle} = useSelector(({settings}) => settings);
  const dispatch = useDispatch();



  const toggleCustomizer = () => {
    setIsCustomizerOpened(!isCustomizerOpened);
  };

  const onThemeTypeChange = (e) => {
    dispatch(setThemeType(e.target.value));
  };

  const onNavStyleChanges = (navStyle) => {
    dispatch(onNavStyleChange(navStyle));
  };

  const getCustomizerContent = () => {
    return <CustomScrollbars className="gx-customizer">
      <div className="gx-customizer-item">
        <h6 className="gx-mb-3 gx-text-uppercase">Theme</h6>
        <Radio.Group value={themeType} onChange={onThemeTypeChange}>
          <Radio.Button value={THEME_TYPE_LITE}>Lite</Radio.Button>
          <Radio.Button value={THEME_TYPE_DARK}>Dark</Radio.Button>
        </Radio.Group>
      </div>
      <h6 className="gx-mb-3 gx-text-uppercase">Nav Style</h6>
      {getNavStyles(navStyle)}
    </CustomScrollbars>
  };

  const getNavStyles = (navStyle) => {
    return <ul className="gx-nav-option gx-list-inline">
      <li>
      <span onClick={() => onNavStyleChanges(NAV_STYLE_FIXED)}
            className={`gx-pointer ${navStyle === NAV_STYLE_FIXED && 'active'}`}>
      <img src={'/assets/images/layouts/fixed.png'} alt='fixed'/>
      </span>
      </li>
      <li>
      <span onClick={() => onNavStyleChanges(NAV_STYLE_DRAWER)}
            className={`gx-pointer ${navStyle === NAV_STYLE_DRAWER && 'active'}`}>
      <img src={'/assets/images/layouts/drawer nav.png'} alt='drawer nav'/>
      </span>
      </li>
      <li>
      <span onClick={() => onNavStyleChanges(NAV_STYLE_INSIDE_HEADER_HORIZONTAL)}
            className={`gx-pointer ${navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL && 'active'}`}>
      <img src={'/assets/images/layouts/inside header horizontal.png'} alt='inside header horizontal'/>
      </span>
      </li>
    </ul>
  };
 
 

  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={toggleCustomizer}
        open={isCustomizerOpened}>
        {
          getCustomizerContent()
        }
      </Drawer>
      <div className="gx-customizer-option">
        <Button type="primary" onClick={toggleCustomizer}>
          <i className="icon icon-setting fxicon-hc-spin gx-d-block"/>
        </Button>
      </div>
    </>
  );
};

export default CustomizerSystem;
