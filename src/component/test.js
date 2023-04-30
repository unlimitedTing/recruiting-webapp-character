import React,{Component} from 'react';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from '../consts';
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
          attributes: {
            Strength: 10,
            Dexterity: 10,
            Intelligence: 10,
            Wisdom: 10,
            Charisma: 10,
            Constitution: 10
          },
          // skill:this.getAttr('intelligence')
    };
    this.getAttr = this.getAttr.bind(this);
  }

  getAttr=(attr)=>{
    const value = this.state.attributes[attr];
    return value;
  }
  handleClick = (attributeName,value) => {
    this.setState(prevState => {
        const newAttributes = { ...prevState.attributes };
        newAttributes[attributeName] += value;
        return { attributes: newAttributes };
      });
      console.log(this.state.attributes);
  };


  render() {
    return (
      <div>
        {ATTRIBUTE_LIST.map((attributeName) => {
        const attributeValue = this.state.attributes[attributeName];
        return (
          <div className="attribute-row" key={attributeName}>
            <span className="attribute-name">{attributeName}:</span>
            <span className="attribute-value">{attributeValue}</span>
            <button className="attribute-button" onClick={() => this.handleClick(attributeName,1)}>+</button>
            <button className="attribute-button" onClick={() => this.handleClick(attributeName,-1)}>-</button>
          </div>
        );
      })}
      </div>
    );
  }
}
export default MyComponent;






