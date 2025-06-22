
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import reviewImg from '../../../assets/customer-top.png';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/reviews.json') 
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  return (
    <div className="pb-12 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col items-center text-center mb-10">
        <img src={reviewImg} alt="Customer Review" className="mb-4" />
        <h2 className="text-3xl font-bold">What our customers are saying</h2>
        <p className="text-gray-600 max-w-xl mt-2">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {reviews.map(review => (
          <SwiperSlide key={review.id}>
            <div className=" p-6 rounded-xl shadow-md text-center max-w-lg mx-auto">
              <img
                src={review.user_photoURL}
                alt={review.userName}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{review.userName}</h3>
              <p className="text-gray-500 text-sm mb-2">Rating: {review.ratings} / 5</p>
              <p className="text-gray-700 italic">"{review.review}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
