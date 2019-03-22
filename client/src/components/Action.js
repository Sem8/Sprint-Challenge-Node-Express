import React from "react";

import { Route, NavLink } from "react-router-dom";

function Action({ actions, match, projects }) {
  // const { id } = match.params;
  // const action = actions.find(thing => `${thing.project_id}` === id);

  if (projects.id === actions.project_id) {
    return (
      <div className="actionDiv">
        {actions.map(action => (
          <div key={action.id}>
            <h2>Description: {action.description}</h2>
            <p>Notes: {action.notes}</p>
            <p>completed: {action.completed.toString()}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Action;
