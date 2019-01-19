import React from "react"
import LevelMeter from "./LevelMeter"

export default ({ skills, skill }) => {
  const { level, skill: skillId } = skill
  // get skill by skillId
  const realSkill = skills.find(s => s.id === skillId)

  return <LevelMeter level={level} maxLevel={realSkill.ranks.length} />
}
