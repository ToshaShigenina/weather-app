import React from 'react';
import { render, screen } from '@testing-library/react';
import { mountTest } from '../../../tests';

import { App } from '../';

describe('App', () => {
  mountTest(App);
});
