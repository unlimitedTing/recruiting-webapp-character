import React, { Component } from 'react';
import { SKILL_LIST } from '../consts';

class SkillCheck extends Component{
    constructor(props) {
        super(props);
        this.state ={
            skill:"",
            point:0,
            DC: 20,
            roll:0,
            isSuccessful:false
        }
    };

    handleSkillSelectChange = (event) => {
        const selectedSkill = event.target.value;
        if (this.props.onSkillSelect) {
            this.props.onSkillSelect(selectedSkill);
        };
        this.setState({ point:this.props.skills[selectedSkill],skill: selectedSkill });
    };

    handleDCChange = (event) =>{
        this.setState({DC:parseInt(event.target.value)})
    };

    handleRoll = (event) =>{
        event.preventDefault(); // Add this line to prevent default form submission behavior
        const val = Math.floor(Math.random() * 20) + 1;
        const result = (this.state.point +val)>=this.state.DC;
        this.setState({roll:val,isSuccessful:result});
    };

    render(){
        const skillOptions = SKILL_LIST.map((skill) => {
            return (
                <option key={skill.name} value={skill.name}>{skill.name}</option>
            )
        });
        const {skill,point,roll,DC,isSuccessful} = this.state;
        const checkResult = (skill.length>0 && roll>0) &&(
            <div>
                <h3>Skill Check Result</h3>
                <div className='check-skill'>Skill: {skill} : {point}</div>
                <div className='check-roll'>You Rolled: {roll}</div>
                <div className='check-dc'>DC: {DC}</div>
                <div className='check-result'>Result:{isSuccessful?"Success":"Failure"}</div>
            </div>
        );
                    
        return(
            <div>
                <div>
                    {checkResult}
                </div>
                <form onSubmit={this.handleRoll}>
                    <label>Skill: 
                        <select value={skill} onChange={this.handleSkillSelectChange}>
                            <option value="">--Select a skill--</option>
                            {
                                skillOptions
                            }
                        </select>
                    </label>
                    <label>
                        DC: 
                        <input value = {DC} onChange={this.handleDCChange}/>
                    </label>  
                    <button type="submit">roll</button>
                </form>
            </div>
        )
    };

};

export default SkillCheck;