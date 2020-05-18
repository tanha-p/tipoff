import React from 'react';
import {Icon} from 'bloomer';

import UserAgentUtil from '../../utils/useragent-util';

const OsIcon = ({os}) => (
    <span>
        {os && os.name ? (
            <Icon title={os.name + ':' + os.version} className={UserAgentUtil.getOSIcon(os.name)} />    
        ):(
            <Icon className='far fa-window-maximize' />    
        )}
    </span>
);

export default OsIcon;