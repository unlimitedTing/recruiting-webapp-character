import React, { Component } from 'react';
import { ATTRIBUTE_LIST} from '../consts.js';

class Attribute extends Component {
    
    handleAttributeChange = (attribute, value) => {
      this.props.onAttributeChange(attribute, value);
    };
  
    render() {
      const attributeRows = ATTRIBUTE_LIST.map((attributeName) => {
        const attributeValue = this.props.attributes[attributeName];
        const attributeModifier = this.props.getAttributeModifier(attributeName);
        return (
          <div className="attribute-row" key={attributeName}>
            <span className="attribute-name">{attributeName}:</span>
            <span className="attribute-value">{attributeValue}</span>
            <span className="attribute-modifier">(Modifier:{`${attributeModifier >= 0 ? "+" : "-"}${Math.abs(attributeModifier)}`})</span>
            <button className="attribute-button" onClick={() => this.handleAttributeChange(attributeName,1)}>+</button>
            <button className="attribute-button" onClick={() => this.handleAttributeChange(attributeName,-1)}>-</button>
          </div>
        );
      });
      return (
        <div>
          <h2>Attributes</h2>
          <div className="attribute-control-container">
            {attributeRows}
          </div>
        </div>
      );
    }
  }
export default Attribute;