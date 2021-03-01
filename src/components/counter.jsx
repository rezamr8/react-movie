import React, { Component } from 'react';

class Counter extends Component {
  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? 'Zero' : value;
  }

  getBadge() {
    let classes = 'badge badge-';
    classes += this.props.counter.value === 0 ? 'warning' : 'primary';
    return classes;
  }

  getBtn() {
    if (this.props.counter.value === 0) return 'disabled';
    return null;
  }

  render() {
    return (
      <div className='row'>
        <div className='col-1'>
          <span className={this.getBadge()}>{this.formatCount()}</span>
        </div>
        <div className='col-sm'>
          <button
            className='btn btn-secondary btn-sm ml-2 mb-2'
            onClick={() => this.props.onIncrement(this.props.counter)}
          >
            +
          </button>
          <button
            className='btn btn-secondary btn-sm ml-2 mb-2'
            disabled={this.props.counter.value === 0 ? 'disabled' : ''}
            onClick={() => this.props.onDecrement(this.props.counter)}
          >
            -
          </button>
          <button
            className='btn btn-danger btn-sm ml-2'
            onClick={() => this.props.onDelete(this.props.counter.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
