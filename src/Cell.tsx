import React from 'react';

const sharedStyle = {
    margin: 0,
    padding: 0,
    width: '10px',
    height: '10px',
    borderStyle: 'outset',
    borderWidth: '1px'
}

const aliveStyle = {
    ...sharedStyle,
    backgroundColor: "#5be018"
}

const deadStyle = {
    ...sharedStyle
}

class Cell extends React.PureComponent<{ alive: boolean, started: boolean }, {}> {

    constructor(props: { alive: boolean, started: boolean }) {
        super(props);
    }

    render() {
        return (
            <div style={
                this.props.alive ?
                    { ...aliveStyle, pointerEvents: this.props.started ? 'none' : 'auto' }
                    : { ...deadStyle, pointerEvents: this.props.started ? 'none' : 'auto' }}>
            </div>
        );
    }
}

export default Cell;