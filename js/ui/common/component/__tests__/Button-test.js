//require('react-native-mock/mock');
import 'react-native';
import React from 'react';
import {shallow} from 'enzyme'
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import ReactTestUtils from 'react-dom/test-utils';

import Button from '../Button';

const renderer2 = new ShallowRenderer();

describe('Test Button component', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Button/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders correctly width shallow', () => {
        renderer2.render(<Button/>);
        const result = renderer2.getRenderOutput();
        expect(result).toMatchSnapshot();
    });
    it('renders correctly width test-utils', () => {
        const node = shallow(<Button ref={ref => {this.button = ref}} />);
        ReactTestUtils.Simulate.click(node);
    });
    // it('renders as expected', () => {
    //     const wrapper = shallow(
    //         <Button text='确定' loading/>
    //     );
    //     expect(wrapper).toMatchSnapshot();
    //
    //     wrapper.setProps({ text: '下一步' });
    //     expect(wrapper).toMatchSnapshot();
    //
    //     wrapper.setState({loading:true});
    //     expect(wrapper).toMatchSnapshot();
    // });
});
