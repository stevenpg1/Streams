import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    };
    
    onClick(id) {
        this.props.deleteStream(id);
    };

    renderActions() {
        const {id} = this.props.match.params
        return (
            <div className="actions">
                <button onClick={() => this.onClick(id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </div>
        );
    }

    renderContent() {
        if (!this.props.stream){
            return "Please confirm that you wish to delete this stream.";
        }

        return `Please confirm that you wish to the stream, titled: ${this.props.stream.title}`
    }

    render() {
        return (
            <Modal 
                title="Delete Stream"
                modalText={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]};
};

export default connect(mapStateToProps, {
    fetchStream, deleteStream
})(StreamDelete);