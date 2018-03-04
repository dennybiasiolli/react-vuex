export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';

export default {
  incrementAsync: (value = 1) => ({
    type: INCREMENT_ASYNC,
    value,
  }),
};
