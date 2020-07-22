import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addEducation } from '../../actions/profile'

const AddEducation = ({ addEducation, history }) => {

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        addEducation(formData, history)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add An Education
      </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school experience
      </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* degree" name="degree" value={degree} onChange={(e) => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* school" name="school" value={school} onChange={(e) => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* fieldofstudy" name="fieldofstudy" value={fieldofstudy} required onChange={(e) => onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>* From Date</h4>
                    <input type="date" name="from" value={from} onChange={(e) => onChange(e)} required />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" value={current} checked={current} onChange={(e) => {
                        setFormData({ ...formData, current: !current })
                    }
                    } /> Current Education</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={current ? '' : to} onChange={(e) => onChange(e)} disabled={current ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        value={description}
                        onChange={(e) => onChange(e)}
                        placeholder="Job Description"
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

export default connect(null, { addEducation })(withRouter(AddEducation))
