import React from 'react';

import BrowserIcon from './BrowserIcon';
import OsIcon from './OsIcon';
import DeviceIcon from './DeviceIcon';

const UserAgentMini = ({ua}) => (
    <span>
        <BrowserIcon browser={ua ? ua.browser : null} />
        <OsIcon os={ua ? ua.os : null} />
        <DeviceIcon device={ua ? ua.device : null} />
    </span>
);

export default UserAgentMini;