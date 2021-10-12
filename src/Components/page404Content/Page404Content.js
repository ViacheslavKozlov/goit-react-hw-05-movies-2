import React from "react";
import image404 from "../../images/bluegg.jpg";
import style from "../../pages/404Page/404Page";

const Page404Content = () => {
  return (
    <div className={style.imgWrapper}>
      <img src={`${image404}`} alt="404" />
    </div>
  );
};

export default Page404Content;
