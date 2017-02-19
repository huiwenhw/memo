import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
import List from './List';
import './App.css';


const style = {
	width: 400,
};

class App extends Component {
	render() {
		return (
				<DragDropContextProvider backend={HTML5Backend}>
				<TodoInput />
				</DragDropContextProvider>
			   )
	}
}

class Container extends Component {
	constructor(props) {
		super(props);
		this.moveCard = this.moveCard.bind(this);
		this.state = {
			cards: props.data
		};
	}

	moveCard(dragIndex, hoverIndex) {
		const { cards } = this.state;
		const dragCard = cards[dragIndex];

		this.setState(update(this.state, {
			cards: {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragCard],
				],
			},
		}));
	}

	render() {
		const { cards } = this.state;
		console.log({cards});

		return (
				<div style={style}>
				{cards.map((card, i) => (
							<Card
							key={card.key}
							index={i}
							id={card.key}
							text={card.text}
							moveCard={this.moveCard}
							/>
							))}
				</div>
			   );
	}
}

var Header = React.createClass({
	render: function() {
		return (
				<div className="lists">
				<div className="listHeader">
				<p className="listTitle"> To Do </p>
				<p className="listTotal"> </p>
				</div>
				<div id="todolist" className="list">
				<Container data={this.props.data}/>
				</div>
				</div>
			   );
	}
});

var TodoInput = React.createClass({
	getInitialState: function() {
		return {
			items: [],
			data: [],
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
		// <TodoList entries={todolistItems}/>
		// <InProgressList entries={inprogresslistItems}/>
		e.preventDefault();
	},
	render: function() {
		function createTasks(item) {
			return <div className="list-item" id={item.key} key={item.key}>{item.text}</div>
		}

		var todoitems = this.state.items.map(createTasks);
		return (
				<div className="todoListMain">
				<div className="header">
				<form onSubmit={this.addItem}>
				<button type="submit">add</button>
				<input ref={(a) => this._inputElement = a}  
				placeholder="enter task"></input>
				</form>
				</div>
				<Header data={this.state.items} />
				</div>
			   );
	}
});

export default App;

//module.exports = DragDropContext(HTML5Backend)(Container);

/*
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
*/

/*
   cards: [{
   key: 1,
   text: 'Write a cool JS library',
   }, {
   key: 2,
   text: 'Make it generic enough',
   }, {
   key: 3,
   text: 'Write README',
   }, {
   key: 4,
   text: 'Create some examples',
   }, {
   key: 5,
   text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
   }, {
   key: 6,
   text: '???',
   }, {
   key: 7,
   text: 'PROFIT',
   }],
   */
