import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import { 
    Content,
    Title,
    Icon,
    Tile,
    Box,
    Card,
    CardHeader,
    CardContent,
    CardHeaderTitle
} from 'bloomer';

import PageTitle from '../../common/page-title/PageTitle';
import UserAgentVerbose from '../../useragent/UserAgentVerbose';
import Tags from '../../common/tags/Tags';
import HighlightCode from '../../common/highlight-code/Highlight';


import '../tips-table/TipsTable.css';
import './TipView.css';

import LZString from 'lz-string';

export default function TipView() {
    const match = useRouteMatch();

    const [loading, setLoading] = useState(false);
    const [tip, setTip] = useState({});
    const tipId = match.params.id;

    useEffect(() => {
		const getTip = async () => {
			setLoading(true);
			axios.get(`/api/v1/tips/${tipId}`)
				.then((resp) => {
					if(resp && resp.data && resp.data.success){
                        setTip(resp.data.data);
					}
				})
				.catch(err => { console.log(err) })
				.finally(()=> { setLoading(false) });
		}
		getTip();
	}, [tipId]);

    return (
        <>
            <Content>
                <PageTitle pageTitle={tip.event_title} loading={loading} />
                <Card>
                    <CardHeader>
                        <CardHeaderTitle className="tip-detail-title">{tip.project_name} </CardHeaderTitle>
                    </CardHeader>
                    <CardContent>
                        <Content>
                                <Tile isAncestor>
                                    <Tile isParent isVertical isSize={4} >
                                        <Tile isChild className="event-type-tile" >
                                            <Box className={tip.event_type} hasTextAlign="centered">
                                                <Title isSize="5">{tip.event_type}</Title>
                                            </Box>
                                            
                                        </Tile>
                                    </Tile>
                                    
                                    <Tile isParent isVertical hasTextAlign="right"  >
                                        <Tile isChild  >
                                            <Box hasTextAlign="centered">
                                                <Title isSize="6">
                                                    <Icon className="far fa-clock" style={{marginRight:".5em"}}></Icon> 
                                                    <Moment >{tip.created_on}</Moment> (<Moment fromNow>{tip.created_on}</Moment>)
                                                </Title>
                                            </Box>
                                        </Tile>
                                    </Tile>
                                
                                </Tile>
                                <Tile isAncestor>
                                    <Tile isParent isVertical isSize={7}>
                                        <Tile isChild  >
                                            
                                                <Title isSize="5">Referer</Title>
                                                <div style={{overflowWrap:"break-word"}}>
                                                    {tip.referer}
                                                </div>
                                                
                                            
                                        </Tile>
                                        <Tile isChild  >
                                            {
                                                tip.user_agent && 
                                               
                                                    <UserAgentVerbose ua={tip.user_agent} />
                                                
                                            }
                                        </Tile>
                                        <Tile isChild  ></Tile>
                                    </Tile>
                                    
                                    <Tile isParent isVertical >
                                        <Tile isChild  >
                                                
                                                <Title isSize="5">Tip ID</Title>
                                                    {tipId && <>{tipId}</>}
                                                
                                            </Tile>
                                        {
                                            tip && tip.tags &&
                                            <Tile isChild  >
                                                
                                                    <Tags tags={tip.tags} isSize="large" />
                                                
                                            </Tile>
                                        }
                                         
                                        {
                                            tip && tip.note && 
                                            <Tile isChild>
                                                
                                                    <Title isSize="5">Note</Title>
                                                    Some note goes here..
                                                
                                            </Tile>
                                        }
                                         {
                                            tip && tip.notifiers && tip.notifiers.length > 0 &&
                                            <Tile isChild>
                                                <Title isSize="5" style={{marginBottom:".5em"}}>Notifications</Title>
                                                { tip.notifiers.map(n => 
                                                    <div key={n} >
                                                    { n.indexOf('Slack') >= 0 && 
                                                        <Icon className="fab fa-slack"/> 
                                                    }
                                                    { n.indexOf('Email') >= 0 && 
                                                        <Icon className="fa fa-envelope"/> 
                                                    }
                                                    {
                                                        <>{n}</>
                                                    }
                                                    </div>
                                                )}
                                             </Tile>
                                        }
                                        
                                        <Tile isChild></Tile>
                                    </Tile>
                                </Tile>
                                
                                <Tile isAncestor>
                                    <Tile isParent isVertical>
                                        <Tile isChild  >
                                                
                                                <Title isSize="5">User</Title>
                                                { tip && tip.user ? (
                                                    <HighlightCode code={JSON.stringify(tip.user, null,4)} language="json" />
                                                ) : (
                                                    <>User information was not provided.</>
                                                )}
                                            
                                        </Tile>
                                        { tip && tip.event_stack && 
                                        <Tile isChild>
                                            <Title isSize="5">Stack Trace</Title>
                                            <HighlightCode code={tip.event_stack.stackTrace} language="javascript" />
                                        </Tile>
                                        }  
                                        { tip && tip.screenshot && tip.screenshot.length >0 && 
                                        <Tile isChild>
                                            <Title isSize="5">Screenshot</Title>
                                            <Box className="screenshot">
                                                <img src={LZString.decompressFromUTF16(tip.screenshot)}  alt="sceenshot"/>
                                            </Box>
                                        </Tile>
                                        }  
                                    </Tile>
                                </Tile>  
                                
                        </Content>     
                    </CardContent>
                </Card>    
            </Content>      
        </>			
	);
}
