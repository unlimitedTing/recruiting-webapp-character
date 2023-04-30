import React, { Component } from 'react';
import '../Character.css';

import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from '../consts';
import Attribute from './AttributeControl';
import Class from './ClassControl';
import MinimumRequirement from './MinimumRequirementControl';
import Skill from './SkillControl';
import SkillCheck from './SkillCheckControl';


class Character extends Component {
    constructor(props) {
        super(props);
        this.state = {
          attributes: ATTRIBUTE_LIST.reduce((acc, attr) => {
            acc[attr] = 10;
            return acc;
          }, {}),
          totalAttributesValue:0,
          selectedClass: null,
          skillPoints: 0,
          skills: SKILL_LIST.reduce((acc, skill) => {
            acc[skill.name] = 0;
            return acc;
          }, {}),
          totalSkillPoints: 0,
          selectedSkill:null
        };
        this.getAttributeModifier = this.getAttributeModifier.bind(this);
    };
  
    getAttributeModifier = (attribute) => {
      const value = this.state.attributes[attribute];
      return Math.floor((value - 10) / 2);
    };

    calculateInitialSkillPoints() {
      const attributes = this.state.attributes;
      const intelligenceModifier = this.getAttributeModifier(attributes.intelligence);
      const skillPoints = 10 + (4 * intelligenceModifier);
      return skillPoints;
    }

    componentDidMount() {
      // Set the initial value of skillPoints after the component has mounted
      const skillPoints = this.calculateInitialSkillPoints();
      const totalAttributesValue = Object.values(this.state.attributes).reduce((sum, value) => sum + value, 0);
      this.setState({ skillPoints,totalAttributesValue });
      console.log(this.state.totalAttributesValue);
    }

  
    handleAttributeChange = (attribute, value) => {
      if((value===1 && this.state.totalAttributesValue<70) || (value===-1 && this.state.attributes[attribute]>0)){
        this.setState(prevState => {
          const newAttributes = { ...prevState.attributes };
          newAttributes[attribute] += value;
          const newTotalAttributeValue = Object.values(newAttributes).reduce((sum, value) => sum + value, 0);
          return { attributes: newAttributes,totalAttributesValue:newTotalAttributeValue };
        });
      }
    };
  
    handleClassSelect = (selectedClass) => {
      this.setState({ selectedClass });
    };
  
    handleSkillChange = (skill, value) => {
      this.setState(prevState => {
        const newSkills = { ...prevState.skills};
        const newSkillPoints = this.state.totalSkillPoints+1;
        newSkills[skill] +=value;
        return {skills:newSkills,totalSkillPoints:newSkillPoints};
      });

      this.props.onSkillPointsChange();
    };

    handleSkillSelect = (selectedSkill) => {
      this.setState({selectedSkill});
    };
  
    render() {
      const { attributes, selectedClass, skills } = this.state;
      const pointsToSpend = 10 + 4 * this.getAttributeModifier('Intelligence');
      const selectedSkillsTotal = Object.values(skills).reduce((total, value) => total + value);
      const remainingPoints = Math.max(0,pointsToSpend - selectedSkillsTotal);
      const requirements = selectedClass ? CLASS_LIST[selectedClass] : null;
  
      return (
        <div>
          <div className = 'Character-container'>
            <div className = "Character-header" key={this.props.index}>
              <div>Character {this.props.index}</div>
            </div>
            <div className = 'Skill-check'>
              <SkillCheck skills={this.state.skills} onSkillSelect={this.handleSkillSelect} />
            </div>
            <div className = "Character-body">
              <div className='column'>
                  <Attribute attributes={attributes} onAttributeChange={this.handleAttributeChange} getAttributeModifier={this.getAttributeModifier} />
                </div>
                <div className='column'>
                  <Class attributes={attributes} selectedClass={selectedClass} onClassSelect={this.handleClassSelect} />
                </div>
                <div className='column'>
                  {selectedClass && <MinimumRequirement requirements={requirements} attributes={attributes} />}
                </div>
                <div className='column'>
                  <Skill points={remainingPoints} skills={skills} onSkillChange={this.handleSkillChange} getAttributeModifier={this.getAttributeModifier}/>
                </div>
            </div>
          </div>
        </div>
      );
    }
  }
export default Character;