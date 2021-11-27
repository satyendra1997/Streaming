import React from "react";
import { connect } from "react-redux";
import streams from "../../apis/streams";
import {fetchStream,editStream} from "../../actions"
import _ from 'lodash';
import StreamForm from "./StreamForm";
class StreamEdit extends React.Component
{  
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit=(formValues)=>
    {
         this.props.editStream(this.props.match.params.id,formValues);

    }
    
    render(){
   if(!this.props.stream)
   {
       return <div>Loading.....</div>
   }
    return (

        <div>
            <h3>Edit The Stream</h3>
            <StreamForm onSubmit={this.onSubmit}
             initialValues= {_.pick(this.props.stream,'title','description')}
            ></StreamForm>
        </div>
    );
    }
}

const mapStateToProps=(state,ownProps)=>{

    return {stream:state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchStream,editStream})(StreamEdit);