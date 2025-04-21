import React, { useState, useEffect } from "react";
import "./Home.scss";
import BannerImg from "/assets/images/banner.svg";

const Home = () => {
  const [settingValue, setSettingValue] = useState<any>({});

  // useEffect(() => {
  //   fetchSetting();
  // }, []);

  // const fetchSetting = async () => {
  //   try {
  //     const fetchedData = await detailSetting();
  //     if (fetchedData) {
  //       setSettingValue(fetchedData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching exams:", error);
  //   }
  // };

  return <>Home</>;
};

export default Home;
