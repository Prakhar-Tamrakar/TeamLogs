import React, { useState } from "react";
import {
  Code,
  Plus,
  Trash2,
  Star,
} from "lucide-react";
import { skillsDatabase } from "../constants/Constant";
// import { useState, useRef } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  console.log(skills)
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);
    setShowSuggestions(value.length > 0);
  };

  const getFilteredSuggestions = () => {
    if (!skillInput) return [];

    return skillsDatabase
      .filter(
        (skill) =>
          skill.toLowerCase().includes(skillInput.toLowerCase()) &&
          !skills.some(
            (existingSkill) =>
              existingSkill.name.toLowerCase() === skill.toLowerCase()
          )
      )
      .slice(0, 8); // Limit to 8 suggestions
  };

  const addSkill = (skillName) => {
    if (
      skillName &&
      !skills.some(
        (skill) => skill.name.toLowerCase() === skillName.toLowerCase()
      )
    ) {
      setSkills([ { name: skillName, proficiency: 3 },...skills]);
      setSkillInput("");
      setShowSuggestions(false);
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkillProficiency = (index, proficiency) => {
    const updatedSkills = [...skills];
    updatedSkills[index].proficiency = proficiency;
    setSkills(updatedSkills);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const suggestions = getFilteredSuggestions();
      if (suggestions.length > 0) {
        addSkill(suggestions[0]);
      } else if (skillInput.trim()) {
        addSkill(skillInput.trim());
      }
    }
  };

  const getProficiencyLabel = (level) => {
    const labels = {
      //   0: "No Experience",
      1: "Beginner",
      2: "Basic",
      3: "Intermediate",
      4: "Advanced",
      5: "Expert",
    };
    return labels[level];
  };

  const getProficiencyColor = (level) => {
    const colors = {
      //   0: "text-gray-400",
      1: "text-red-500",
      2: "text-orange-500",
      3: "text-yellow-500",
      4: "text-blue-500",
      5: "text-green-500",
    };
    return colors[level];
  };
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center">
        <Code className="inline h-4 w-4 mr-2" />
        Skills & Expertise
      </h3>

      {/* Add Skill Input */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Add Skills
        </label>
        <div className="relative">
          <input
            type="text"
            value={skillInput}
            onChange={handleSkillInputChange}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Type to search skills (e.g., JavaScript, Python, Design...)"
          />
          <button
            type="button"
            onClick={() => skillInput.trim() && addSkill(skillInput.trim())}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && skillInput && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {getFilteredSuggestions().map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => addSkill(suggestion)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
              >
                {suggestion}
              </button>
            ))}
            {getFilteredSuggestions().length === 0 && (
              <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                No matching skills found. Press Enter to add "{skillInput}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Skills List */}
      {skills.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">
            Your Skills ({skills.length})
          </h4>
          <div className="w-full max-h-60 border border-slate-600 overflow-y-scroll scrollbar-hide rounded-lg p-3">
            <div className="grid  gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                >
                  {/* <div className="flex items-center justify-between"> */}
                  <div className="w-full grid  grid-cols-2 grid-rows-2  md:grid-rows-1 md:grid-cols-4 gap-1 md:gap-4 items-center ">
                    <h5 className="font-medium text-gray-900 dark:text-gray-100">
                      {skill.name}
                    </h5>

                    <div className=" items-center justify-start space-x-1 md:justify-center   ">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => updateSkillProficiency(index, level)}
                          className={`p-0 md:p-1 rounded transition-colors ${
                            skill.proficiency >= level
                              ? "text-yellow-500 hover:text-yellow-600"
                              : "text-gray-300 dark:text-gray-600 hover:text-gray-400"
                          }`}
                        >
                          <Star
                            className={`h-4 md:h-4 w-4 md:w-4 ${
                              skill.proficiency >= level ? "fill-current" : ""
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <span
                      className={`text-sm flex justify-start md:justify-center font-medium ${getProficiencyColor(
                        skill.proficiency
                      )}`}
                    >
                      {getProficiencyLabel(skill.proficiency)} (
                      {skill.proficiency}/5)
                    </span>

                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-500 hover:text-red-700 p-1 rounded transition-colors flex items-center justify-start md:justify-end "
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {skills.length === 0 && (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            No skills added yet
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Start typing in the field above to add your skills and expertise
          </p>
        </div>
      )}
    </div>
  );
};

export default Skills;
