import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);
    // Add a new key/value pair in the state to keep track of type
    this.state = {
      search: "",
      type: "all", // "all" initially to show all produce
    };
  }

  // Sets the state whenever the user types on the search bar
  onSearch = (event) => {
    this.setState({ search: event.target.value.toLowerCase() });
  }

  // TODO: Add a new method to handle dropdown selection
  handleTypeChange = (type) => {
    this.setState({ type });
  }

  // TODO: Add a new method to filter produce based on type
  filterType = (item) => {
    const { type } = this.state;
    return type === "all" || item.type.toLowerCase() === type.toLowerCase();
  }

  // TODO: Modify filterItem to consider both search and type filters
  filterItem = (item) => {
    return (
      item.name.toLowerCase().search(this.state.search) !== -1 &&
      this.filterType(item)
    );
  }

  render() {
    const produceTypes = ["all", "fruit", "vegetable"]; // Add other types as needed

    return (
      <div className="filter-list">
        <h1>Produce Search</h1>
        <input type="text" placeholder="Search" onChange={this.onSearch} />

        {/* TODO: Add DropdownButton and Dropdown.Item components */}
        <DropdownButton
          title={`Filter by Type: ${this.state.type}`}
          id="produce-type-dropdown"
          onSelect={this.handleTypeChange}
        >
          {produceTypes.map((type) => (
            <Dropdown.Item key={type} eventKey={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        {/* Pass the filtered produce to the List component */}
        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;
