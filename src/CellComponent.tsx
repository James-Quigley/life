import React from 'react';



interface Props {
    alive: boolean,
    onClick: () => void,
    style: React.CSSProperties,
    cellSize: number
}

class CellComponent extends React.PureComponent<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const sharedStyle = {
            margin: 0,
            padding: 0,
            width: `${this.props.cellSize}px`,
            height: `${this.props.cellSize}px`,
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

        return (
            <div onClick={() => this.props.onClick()} style={
                this.props.alive ? { ...this.props.style, ...aliveStyle } : { ...this.props.style, ...deadStyle }
            }>
            </div>
        );
    }
}

export default CellComponent;