import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";

import {Link} from 'react-router-dom';
import StreamCreate from "./StreamCreate";
class StreamList extends React.Component {
    componentDidMount() {

       console.log(this.props.fetchStreams()) ;

    }
    renderList() {

        return this.props.streams.map(
            stream => {
                return (
                    <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                        <i className="large middle aligned icon camera"/>
                            <div className="content">
                               <Link to={`/streams/${stream.id}`} className="header"> {stream.title}</Link>
                            
                            <div className="description">

                                {stream.description}

                            </div>
                               
                            </div>
                        
                    </div>
                )
            }
        )

    }

    renderAdmin(stream){

        if(stream.userId===this.props.currentUserId)
        {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">EDIT</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
                      DELETE
                    </Link>
                </div>
            );
        }

    }

    renderCreate(){
        if(this.props.isSignedIn)
        {
            return <div style={{textAlign:'right'}}>
            <Link to="/streams/new" className="ui button primary">
            Create A Stream
            </Link>
            
            </div>
        }
    }
    render() {

        return (
            <div>
                <h2>
                    Streams
                </h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
                <div></div>
            </div>
        )

    }

}

const mapStateToprops = (state) => {
    return { 
        streams: Object.values(state.streams),
        currentUserId:state.auth.userId,
        isSignedIn:state.auth.isSignedIn
     }
}
export default connect(mapStateToprops, { fetchStreams })(StreamList);