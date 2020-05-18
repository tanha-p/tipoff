import React from 'react';
import {
    Box
} from 'bloomer';

import Tags from '../../../common/tags/Tags';

export const TipsSearchInfoModalContent = () => {
    const searchTipModalFieldList = [
        "Event Type",
        "Event Title",
        "Tags",
        "Referer",
        "Browser (Name, Version, Major)",
        "Engine (Name, Version)",
        "OS (Name, Version, Architecture)",
        "Device (Type, Model, Vendor)",
        "Note",
        "Stack Trace"
    ]
    return (
        <>
            <Box>
                <div>
                Tips search is a "text" search that searches for tips that match the following event fields.
                </div>
                <Tags tags={searchTipModalFieldList} />
            </Box>
            <Box>
                To search for tips that match the <i>Exact search term</i>, use double quotes. e.g. "Chrome", "unhandled" etc.
            </Box>
        </>
    )
}

export default TipsSearchInfoModalContent;
