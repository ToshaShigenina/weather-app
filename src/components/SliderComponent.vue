<template>
  <div 
    ref="slider" 
    class="slider"
  >
    <div 
      ref="sliderContainer" 
      class="slider__container"
    >
      <slot :currentSlide="currentSlide" />
    </div>
    <button
      class="slider__btn slider__btn-prev"
      @click="prevSlide"
    />
    <button
      class="slider__btn slider__btn-next"
      @click="nextSlide"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "SliderComponent",
  props: {
    slidesPerView: {
      type: Number,
      default: 1,
    },
    betweenSlides: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const slider = ref(null);
    const sliderContainer = ref(null);
    const currentSlide = ref(1);
    const getSlideCount = ref(null);
    const marginBetweenSlides = ref(props.betweenSlides);
    const slidesPerView = ref(props.slidesPerView);
    const slideWidth = ref(null);
    const translate = ref(0);

    const calcSlideWidth = (slides) => {
      slideWidth.value =
        (slider.value.clientWidth -
          marginBetweenSlides.value * (slidesPerView.value - 1)) /
        slidesPerView.value;
      slides.forEach((slide, i) => {
        if (i) slide.style.marginLeft = `${marginBetweenSlides.value}px`;
        slide.style.width = `${slideWidth.value}px`;
      });
    };

    const nextSlide = () => {
      if (currentSlide.value !== getSlideCount.value) {
        currentSlide.value++;
        if (
          getSlideCount.value > slidesPerView.value &&
          sliderContainer.value.scrollWidth +
            translate.value -
            slideWidth.value >
            slider.value.clientWidth
        ) {
          translate.value =
            (slideWidth.value + marginBetweenSlides.value) *
            (currentSlide.value - 1) *
            -1;
        } else {
          currentSlide.value = 1;
          translate.value = 0;
        }
        sliderContainer.value.style.transform = `translateX(${translate.value}px)`;
      }
    };

    const prevSlide = () => {
      if (currentSlide.value !== 1) {
        currentSlide.value--;
        if (getSlideCount.value > slidesPerView.value && translate.value < 0) {
          translate.value =
            (slideWidth.value + marginBetweenSlides.value) *
            (currentSlide.value - 1) *
            -1;
        }
      } else {
        currentSlide.value = getSlideCount.value - slidesPerView.value + 1;
        translate.value =
          (sliderContainer.value.scrollWidth - slider.value.clientWidth) * -1;
      }
      sliderContainer.value.style.transform = `translateX(${translate.value}px)`;
    };

    onMounted(() => {
      if (slider.value) {
        const slides = slider.value.querySelectorAll(".slide");

        getSlideCount.value = slides.length;
        calcSlideWidth(slides);
        window.addEventListener("resize", () => calcSlideWidth(slides));
      }
    });

    return {
      currentSlide,
      getSlideCount,
      nextSlide,
      prevSlide,
      slider,
      sliderContainer,
      translate,
      slideWidth,
    };
  },
};
</script>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.slider__container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: flex-start;
  transition: transform 0.5s;
}

.slider__btn {
  --color-bg: var(--color-white);
  --size: 32px;
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-color: var(--color-bg);
  border: none;
  margin-top: 15px;
  transform: translateY(-50%);
}

.slider__btn:disabled {
  opacity: 0.3;
}

.slider__btn-prev,
.slider__btn-next {
  top: calc(50% - (var(--size) / 2));
}

.slider__btn-prev {
  left: 0;
  /* left: calc(var(--size) * -1.5); */
}

.slider__btn-next {
  right: 0;
  /* right: calc(var(--size) * -1.5); */
}

.slider__btn-prev::before,
.slider__btn-next::before {
  content: "";
  width: 12px;
  height: 16px;
  background-image: url("../assets/img/slider-arrow.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}

.slider__btn-prev::before {
  transform: rotateZ(180deg);
}

@media screen and (min-width: 700px) {
  .slider__btn {
    display: flex;
  }
}

</style>