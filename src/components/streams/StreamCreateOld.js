import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

//This was the old StreamCreate before creation
//of generic StreamForm and code reuse
class StreamCreateOld extends React.Component {
    renderError({error, touched}) {
        
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };
    
    // renderInput(formProps) {
    //     //long hand way property by property
    //     //return <input onChange={formProps.input.onChange} value={formProps.input.value}/>

    //     //short hand syntax
    //     return <input {...formProps.input} />
    // };

    //even shorter syntax using object destructuring
    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.touched && meta.error ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    };

    //no longer call this directly because we are using redux-forms
    //this means reather than being called with an event property it is called with formValues
    onSubmit = (formValues) => {
        //no longer have to call this as redux-forms handleSubmit takes care of this for us
        //event.preventDefault();
        
        //console.log(formValues);
        this.props.createStream(formValues);

    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Title"/>
                <Field name="description" component={this.renderInput} label="Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    };
}

const validate = (formValues) => {
    //for this to work the validation properties must be identical to the field names above
    const errors = {};
    
    if (!formValues.title) {
        errors.title = "You must enter a title.";
    }

    if (!formValues.description) {
        errors.description = "You must enter a description.";
    }

    return errors;
};

const formWrapped = reduxForm({
    form: 'streamCreate',
    //validate: validdate can be rewritten as
    validate 
})(StreamCreateOld);

export default connect(null, {
    createStream
})(formWrapped);