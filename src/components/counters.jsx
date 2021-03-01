import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
  state = {
    count: 1,
    skills: ['a', 'b'],
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  handleIncrement = (counter) => {
    // copy object
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);

    counters[index] = { ...counter };
    counters[index].value++;
    console.log(this.state.counters[index]);
    this.setState({ counters });
  };

  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);

    counters[index] = { ...counter };
    counters[index].value--;
    console.log(this.state.counters[index]);
    this.setState({ counters });
  };

  handleDelete = (id) => {
    const counters = this.state.counters.filter((c) => c.id !== id);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };
  render() {
    return (
      <React.Fragment>
        {/* <Counters
            counters={this.state.counters}
            onDelete={this.handleDelete}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
          /> */}
        <button
          className='btn btn-primary btn-sm my-2'
          onClick={this.props.onReset}
        >
          Reset
        </button>

        {this.props.counters.map((c) => (
          <Counter
            key={c.id}
            counter={c}
            onIncrement={this.props.onIncrement}
            onDelete={this.props.onDelete}
            onDecrement={this.props.onDecrement}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Counters;
