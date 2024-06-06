import React, { useState, useEffect } from "react";
import avatar from "../../src/assets/images/avatar.png";
import { formatDate } from "../../src/utils/formatDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../config';

const Feedback = ({ doctorId }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [totalRating, setTotalRating] = useState(0);

  useEffect(() => {
    const fetchDoctorReviews = async () => {
      console.log("fetching data");
      try {
        const res = await fetch(`${BASE_URL}/doctors/${doctorId}/reviews`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        setReviews(result.data.reviews || []);
        setTotalRating(result.data.totalRating || 0);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchDoctorReviews();
  }, [doctorId]);

  return (
    <div>
      <ToastContainer />
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({totalRating})
        </h4>

        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="flex justify-between gap-10 mb-[30px]">
              <div className="flex gap-3">
                <figure className="w-10 h-10 rounded-full">
                  <img className="w-full" src={review.user.photo || avatar} alt="User Avatar" />
                </figure>

                <div>
                  <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                    {review.user.name}
                  </h5>
                  <p className="text-[14px] leading-6 text-textColor">
                    {formatDate(review.createdAt)}
                  </p>

                  <p className="text_para mt-3 font-medium text-[15px]">
                    {review.reviewText}
                  </p>
                </div>
              </div>

              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, index) => (
                  <AiFillStar key={index} color="#0067FF" />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-light text-[14px] leading-6">No reviews yet</p>
        )}
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default Feedback;
