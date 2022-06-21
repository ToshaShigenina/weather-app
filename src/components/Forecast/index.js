import React from 'react';
import Slider from '../Slider/index';
import SliderItem from '../Slider/SliderItem/index';

import './style.css';

const Forecast = () => {
    const slides = [
        'offjmbgk',
        'zdh665;',
        'hfdghdfghd',
        'dfghdfgh',
        'fghdfgh',
        'ndtyjmfyu',
        'dve5465u67',
    ];
    const slidesElem = slides.map((slide, i) => {
        return (<SliderItem slot={5} key={i+1} >
            <p>
                {i+1}<br/>
                {slide}
            </p>
        </SliderItem>)
    });
    return (
        <section className="forecast section">
            <div className="container">
                <div className="forecast__heading">
                    <h2 className="heading">
                        Прогноз
                    </h2>
                </div>

                <div className="forecast__content">
                    <Slider>
                        {slidesElem}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Forecast;