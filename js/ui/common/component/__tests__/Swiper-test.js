import 'react-native';
import React from 'react';
import Swiper from '../Swiper';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<Swiper/>).toJSON();
    expect(tree).toMatchSnapshot();
});
