import React from 'react';

export class Loading extends React.Component {
    state = {
        isLoading: false,
    }

    componentDidCatch(fetcher) {
        fetcher.then(() => this.setState({ isLoading: false }));
        this.setState({
            isLoading: true,
        })
    }

    render() {
        return this.props.children(this.state.isLoading);
    }
}