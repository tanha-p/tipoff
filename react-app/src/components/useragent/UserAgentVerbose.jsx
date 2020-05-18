import React from 'react';
import { 
    Subtitle,
    Columns,
    Column
} from 'bloomer';

import UserAgentMini from './UserAgentMini';

import './UserAgent.css'

export default function UserAgentVerbose({ua = {}}) {
    return (
        <div>
            <div className="ua">
                <UserAgentMini ua={ua} ></UserAgentMini>
            </div>
            {
                ua && ua.ua && 
                <div style={{marginTop:"1em",overflowWrap:"break-word"}}>{ua.ua}</div>
            }
            <Columns style={{marginTop:".5em"}}>
                <Column>
                    <Subtitle isSize="6">
                        Browser Name
                    </Subtitle>
                    { ua.browser && <>{ua.browser.name}</> }
                </Column>
                <Column>
                    <Subtitle isSize="6">
                        Version
                    </Subtitle>
                    { ua.browser && <>{ua.browser.version}</> }
                </Column>
                <Column>
                    <Subtitle isSize="6">
                        Major
                    </Subtitle>
                    { ua.browser && <>{ua.browser.major}</> }
                </Column>
            </Columns>
            <Columns>
                <Column isSize={4}>
                    <Subtitle isSize="6">
                        Engine
                    </Subtitle>
                    { ua.engine && <>{ua.engine.name}</> }
                </Column>
                <Column>
                    <Subtitle isSize="6">
                        Version
                    </Subtitle>
                    { ua.engine && <>{ua.engine.version}</> }
                </Column>
            </Columns>
            <Columns>
                <Column>
                    <Subtitle isSize="6">
                        Operating System
                    </Subtitle>
                    { ua.os && <>{ua.os.name}</> }
                </Column>
                <Column>
                    <Subtitle isSize="6">
                        Version
                    </Subtitle>
                    { ua.os && <>{ua.os.version}</> }
                </Column>
                <Column>
                    <Subtitle isSize="6">
                        Architecture
                    </Subtitle>
                    { ua.cpu && <>{ua.cpu.architecture}</> }
                </Column>
            </Columns>
            <Columns>
                <Column>
                    <Subtitle isSize="6">
                        Device
                    </Subtitle>
                    { ua.device && <>{ua.device.vendor}</> }
                </Column>
                <Column>
                    <Subtitle isSize="6">
                        Model
                    </Subtitle>
                    { ua.device && <>{ua.device.model}</> }
                </Column>
                <Column>
                    <Subtitle isSize="6">
                        Vendor
                    </Subtitle>
                    { ua.device && <>{ua.device.vendor}</> }
                </Column>
            </Columns>
        </div>
    )
}
