import React from 'react'

export default function Tag(props) {
    return (
        <div className={`${props.bgColor} ${props.textColor} px-2 py-1 rounded absolute`} icon={props.icon} bgColor={props.bgColor} textColor={props.textColor}>
            <p>This site built by {props.handle}</p>
        </div>
    )
}