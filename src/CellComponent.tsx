import React from 'react';

const sharedStyle = {
    margin: 0,
    padding: 0,
    width: '10px',
    height: '10px',
    borderStyle: 'outset',
    borderWidth: '1px',
    display: 'inline-block'
}

const aliveStyle = {
    ...sharedStyle,
    backgroundColor: "#5be018"
}

const deadStyle = {
    ...sharedStyle
}

interface Props {
    alive: boolean,
    onClick: () => void,
    style: React.CSSProperties
}

class CellComponent extends React.PureComponent<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div onClick={() => this.props.onClick()} style={
                this.props.alive ? { ...this.props.style, ...aliveStyle } : { ...this.props.style, ...deadStyle }
            }>
            </div>
        );
    }
}

export default CellComponent;