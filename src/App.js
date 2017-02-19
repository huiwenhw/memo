import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import { sortable } from 'react-sortable';
import dragula from 'react-dragula';
import './App.css';

class App extends Component {
	render() {
		return (
				<TodoInput />
			   )
	}
}

// Receives TodoList's items state property as a prop called entries
var TodoList = React.createClass({
	render: function() {
		return (
				<div className="lists">
				<div className="listHeader">
				<p className="listTitle"> To Do </p>
				<p className="listTotal"> { this.props.entries.length } </p>
				</div>
				<div id="todolist" className="list">
				{ this.props.entries }
				</div>
				</div>
			   );
	}
});

var InProgressList = React.createClass({
	render: function() {
		return (
				<div className="lists">
				<div className="listHeader">
				<p className="listTitle"> In Progress  </p>
				<p className="listTotal"> { this.props.entries.length } </p>
				</div>
				<div id="inprogresslist" className="list">
				{ this.props.entries }
				</div>
				</div>
			   );
	}
});

var TodoInput = React.createClass({
	getInitialState: function() {
		return {
			todoItems: [],
			inprogressItems: []
		};
	},
	addItem: function(e) {
		var itemArray = this.state.todoItems;

		// Adding object of text & key properties
		itemArray.push({
			text: this._inputElement.value,
			key: Date.now()
		});

		this.setState({
			todoItems: itemArray
		});

		this._inputElement.value = "";

		// Prevents triggering browser's default POST behavior
		e.preventDefault();
	},
	updateItems: function(e1, target, source) {
			console.log(`e1: ${e1.id} target: ${target.id} source: ${source.id}`);
			// remove from source 
			// Receiving error cause dragula removes from DOM manually
			var tempArr = this.state.todoItems.filter(function(item) {
				console.log(`inupdate item.text: ${item.text} item.key: ${item.key} `);
				console.log(item.key !== parseInt(e1.id, 10));
				return item.key !== parseInt(e1.id, 10);
			});
			this.setState({
				todoItems: tempArr 
			});
			// add to target 
			var itemArray = this.state.inprogressItems;
			itemArray.push(e1);
			this.setState({
				inprogressItems: itemArray
			});
	},
	render: function() {
		function createTasks(item) {
			return <div className="list-item" id={item.key} key={item.key}>{item.text}</div>
		}

		var todolistItems = this.state.todoItems.map(createTasks);
		var inprogresslistItems = this.state.inprogressItems.map(createTasks);
		return (
				<div className="todoListMain">
				<div className="header">
				<form onSubmit={this.addItem}>
				<button type="submit">add</button>
				<input ref={(a) => this._inputElement = a}  
				placeholder="enter task"></input>
				</form>
				</div>
				<div className="wrapper">
				<TodoList entries={todolistItems}/>
				<InProgressList entries={inprogresslistItems}/>
				</div>
				</div>
			   );
	},
	componentDidMount() {
		var that = this;
		dragula([document.getElementById('todolist'), document.getElementById('inprogresslist')]).on('drop', function(e1, target, source) {	
			that.updateItems(e1, target, source);
		});
	}
});

export default App;
