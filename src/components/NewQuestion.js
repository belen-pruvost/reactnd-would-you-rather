import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false,
    }

    handleOptionOneChange = (e) => {
        const optionOneText = e.target.value

        this.setState(() => ({
            optionOneText
        }))
    }

    handleOptionTwoChange = (e) => {
        const optionTwoText = e.target.value

        this.setState(() => ({
            optionTwoText
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOneText, optionTwoText } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(optionOneText, optionTwoText))

        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            toHome: true,
        }))
    }

    render() {
        const { optionOneText, optionTwoText, toHome } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <h1 className='center'>Create New Question</h1>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <h2>Would you rather...</h2>

                    <input
                        placeholder="Enter Option One Text Here"
                        value={optionOneText}
                        onChange={this.handleOptionOneChange}
                        className='textarea'
                    />

                    <h2 className='centralized-option'><span>OR</span></h2>

                    <input
                        placeholder="Enter Option Two Text Here"
                        value={optionTwoText}
                        onChange={this.handleOptionTwoChange}
                        className='textarea'
                    />

                    {optionOneText !== '' && optionOneText === optionTwoText && (
                        <h3 className='error'>
                            Option One and Option Two need to be different
                        </h3>
                    )}

                    <button
                        className='btn submittable'
                        type='submit'
                        disabled={optionOneText === '' || optionTwoText === '' || optionOneText === optionTwoText}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}
export default connect()(NewQuestion)