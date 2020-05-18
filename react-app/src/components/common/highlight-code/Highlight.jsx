import React, {useState} from 'react';
import Highlight from 'react-highlight';
import {
    Button,
    Icon
} from 'bloomer';

import 'highlight.js/styles/vs2015.css';
import './Highlight.css';

export default function HighlightCode({code = "", language = "plaintext"}) {
    const beforeCopyLabel = 'Copy';
    const afterCopyLabel = 'Copied';
    const beforeCopyIcon = 'fas fa-copy';
    const afterCopyIcon = 'fas fa-check';
    const [copyText, setCopyText] = useState(beforeCopyLabel);
    const [copyIcon, setCopyIcon] = useState(beforeCopyIcon);
    const copyToCC = (content, e) => {
        e.preventDefault();
        navigator.clipboard.writeText(content);
        setCopyText(afterCopyLabel);
        setCopyIcon(afterCopyIcon);
        setTimeout(() => {
            setCopyText(beforeCopyLabel);
            setCopyIcon(beforeCopyIcon);
        }, 2000);
    }
    return (
        <div className="code-wrapper">
            { code && code.length &&
                <>
                    <Highlight className={language}>
                        {code}
                    </Highlight>
                    <Button  isColor="danger" className="copy" onClick={e => {copyToCC(code, e)}}>
                        <Icon className={copyIcon} style={{marginRight:".4em"}} />
                        {copyText}
                    </Button>
                </>
            }
        </div>
    )
}
