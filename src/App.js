import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react/lib/update';
import Container from './Container';
import './App.css';

class App extends Component {
	render() {
		return(
				<TodoInput />
			  )
	}
}

// To add more lists, create array to store items && 
// Add <Container ... /> component in render function below
var TodoInput = React.createClass({
	getInitialState: function() {
		return {
			todoitems:  [],
			inprogressitems: [],
			doneitems: [],
		};
	},
	addItem: function(e) {
		var itemArray = this.state.todoitems;

		// Adding object of text & key properties
		itemArray.push({
			text: this._inputElement.value,
			key: Date.now()
		});

		this.setState({
			todoitems: itemArray
		});

		this._inputElement.value = "";

		// Prevents triggering browser's default POST behavior
		e.preventDefault();
	},
	push: function(listName) {
		return function(card) {
			console.log("push");
			let newState = update(this.state, {
				[listName]: {
					$push: [card]
				}
			});
			console.log(newState);
			this.setState(newState);
		}
	},
	remove: function(listName) {
		return function(index) {
			console.log("remove");
			let newState = update(this.state, {
				[listName]: {
					$splice: [
						[index, 1]
					]
				}
			});
			console.log(newState);
			this.setState(newState);
		}
	},
	move: function(listName) {
		return function(dragIndex, hoverIndex) {
			console.log("parent move");
			const cards = this.state[listName];
			const dragCard = cards[dragIndex];
			let newState = update(this.state, {
				[listName]: {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragCard],
					],
				}
			});
			console.log(newState);
			this.setState(newState);
		}
	},
	render: function() {
		var total = this.state.todoitems.length + this.state.inprogressitems.length + this.state.doneitems.length;
		return (
				<div className="todoListMain">
				<div className="header">
				<form onSubmit={this.addItem}>
				<button type="submit">add</button>
				<input ref={(a) => this._inputElement = a}  
				placeholder="enter task"></input>
				</form>
				<ul className="totalItems">
				<li> TOTAL </li>
				<li id="totalNum"> { total } Projects </li>
				</ul>
				</div>
				<div className="listContainers">
				<Container push={this.push('todoitems').bind(this)} remove={this.remove('todoitems').bind(this)} move={this.move('todoitems').bind(this)} title={"To Do"} id={"todolist"} list={this.state.todoitems} />
				<Container push={this.push('inprogressitems').bind(this)} remove={this.remove('inprogressitems').bind(this)} move={this.move('inprogressitems').bind(this)} title={"In Progress"} id={"inprogresslist"} list={this.state.inprogressitems} />
				<Container push={this.push('doneitems').bind(this)} remove={this.remove('doneitems').bind(this)} move={this.move('doneitems').bind(this)} title={"Done"} id={"done"} list={this.state.doneitems} />
				</div>
				</div>
			   );
	}
});

export default DragDropContext(HTML5Backend)(App);
