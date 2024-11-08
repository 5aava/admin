const logger = store => next => action => {
  /* console.group(action.type);
  console.info('dispatching', action);
  console.log('next state', store.getState()); */
  return next(action);
};

export default logger;
