import React from "react";
import PropTypes from "prop-types";

export default class IframeControl extends React.Component {
  static propTypes = {
    //field: PropTypes.object.isRequired,
    //onChange: PropTypes.func.isRequired,
    //forID: PropTypes.string,
    value: PropTypes.node,
  };

  static defaultProps = {
    value: "",
  };
  constructor(props) {
    super(props);
  }

  render() {
    const { value } = this.props;

    return (
      <iframe
        src={value.id}
        //width={value.width}
        //height={value.height}
        //allow={value.allow}
      />
    );
  }
}
