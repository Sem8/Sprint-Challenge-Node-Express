import React, { Component } from "react";
import { Route, NavLink, Link } from "react-router-dom";

import "./App.css";

import Action from "./components/Action";

class App extends Component {
  state = {
    projects: [],
    actions: []
  };

  componentDidMount() {
    this.getProjects();
    this.getActions();
  }

  getProjects = () => {
    fetch("http://localhost:4000/api/projects")
      .then(res => res.json())
      .then(res => this.setState({ projects: res }))
      .catch(err => console.log(err));
  };

  getActions = () => {
    fetch("http://localhost:4000/api/actions")
      .then(res => res.json())
      .then(res => this.setState({ actions: res }))
      .catch(err => console.log(err));
  };

  renderProject = ({ name, description, completed, id }) => (
    <div key={id} className="classCardDiv">
      <Link to={`/actions/${id}`}>
        <h1>{name}</h1>
        <p>Description: {description}</p>
        <h4>Completed: {completed.toString()}</h4>
      </Link>
    </div>
  );

  render() {
    const { projects } = this.state;
    return (
      <div className="App">
        {projects.map(this.renderProject)}

        <Route
          exact
          path="/actions/:id"
          render={props => (
            <Action
              {...props}
              actions={this.state.actions}
              projects={this.state.projects}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
