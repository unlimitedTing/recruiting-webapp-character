import React, { Component } from 'react';

class MinimumRequirement extends Component {
  
    render() {
      const requirementRows = Object.entries(this.props.requirements).map(([attribute, value]) => {
        const isMet = this.props.attributes[attribute] >= value;
        return (<div key={attribute}>
          <span>{attribute}</span>
          <span>{value}</span>
          <span style={{ color: isMet?"green":"red"}}> - {isMet ? 'Met' : 'Not Met'}</span>
        </div>
        );
      });
      return (
        <div>
          <h2>Minimum Requirements</h2>
          {requirementRows}
        </div>
      );
    }
  }

  export default MinimumRequirement;