"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import styles from './carousel.module.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function Carousel() {
  return (

    <Swiper
      modules={[Autoplay, EffectFade, Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      effect="fade"
      fadeEffect={{ crossFade: true }}
    >
      <SwiperSlide><img src="/1.png" alt="limpeza" className={styles.imagens} /></SwiperSlide>
      <SwiperSlide><img src="/2.png" alt="extracao" className={styles.imagens} /></SwiperSlide>
      <SwiperSlide><img src="/3.png" alt="restauracao" className={styles.imagens} /></SwiperSlide>
      <SwiperSlide><img src="/4.png" alt="clareamento" className={styles.imagens} /></SwiperSlide>
      <SwiperSlide><img src="/5.png" alt="implante" className={styles.imagens} /></SwiperSlide>
      <SwiperSlide><img src="/6.png" alt="aparelho" className={styles.imagens} /></SwiperSlide>
      <SwiperSlide><img src="/7.png" alt="protese" className={styles.imagens} /></SwiperSlide>
      <SwiperSlide><img src="/8.png" alt="lentes" className={styles.imagens} /></SwiperSlide>
    </Swiper>
  );
}
