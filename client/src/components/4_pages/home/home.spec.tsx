import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { HomePage } from './home'

it('should render a HomePage', () => {
  const component = shallow(<HomePage />)
  expect(component).toBeTruthy()
})
