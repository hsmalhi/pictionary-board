"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@storybook/react");
const react_2 = require("react");
const Button_1 = require("../Button");
react_1.storiesOf("Button", module)
    .add("with text", () => (<Button_1.default>Hello Button</Button_1.default>))
    .add("with some emoji", () => (<Button_1.default>😀 😎 👍 💯</Button_1.default>));
//# sourceMappingURL=button.stories.js.map