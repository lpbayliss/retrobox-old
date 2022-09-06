import { ComponentMeta,ComponentStory } from "@storybook/react";
import React from "react";

import { default as Login } from "../../pages/login";

export default {
  title: "Pages / Login",
  component: Login,
  argTypes: {},
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const Default = Template.bind({});
Default.args = {};

