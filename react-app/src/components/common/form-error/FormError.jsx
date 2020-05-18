import React from 'react';
import {Notification} from 'bloomer';

import './FormError.css';

export default function FormError({hideError,errors}) {
    return (
        <div>
            <Notification isHidden={hideError} isColor="danger" className="tipoff-notification">
                {errors && errors.length ? (
                    <ul>
                        {errors.map((err,index) => 
                                <li key={index}>{err}</li>
                        )}
                    </ul>
                ) : (
                    <span></span>
                )}
            </Notification>
        </div>
    )
};
