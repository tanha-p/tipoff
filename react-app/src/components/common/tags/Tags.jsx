import React, {useState, useEffect} from 'react';
import {Tag, Delete} from 'bloomer';

import './Tags.css';

export default function Tags({tags,deletefunc= ()=>{},isdelete = false, ...rest}) {
    const [delVal, setDelVal] = useState('');
    const onDelete = e => {
        const val = e.target.dataset.tag;
        setDelVal(val);
    }

    useEffect(() => {
        deletefunc(delVal)
    }, [delVal, deletefunc]);
    return (
        <>
        {tags && tags.length ? (
           <>
                {tags.map((tag,index) => 
                    <Tag key={index} {...rest} className="dark-tag">
                        {tag} 
                        { isdelete ? (
                            <Delete data-tag={tag} onClick={e => onDelete(e)} />
                        ) : ( <></>)}
                    </Tag>
                )}
            </>
        ):( <></>)}
        </>
    )
}
