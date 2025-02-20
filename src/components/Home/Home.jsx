import React from "react";
import RecentProducts from "./components/RecentProducts/RecentProducts";
import PopularCategories from "./components/PopularCategories/PopularCategories";
import StaticSlider from "./components/StaticSlider/StaticSlider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
    <Helmet>
      <title>Home</title>
    </Helmet>
<div className="mx-3">
<StaticSlider/>
<PopularCategories/>
<RecentProducts/>
</div>
</>
  );
}
