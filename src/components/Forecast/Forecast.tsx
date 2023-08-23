import React from 'react';
import { Slider } from '../Slider';

import './style.css';

const Forecast = () => {
    const slides = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
    ];

    return (
        <section className="forecast section">
            <div className="container">
                <div className="forecast__heading">
                    <h2 className="heading">
                        Прогноз
                    </h2>
                </div>

                <div className="forecast__content">
                    <Slider
                        slidesPerView={ 6 }
                        marginBetweenSlides={ 30 }
                        breackpoints={ {
                            480: {
                                slidesPerView: 1,
                                marginBetweenSlides: 10,
                            },
                            1024: {
                                slidesPerView: 3,
                                marginBetweenSlides: 20,
                            }
                        } }
                    >
                        { slides.map((slide, i) => (
                            <Slider.Slide key={ 'slide-' + i }>
                                <p>{ slide }</p>
                            </Slider.Slide>
                        )) }
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Forecast;