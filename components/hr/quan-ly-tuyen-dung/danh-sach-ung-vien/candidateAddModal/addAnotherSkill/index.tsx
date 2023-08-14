import React from 'react'
import styles from '../candidateAddModal.module.css'
import { Rating } from 'react-simple-star-rating';

const HandleAddAnotherSkill = ({ lastAddedIndex, setSkills, setAddAnotherSkill, setLastAddedIndex }: any) => {
    const newSkillIndex = lastAddedIndex + 1;
    const newSkillObject: { skillName: string, skillVote: any } = {
        skillName: "",
        skillVote: 0,
    };
    setSkills((prevSkills) => [...prevSkills, newSkillObject]);

    setAddAnotherSkill((prevSkills) => [
        ...prevSkills,
        (
            <div key={newSkillIndex} className={`${styles.another_skill}`}>
                <div className={`${styles.skill_input}`}>
                    <input type="text" className={`${styles.form_control} ${styles.another_skill_name}`} placeholder="Nhập kỹ năng khác"
                        onChange={(e) => handleSkillNameChange(newSkillIndex, e.target.value, setSkills)}
                    />
                </div>
                <div className={`${styles.another_rating}`}>
                    <ul className={`${styles.rating} ${styles.rating_add_another}`}>
                        <Rating
                            size={27}
                            initialValue={0}
                            disableFillHover
                            className={`${styles.star_rating}`}
                            onClick={(rate) => handleRatingSkill(newSkillIndex, rate, setSkills)}
                        />
                    </ul>
                </div>
                <div className={`${styles.icon_delete}`}>
                    <a
                        className={`${styles.remove_another_skill}`}
                        onClick={() => handleRemoveSkill(newSkillIndex, setAddAnotherSkill, setSkills)}
                    >
                        <img src={`/icon-del-kn.svg`} alt="" />
                    </a>
                </div>
            </div>
        )
    ]);
    setLastAddedIndex(newSkillIndex);
};

const handleSkillNameChange = (index: number, skillName: string, setSkills: any) => {
    setSkills((prevSkills) => {
        const updatedSkills = [...prevSkills];
        updatedSkills[index].skillName = skillName;
        return updatedSkills;
    });
};

const handleRatingSkill = (index: any, rate: any, setSkills: any) => {
    setSkills((prevSkills) => {
        const updatedSkills = [...prevSkills];
        updatedSkills[index].skillVote = rate;
        return updatedSkills;
    });
};

const handleRemoveSkill = (indexToRemove: number, setAddAnotherSkill: any, setSkills: any) => {
    setAddAnotherSkill((prevSkills) => prevSkills.filter((_, index) => index !== indexToRemove));
    setSkills((prevSkills) => prevSkills.filter((_, index) => index !== indexToRemove));
};

export default HandleAddAnotherSkill