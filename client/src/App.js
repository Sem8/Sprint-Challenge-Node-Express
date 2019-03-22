import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    projects: [],
    actions: []
  };

  componentDidMount() {
    this.getProjects();
  }

  getProjects = () => {
    fetch('http://localhost:4000/api/projects')
    .then(res => res.json())
    .then(res => this.setState({ projects: res }))
    .catch(err => console.log(err));
  };

  renderProject = ({ name, description, completed, id }) => (
    <div key={id}>
    <h1>{name}</h1>
    <p>Description: {description}</p>    
    </div>
  );

  render() {
    const { projects } = this.state;
    return (
      <div className="App">
      
      {projects.map(this.renderProject)}
        
      </div>
    );
  }
}

export default App;
