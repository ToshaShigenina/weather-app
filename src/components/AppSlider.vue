<template>
  <div 
    ref="slider" 
    class="slider"
  >
    <div class="slider__wrapper">
      <div 
        ref="sliderContainer" 
        class="slider__container"
      >
        <slot />
      </div>
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
import { ref, reactive, onMounted, onUpdated } from "vue";

export default {
  name: "AppSlider",
  props: {
    slidesPerView: {
      type: Number,
      default: 1,
    },
    betweenSlides: {
      type: Number,
      default: 0,
    },
    breackpoints: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const slider = ref(null);
    const sliderContainer = ref(null);
    const currentSlide = ref(1);
    const getSlideCount = ref(null);
    const marginBetweenSlides = ref(props.betweenSlides);
    const slidesPerView = ref(props.slidesPerView);
    const breackpoints = reactive(props.breackpoints);
    const slideWidth = ref(null);
    const translate = ref(0);

    const watchBreackpoints = () => {
      const points = Object.keys(breackpoints);
      const minPoint = Math.min(...points);
      points.forEach((item) => {
        if (window.innerWidth >= item) {
          const count = breackpoints[item].slidesPerView
          if(count !== undefined) {
            slidesPerView.value = count;
          }
        } else if (window.innerWidth < minPoint) {
          slidesPerView.value = props.slidesPerView;
        }
      });
    };

    const calcSlideWidth = (slides) => {
      if (slider.value && sliderContainer.value) {
        watchBreackpoints();
        slideWidth.value =
          (sliderContainer.value.clientWidth -
            marginBetweenSlides.value * (slidesPerView.value - 1)) /
          slidesPerView.value;
        slides.forEach((slide, i) => {
          if (i) slide.style.marginLeft = `${marginBetweenSlides.value}px`;
          slide.style.width = `${slideWidth.value}px`;
        });
      }
    };

    const watchSlides = () => {
      const slides = slider.value.querySelectorAll(".slide");

      getSlideCount.value = slides.length;
      calcSlideWidth(slides);
      if (getSlideCount.value)
        window.addEventListener("resize", () => calcSlideWidth(slides));
    };

    const nextSlide = () => {
      if (currentSlide.value !== getSlideCount.value) {
        currentSlide.value++;
        if (
          getSlideCount.value > slidesPerView.value &&
          sliderContainer.value.scrollWidth +
            translate.value -
            slideWidth.value >
            sliderContainer.value.clientWidth
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
          (sliderContainer.value.scrollWidth -
            sliderContainer.value.clientWidth) *
          -1;
      }
      sliderContainer.value.style.transform = `translateX(${translate.value}px)`;
    };

    onMounted(() => {
      if (slider.value && sliderContainer.value) watchSlides();
    });

    onUpdated(() => {
      if (!getSlideCount.value) watchSlides();
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
  
}

.slider__wrapper {
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
  display: flex;
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

.slider__btn::before {
  content: "";
  width: 12px;
  height: 16px;
  background-image: url("../assets/img/slider-arrow.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
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
}

.slider__btn-next {
  right: 0;
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