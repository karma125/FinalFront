import React, { useState } from 'react';
import styles from './carousel.module.css'; // Import your module styles

export const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className={styles['simple-carousel']}>
      <button onClick={prevSlide} className={`${styles['carousel-button']} ${styles['prev']}`}>Previous</button>
      <div className={styles['carousel-content']}>
        {slides.map((slide, index) => (
          <div key={index} className={`${styles['carousel-slide']} ${index === currentSlide ? styles['active'] : ''}`}>
            {slide}
          </div>
        ))}
      </div>
      <button onClick={nextSlide} className={`${styles['carousel-button']} ${styles['next']}`}>Next</button>
    </div>
  );
};

