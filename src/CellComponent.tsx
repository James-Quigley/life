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

class CellComponent extends React.PureComponent<{ alive: boolean }, {}> {

    constructor(props: { alive: boolean }) {
        super(props);
    }

    render() {
        return (
            <div style={
                this.props.alive ? { ...aliveStyle } : { ...deadStyle }
            }>
            </div>
        );
    }
}

export default CellComponent;