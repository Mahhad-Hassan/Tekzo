import React, { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";

const Carousel = () => {
  const { data, fetchingAllProducts } = useContext(DataContext);
  useEffect(() => {
    fetchingAllProducts(); // call it when component mounts (optional)
  }, [fetchingAllProducts]);

  console.log("data", data);

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowLeft
          className="arrow"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            left: "30px", // 🔹 Changed from 50px to 15px so it stays inside screen
            top: "50%", // Keep it vertically centered
            transform: "translateY(-50%)",
          }}
        />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`arrow ${className}`} style={{ zIndex: 3 }}>
      <AiOutlineArrowRight
        className="arrow"
        style={{
          ...style,
          display: "block",
          borderRadius: "50px",
          background: "#f53347",
          color: "white",
          position: "absolute",
          padding: "2px",
          right: "30px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
    </div>
  );
};

  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe:true,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };

  return (
    <div>
      <Slider className="relative" {...settings}>
        {data?.slice(0, 7)?.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10"
            >
              <div className="flex gap-3 justify-center h-[600px] items-center px-4">
                <div className="space-y-6">
                  <h3 className="text-red-500 font-semibold font-sans text-sm">
                    Powering Your World With The In Electronics
                  </h3>
                  <h1 className="text-4xl font-bold uppercase line-clamp-3 md:w-[500px] text-white">
                    {item.title}
                  </h1>
                  <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">
                    {item.description}
                  </p>
                  <button className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2">
                    Shop Now
                  </button>
                </div>
                <div className="hidden lg:block">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="custom-img rounded-full hover:scale-105 transition-all shadow-2xl shadow-red-400"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <Category />
    </div>
  );
};

export default Carousel;
