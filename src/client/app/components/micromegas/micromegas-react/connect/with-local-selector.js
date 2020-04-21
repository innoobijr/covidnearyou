import React, { Component } from "react";
import { createSelector } from "reselect";
import MicromegasGlContext from "../components/context";

const identity = (state) => state;

const mergeSelectors = (parentSelector, childSelector) => (state) =>
  childSelector(parentSelector(state));

// store the parent selector in the parent context
// and return the parent component
// when a selector is passed to a container component,
// it will be stored in the context and passed down to child components,
// as well as prop to the given component
const withLocalSelector = (ParentComponent) => {
  class WithConnectSelector extends Component {
    static contextType = MicromegasGlContext;

    selectorFromContext = (_, ctx) => (ctx.selector ? ctx.selector : identity);
    selectorFromProps = (props, _) =>
      props.selector ? props.selector : identity;
    idFromProps = (props, _) => props.id;
    computedSelector = createSelector(
      this.selectorFromContext,
      this.selectorFromProps,
      (ctx, props) => mergeSelectors(ctx, props)
    );
    contextSelector = createSelector(
      this.computedSelector,
      this.idFromProps,
      (selector, id) => ({
        selector,
        id,
      })
    );

    render() {
      const computedContext = this.contextSelector(this.props, this.context);
      return (
        <MicromegasGlContext.Provider value={computedContext}>
          <ParentComponent
            {...this.props}
            selector={computedContext.selector}
          />
        </MicromegasGlContext.Provider>
      );
    }
  }

  return WithConnectSelector;
};

export default withLocalSelector;
