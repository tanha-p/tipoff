import React from 'react';
import {Title, Icon} from 'bloomer';
import './PageTitle.css'

export default function  PageTitle  ({pageTitle, loading})  {
    
    document.title = 'Tipoff - '+pageTitle;

    return (<Title isSize={2} className="pageTitle">
        {pageTitle}
        {loading ? (<Icon className="fas fa-spin fa-spinner app-spinner" />) 
        : 
        (<React.Fragment></React.Fragment>)}
        
    </Title>
)};
