import React from 'react';
import {Icon} from 'bloomer';

import UserAgentUtil from '../../utils/useragent-util';

const BrowserIcon = ({browser}) => (
    <span >
        {browser && browser.name ? (
            <Icon title={browser.name + ':' + browser.major} className={UserAgentUtil.getBrowserIcon(browser.name)} />    
        ):(
            <Icon className='far fa-window-maximize' />    
        )}
    </span>
);

export default BrowserIcon;