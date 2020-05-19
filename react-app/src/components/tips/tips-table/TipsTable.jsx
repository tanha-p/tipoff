import React from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import { Table, Content, Icon } from 'bloomer';

import UserAgentMini from '../../useragent/UserAgentMini';
import Tags from '../../common/tags/Tags';

import './TipsTable.css';

const TipsTable = ({tips}) => {
    
    const history = useHistory();

    const viewTip = (e, tipId) => { 
        e.preventDefault();
        history.push({
            pathname: '/tip/'+tipId
        });
    }
    return (
        <Content>
            <Table isBordered isStriped  id="tips-table">
                <thead >
                    <tr className = "header-row" >
                        <th className="is-hidden-touch">Event Type</th>
                        <th>UA</th>
                        <th>Event Title</th>
                        <th className="is-hidden-touch">Tags</th>
                        <th>Created On</th>
                        <th className="is-hidden-touch">View</th>
                    </tr>
                </thead>
                {tips && tips.length ? (
                    <tbody >
                    {tips.map((tip) => 
                        <tr key={tip.tip_id} 
                                className = {'tip-row '+tip.event_type} 
                                onClick={(e)=>{viewTip(e, tip.tip_id)}}
                                style={{cursor:"pointer"}}>
                            <td className="is-hidden-touch">{tip.event_type}</td>
                            <td><UserAgentMini ua={tip.user_agent} ></UserAgentMini></td>
                            <td>{tip.event_title}</td>
                            <td className="is-hidden-touch"><Tags tags={tip.tags} ></Tags> </td>
                            <td><Moment fromNow>{tip.created_on}</Moment></td>
                            <td className="is-hidden-touch view-tip-icon" ><Icon className='fas fa-file-alt' /></td>
                        </tr>
                    )}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan="6">This project hasn't received any Tips yet. You can refer to the Setup Guide to get started.</td>
                        </tr>
                    </tbody>
                )}
            </Table>
        </Content>
    )
};

export default TipsTable;
