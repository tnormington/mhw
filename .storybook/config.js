import { addDecorator, configure } from "@storybook/react"
import { withOptions } from "@storybook/addon-options"
import { themes } from "@storybook/components"

// Option defaults.
addDecorator(
  withOptions({
    name: "dark-theme",
    theme: themes.dark,
    mainTextColor: "#fff"
  })
)

function loadStories() {
  require("../src/stories")
}

configure(loadStories, module)
