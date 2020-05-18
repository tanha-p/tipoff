import React from 'react';
import {  useDispatch } from 'react-redux';

import {
    Button,
    Columns,
    Column
} from 'bloomer';

import {incrementPageNo} from '../../../redux/tips/tips-actions';

export default function TipsLoadMore() {
    const dispatch = useDispatch();

    const incrementTipsPage = (e) => {
        e.preventDefault();
        dispatch(incrementPageNo());
    }

    return (
        <div>
            <Columns isCentered={true}>
                <Column isSize="full" hasTextAlign="centered">
                    <Button 
                        isColor="dark" 
                        onClick={(e) => {incrementTipsPage(e)}} 
                    >Load More Tips</Button>
                </Column>
            </Columns>
            
        </div>
    )
}
