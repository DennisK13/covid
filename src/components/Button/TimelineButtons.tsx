import React from 'react'

interface Props {
    buttons: Array<string>;
}

const TimelineButtons = ({buttons}:Props) => {
    return (
        <>
        {buttons.map((button:any, index:number) => {
            return (
                <button key={index}>{button}</button>
            )
        })}
        </>
    )
}

export default TimelineButtons
