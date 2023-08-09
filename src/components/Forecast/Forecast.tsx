import React from 'react';
import { Slider, SliderItem } from '../Slider';

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
                        slidesPerView={ 2 }
                        marginBetweenSlides={ 30 }
                    >
                        { slides.map((slide, i) => (
                            <SliderItem key={ 'slide-' + i }>
                                <p>{ slide }</p>
                            </SliderItem>
                        )) }
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Forecast;