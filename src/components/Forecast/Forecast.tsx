import React from 'react';
import { Slider, SliderItem } from '../Slider';

import './style.css';

const Forecast = () => {
    const slides = [
        'offjmbgk',
        /* 'zdh665;',
        'hfdghdfghd',
        'dfghdfgh',
        'fghdfgh',
        'ndtyjmfyu',
        'dve5465u67', */
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
                    <Slider>
                        <SliderItem>
                            <p>
                                kdkvkg
                            </p>
                        </SliderItem>
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Forecast;