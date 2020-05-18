import React from 'react'

export const TabContentRenderer = ({tabs, tab, ...rest}) => {
    const Comp = tabs[tab];
    return(
        <Comp {...rest} />
    );
};

export default TabContentRenderer;