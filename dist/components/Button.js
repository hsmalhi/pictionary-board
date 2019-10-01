"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles = {
    border: '1px solid #eee',
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    fontSize: 15,
    padding: '3px 10px',
    margin: 10,
};
const Button = (props) => (<button onClick={props.onClick} style={styles} type="button">
    {props.children}
  </button>);
Button.defaultProps = {
    children: null,
    onClick: () => { }
};
exports.default = Button;
//# sourceMappingURL=Button.js.map