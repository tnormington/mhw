import React from "react"

export default ({ skillId, skills }) => {
  const skill = skills.find((s = s.id === skillId))

  if (skill.assets) return <img src={imgSrc} />
}
