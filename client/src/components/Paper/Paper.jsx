import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './style.scss';

const Paper = forwardRef((props, ref) => {
  // const classname = cn(style.paper, style[`paper_depth_${props.depth}`], props.className);
  const inlineStyles = Object.assign(
        {},
        {
          background: props.background,
        },
        props.style,
      );

  return (
    <div ref={ref} style={inlineStyles} /* className={classname} */ onClick={props.onClick}>
      {props.children}
    </div>
  );
});

Paper.defaultProps = {
  depth: 4,
  background: '#ffffff',
};

Paper.propTypes = {
  children: PropTypes.any,
  /* className: PropTypes.string, */
  depth: PropTypes.number.isRequired,
  background: PropTypes.string.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Paper;
