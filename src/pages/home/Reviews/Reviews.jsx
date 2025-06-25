import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import reviewImg from '../../../assets/customer-top.png';

// Utility to shuffle and filter unique by name+image combo here
const shuffleUniqueReviews = (reviews) => {
  const seen = new Set();
  const unique = [];

  reviews.forEach((review) => {
    const key = `${review.userName}-${review.user_photoURL}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(review);
    }
  });

  // Shuffle unique reviews here
  return unique
    .map((item) => ({ sort: Math.random(), value: item }))
    .sort((a, b) => a.sort - b.sort)
    .map((obj) => obj.value);
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/reviews.json')
      .then((res) => res.json())
      .then((data) => {
        const unique = shuffleUniqueReviews(data);
        setReviews(unique);
      });
  }, []);

  return (
    <div className="pb-24 px-4 max-w-6xl mx-auto">
      {/* Section Header here*/}
      <div className="flex flex-col items-center text-center mb-12">
        <img src={reviewImg} alt="Customer Review" className="mb-4 w-28" />
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2">What Our Customers Are Saying</h2>
        <p className="text-gray-600 max-w-2xl text-base md:text-lg">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      {/* Swiper Carousel here*/}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="!pb-8"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white p-6 h-[300px] flex flex-col justify-between rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center max-w-md mx-auto border border-gray-100">
              <img
                src={review.user_photoURL}
                alt={review.userName}
                className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-gray-300"
              />
              <h3 className="text-lg font-bold text-gray-800">{review.userName}</h3>
              <p className="text-yellow-600 text-sm mb-2">⭐ {review.ratings} / 5</p>
              <p className="text-gray-600 italic text-sm">"{review.review}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
