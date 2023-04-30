import React, { Component } from 'react';
import Character from './Character'
import { saveCharacter, retrieveCharacter } from '../api';
import SkillCheck from './SkillCheckControl';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            total:0,
            characterRefs: [],
            partyCharacter:null
        }
    }

    handleAddCharacter = ()=>{
        const newCharacters = [...this.state.characters, <Character index={this.state.total} ref={ref => this.state.characterRefs[this.state.total] = ref}/>]
        const newTotal = this.state.total+1;
        this.setState({ characters: newCharacters,total: newTotal}, () => {
            this.setState({ partyCharacter: this.state.partyCharacter ? this.state.partyCharacter : this.state.characterRefs[1] });
        });
    };

    handleSkillPointsChange = () => {
        let highestSkillPoints = -Infinity;
        let highestSkillPointsCharacter = null;
        for (let i = 1; i < this.state.characterRefs.length; i++) {
            const character = this.state.characterRefs[i];
            if (character.state.totalSkillPoints > highestSkillPoints) {
                highestSkillPoints = character.state.totalSkillPoints;
                highestSkillPointsCharacter = character;
            }
        }
        this.setState({ partyCharacter: highestSkillPointsCharacter });
    };


    render() {   
        const partySkillCheck = (this.state.partyCharacter)&&(
            <div style={{border:"1px solid",margin:"10%"}}>
                <h2>Party Skill Check</h2>
                <p>The party character is Character {this.state.partyCharacter.props.index}</p>{
                    <SkillCheck skills={this.state.partyCharacter.state.skills} onSkillSelect={null}/>
                }
            </div>
        )
        return (
            <div>
                <button onClick={this.handleAddCharacter}>Add New Character</button>
                <button onClick={() => saveCharacter(this.state)}>Save Characters</button>
                <button onClick={() => retrieveCharacter()}>Retrieve Characters</button>
                <div>
                    {partySkillCheck}
                </div>
                {
                    this.state.characters.map((character, index) => (
                        <div key={index}>
                            <Character onSkillPointsChange={this.handleSkillPointsChange} index={index + 1} ref={ref => this.state.characterRefs[index + 1] = ref}/>
                        </div>
                    ))
                }
            </div>
        )
    }
    
};
export default Overview;