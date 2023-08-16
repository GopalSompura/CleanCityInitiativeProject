import * as React from "react";
import "../../Styles/Home.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
function Review() {
  const [reviews, setReviews] = useState([]);
  const handleclick = async () => {
    const getfeedbacks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/feedbacks/getfeedbacks"
        );
        setReviews(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getfeedbacks();
  };

  useEffect(() => {
    handleclick();
  }, []);

  return (
    <>
      <div className="feedbacks">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {reviews.map((r) => {
            return (
              <>
                <SwiperSlide>
                  <div className="reviews">
                    <MenuItem className="detail">
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          border: "1px solid white",
                        }}
                        src={r.userimage}
                      />
                      {r.reviewedby}
                    </MenuItem>
                    <Rating name="rating" value={r.rating} readOnly />
                    <p className="comment">{r.comment}</p>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
        {/* {reviews.map((r) => {
          return (
            <>
              <div className="reviews">
                <MenuItem className="detail">
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      border: "1px solid white",
                    }}
                    src={r.userimage}
                  />
                  {r.reviewedby}
                </MenuItem>
                <Rating name="rating" value={r.rating} readOnly />
                <p className="comment">{r.comment}</p>
              </div>
            </>
          );
        })} */}
      </div>
    </>
  );
}

export default Review;
