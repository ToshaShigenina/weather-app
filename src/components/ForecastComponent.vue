<template>
  <section class="forecast">
    <div class="container">
      <h2 class="heading">
        Прогноз
      </h2>

      <tabs-nav-compoonent 
        class="forecast__label"
        :tabs="tabs"
        :active-tab="activeTab"
      />

      <!-- <div class="tabs forecast__tabs">
              <div class="tabs__item active slider">
                  <div class="slider__wrapper">
                      <div class="slider__container">
                          <div class="card card_small tabs__card">
                              <h3 class="card__name">Завтра</h3>

                              <img
                              src="./img/weather/fog.png"
                              alt=""
                              class="card__icon"
                              />

                              <div class="card__term">
                              <span class="card__term-max">10°C</span>
                              <span class="card__term-min">4°C</span>
                              </div>
                          </div>
                      </div>
                  </div>
                  <button
                      class="btn_slider btn_prev tabs__btn tabs__btn-prev"
                      disabled
                  ></button>
                  <button
                      class="btn_slider btn_next tabs__btn tabs__btn-next"
                  ></button>
              </div>
              <div class="tabs__item slider">
                  <div class="tabs__container slider__wrapper">
                      <div class="slider__container">
                      <div class="card card_small tabs__card">
                          <h3 class="card__name">15:00</h3>

                          <img
                          src="./img/weather/fog.png"
                          alt=""
                          class="card__icon"
                          />

                          <div class="card__term">
                          <span class="card__term-max">10°C</span>
                          </div>
                      </div>

                      <div class="card card_small tabs__card">
                          <h3 class="card__name">16:00</h3>

                          <img
                          src="./img/weather/fog.png"
                          alt=""
                          class="card__icon"
                          />

                          <div class="card__term">
                          <span class="card__term-max">10°C</span>
                          </div>
                      </div>

                      <div class="card card_small tabs__card">
                          <h3 class="card__name">17:00</h3>

                          <img
                          src="./img/weather/fog.png"
                          alt=""
                          class="card__icon"
                          />

                          <div class="card__term">
                          <span class="card__term-max">10°C</span>
                          </div>
                      </div>

                      <div class="card card_small tabs__card">
                          <h3 class="card__name">18:00</h3>

                          <img
                          src="./img/weather/fog.png"
                          alt=""
                          class="card__icon"
                          />

                          <div class="card__term">
                          <span class="card__term-max">10°C</span>
                          </div>
                      </div>

                      <div class="card card_small tabs__card">
                          <h3 class="card__name">19:00</h3>

                          <img
                          src="./img/weather/fog.png"
                          alt=""
                          class="card__icon"
                          />

                          <div class="card__term">
                          <span class="card__term-max">10°C</span>
                          </div>
                      </div>

                      <div class="card card_small tabs__card">
                          <h3 class="card__name">20:00</h3>

                          <img
                          src="./img/weather/fog.png"
                          alt=""
                          class="card__icon"
                          />

                          <div class="card__term">
                          <span class="card__term-max">10°C</span>
                          </div>
                      </div>

                      <div class="card card_small tabs__card">
                          <h3 class="card__name">21:00</h3>

                          <img
                          src="./img/weather/fog.png"
                          alt=""
                          class="card__icon"
                          />

                          <div class="card__term">
                          <span class="card__term-max">10°C</span>
                          </div>
                      </div>

                      <div class="card card_small tabs__card">
                          <h3 class="card__name">22:00</h3>

                          <img
                          src="./img/weather/fog.png"
                          alt=""
                          class="card__icon"
                          />

                          <div class="card__term">
                          <span class="card__term-max">10°C</span>
                          </div>
                      </div>

                      <div class="card card_small tabs__card">
                          <h3 class="card__name">23:00</h3>

                          <img
                          src="./img/weather/fog.png"
                          alt=""
                          class="card__icon"
                          />

                          <div class="card__term">
                          <span class="card__term-max">10°C</span>
                          </div>
                      </div>

                      <div class="card card_small tabs__card">
                          <h3 class="card__name">0:00</h3>

                          <img
                          src="./img/weather/fog.png"
                          alt=""
                          class="card__icon"
                          />

                          <div class="card__term">
                          <span class="card__term-max">10°C</span>
                          </div>
                      </div>

                      <div class="card card_small tabs__card">
                          <h3 class="card__name">01:00</h3>

                          <img
                          src="./img/weather/fog.png"
                          alt=""
                          class="card__icon"
                          />

                          <div class="card__term">
                          <span class="card__term-max">10°C</span>
                          </div>
                      </div>

                      <div class="card card_small tabs__card">
                          <h3 class="card__name">02:00</h3>

                          <img
                          src="./img/weather/fog.png"
                          alt=""
                          class="card__icon"
                          />

                          <div class="card__term">
                          <span class="card__term-max">10°C</span>
                          </div>
                      </div>
                      </div>
                  </div>
                  <button
                      class="btn_slider btn_prev tabs__btn tabs__btn-prev"
                      disabled
                  ></button>
                  <button
                      class="btn_slider btn_next tabs__btn tabs__btn-next"
                  ></button>
              </div>
          </div> -->
    </div>
  </section>
</template>

<script>
import TabsNavCompoonent from "./TabsNavComponent.vue";

export default {
  name: "ForecastComponent",
  components: {
    TabsNavCompoonent,
  },
  data() {
    return {
      activeTab: "",
      tabs: [
        {
          text: "на неделю",
          component: "",
        },
        {
          text: "почасовой",
          component: "",
        },
      ],
    };
  },
};
</script>