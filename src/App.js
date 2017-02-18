import React, { Component } from 'react';
import { sortable } from 'react-sortable';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	render() {
		return (
				<TodoList />
			   )
	}
}

var ListItem = React.createClass({
	displayName: 'SortableListItem',
	render: function() {
		return (
				<div {...this.props} className="list-item">{this.props.children}</div>
			   )
	}
})

var SortableListItem = sortable(ListItem);
var SortableList = React.createClass({
	getInitialState: function() {
		return {
			draggingIndex: null,
			data: this.props.data
		};
	},
	updateState: function(obj) {
		this.setState(obj);
	},
	render: function() {
		var childProps = { className: 'myClass1' };
		var listItems = this.state.data.items.map(function(item, i) {
			return (
					<SortableListItem
					key={i}
					updateState={this.updateState}
					items={this.state.data.items}
					draggingIndex={this.state.draggingIndex}
					sortId={i}
					outline="list"
					childProps={childProps}
					>{item.text}</SortableListItem>
				   );
		}, this);

		return (
				<div className="list">{listItems}</div>
			   )
	}
});

/*
// Receives TodoList's items state property as a prop called entries
var TodoItems = React.createClass({
	render: function() {
		var todoEntries = this.props.entries;

		function createTasks(item) {
			return <li key={item.key}>{item.text}</li>
		}

		var listItems = todoEntries.map(createTasks);

		return (
				<ul className="itemsList">
				{listItems}
				</ul>
			   );
	}
});
<TodoItems entries={this.state.items}/>
*/

var TodoList = React.createClass({
	getInitialState: function() {
		return {
			items: []
		};
	},
	addItem: function(e) {
		var itemArray = this.state.items;

		// Adding object of text & key properties
		itemArray.push({
			text: this._inputElement.value,
			key: Date.now()
		});

		this.setState({
			items: itemArray
		});

		this._inputElement.value = "";

		// Prevents triggering browser's default POST behavior
		e.preventDefault();
	},
	render: function() {
		var data = {items: this.state.items};
		return (
				<div className="todoListMain">
				<div className="header">
				<form onSubmit={this.addItem}>
				<button type="submit">add</button>
				<input ref={(a) => this._inputElement = a}  
				placeholder="enter task"></input>
				</form>
				</div>
				<div className="listHeader">
				<p className="listTitle"> To Do </p>
				<p className="listTotal"> {this.state.items.length } </p>
				</div>
				<SortableList data={data} />
				</div>
			   );
	}
});

export default App;
