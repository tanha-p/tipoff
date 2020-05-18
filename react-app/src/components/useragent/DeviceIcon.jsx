import React from 'react';
import {Icon} from 'bloomer';

import UserAgentUtil from '../../utils/useragent-util';

const DeviceIcon = ({device}) => (
    <span>
        {device && device.type ? (
            <Icon title={device.type + ':' + device.name+':'+device.vendor} className={UserAgentUtil.getDeviceIcon(device.type)} />    
        ):(
            <Icon className='fas fa-laptop' />    
        )}
    </span>
);

export default DeviceIcon;