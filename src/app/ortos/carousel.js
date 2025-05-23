"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

export default function Carousel() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      effect="fade"
      fadeEffect={{ crossFade: true }}
    >
      <SwiperSlide><img src="/1.png" alt="limpeza" /></SwiperSlide>
      <SwiperSlide><img src="/2.png" alt="extracao" /></SwiperSlide>
      <SwiperSlide><img src="/3.png" alt="restauracao" /></SwiperSlide>
      <SwiperSlide><img src="/4.png" alt="clareamento" /></SwiperSlide>
      <SwiperSlide><img src="/5.png" alt="implante" /></SwiperSlide>
      <SwiperSlide><img src="/6.png" alt="aparelho" /></SwiperSlide>
      <SwiperSlide><img src="/7.png" alt="protese" /></SwiperSlide>
      <SwiperSlide><img src="/8.png" alt="lentes" /></SwiperSlide>
    </Swiper>
  );
}
