import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';
import { expect } from 'chai';
import App from '../src/components/app/App';
import { SingleAlert } from '../src/components/profile/profileHome/alertList/singleAlert/SingleAlert';
import { CreateAlert } from '../src/components/profile/profileHome/createAlert/CreateAlert';


const adapter = new Adapter();
Enzyme.configure({ adapter });


describe('The React Components', () => {

    describe('<App/> component', () => {
        let appWrapper;
    
        before('Create component', () => appWrapper = shallow(<App/>));
    
        it('renders a <div>', () => expect(appWrapper.find('div')).to.have.length(1));
    })

    describe('<SingleAlert/> component', () => {
        let singleAlertWrapper, destroyAlertSpy;
        const alert = { cityName: 'New York', aqiThreshold: 51 };
        

        before('Create component', () => {
            destroyAlertSpy = spy();
            singleAlertWrapper = shallow(<SingleAlert destroyAlert={ destroyAlertSpy } alert={ alert }/>);
        })

        it('renders a <button>', () => expect(singleAlertWrapper.find('button')).to.have.length(1));

        it('when the `Delete` <button> is clicked, it invokes a function passed in', () => {

            // The function passed into button should not be called immediately.
            expect(destroyAlertSpy.calledOnce).to.be.false;

            //This will trigger any onClick handlers registered to the component.
            singleAlertWrapper.find('button').at(0).simulate('click');

            expect(destroyAlertSpy.calledOnce).to.be.true;
        })
    })
    
    describe('<CreateAlert/> component', () => {
        let createAlertWrapper, handleSubmitSpy;
    
        before('Create component', () => {
            handleSubmitSpy = spy();
            createAlertWrapper = shallow(<CreateAlert handleSubmit={ handleSubmitSpy }/>);
        })

        it('renders a 2 <input> fields', () => expect(createAlertWrapper.find('input')).to.have.length(2));

        it('when the `Create Alert` <button> is clicked, it invokes a function passed in', () => {

            // The function passed into button should not be called immediately.
            expect(handleSubmitSpy.calledOnce).to.be.false;

            //This will trigger any onClick handlers registered to the component.
            createAlertWrapper.find('form').at(0).simulate('submit');

            expect(handleSubmitSpy.calledOnce).to.be.true;
        })
    })
})
