import React, { Component } from 'react';
import { SKILL_LIST } from '../consts.js';

class Skill extends Component {
    handleSkillChange = (skill, value) => {
      if((value===1 && this.props.points>0) || (value===-1 && this.props.skills[skill]>0)){
        this.props.onSkillChange(skill, value);
      }
      
    };
  
    render() {
      const skillRows = SKILL_LIST.map((skill) => {
        const value = this.props.skills[skill.name];
        const skillModifier = skill.attributeModifier;
        const skillModifierValue = this.props.getAttributeModifier(skillModifier);
        const skillTotal = value+skillModifierValue;
        return (
          <div className="skill-row" key={skill.name}>
            <span className="skill-name">{skill.name}:</span>
            <span className="skill-value">{value}</span>
            <span className="skill-modifier">(Modifier:{skillModifier})</span>
            <span className="skill_modifier_value">:{`${skillModifierValue >= 0 ? "+" : "-"}${Math.abs(skillModifierValue)}`}</span>
            <button className="skill-button" onClick={() => this.handleSkillChange(skill.name,1)}>+</button>
            <button className="skill-button" onClick={() => this.handleSkillChange(skill.name,-1)}>-</button>
            <span className="skill-totoal"> total: {skillTotal}</span>
          </div>
      )
    });
      return (
        <div>
          <h2>Skills</h2>
          <div>
            <span>Total skill points available:</span>
            <span>{this.props.points}</span>
          </div>
          {skillRows}
        </div>
      );
    }
  }

  export default Skill;