import React, { Component } from 'react';
import {CLASS_LIST} from '../consts.js';

class Class extends Component {
    handleClassSelect = (selectedClass) => {
      this.props.onClassSelect(selectedClass);
    };
  
    isClassEligible = (c) => {
      const requirements = CLASS_LIST[c];
      for(let attr in requirements){
        if(this.props.attributes[attr]<requirements[attr]){
          return false;
        }
      }
      return true;
    };
  
    render() {
      return (
        <div>
          <h2>Class</h2>
          {Object.keys(CLASS_LIST).map((c) => (
            <div key={c}>
              <span style={{ color: this.isClassEligible(c) ? 'green' : this.props.selectedClass === c ? 'red' : 'white' }} onClick={() => this.handleClassSelect(c)}>
                {c}
              </span>
            </div>
          ))}
        </div>
      );
    }
  }

  export default Class;