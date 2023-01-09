import React, { Component } from "react";

import './task.css'

export default class Task extends Component {

    state = {
        done: false
    }

    onLabelClick = () => {
        this.setState(( {done} ) => {
            return {
                done: !done
            }
        })
    }

    render() {
        const { label, time, onDeleted } = this.props
        const { done } = this.state

        let classNames = 'description'
        if ( done ) {
            classNames += ' completed';
        }

        return (
            <li className={classNames} >
                <div className="view">
                    <input className="toggle" type="checkbox"/>
                    <label>
                        <span className="description" onClick={this.onLabelClick}> {label} </span>
                        <span className="created">created {time} ago</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button
                        className="icon icon-destroy"
                        onClick={onDeleted}>
                    </button>
                </div>
                <input type="text" className="edit" value="Editing task"/>
            </li>
        )
    }
}





