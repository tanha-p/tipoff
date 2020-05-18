import React from "react";
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import TestTags from '../Tags';

describe("Tags", () => {
    const tags=["tag-1", "tag-2","tag-3"];

    it("matches snapshot", () => {
        const tree = renderer.create(<TestTags tags={tags} />).toJSON();
        expect(tree).toMatchSnapshot();
    
    });
    
    it("renders without issues", () =>{
        const component = shallow(<TestTags tags={tags} />);
        expect(component.find('.dark-tag').length).toEqual(tags.length);
        
    });

});

