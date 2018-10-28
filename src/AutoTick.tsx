import React, { useState } from 'react';

class AutoTick extends React.Component<{
    onTick: () => void,
    interval: number
}, { ticker: number }> {

    constructor(props: {
        onTick: () => void,
        interval: number
    }
    ) {
        super(props);
        const tickerId = window.setInterval(props.onTick, props.interval);
        this.state = {
            ticker: tickerId
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.ticker);
    }

    render() {
        return (<div>AUTOTICKING</div>);
    }
}

export default AutoTick;