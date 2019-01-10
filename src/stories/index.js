import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"

import WeaponTeaser from "../components/WeaponTeaser"

import { List, Map } from "immutable"

import { Button, Welcome } from "@storybook/react/demo"

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
))

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))

import weapon from "../data/singleWeapon"

const userOptions = Map({
  favorites: List(),
  comparisons: List()
})

storiesOf("WeaponTeaser", module).add("default", () => (
  <WeaponTeaser weapon={weapon} userOptions={userOptions} />
))
