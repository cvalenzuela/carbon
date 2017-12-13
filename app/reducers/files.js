/* @flow */
/* ===
Files Reducer: Add and removes files from the store.
Is child of the Root Reducer.
=== */

import { ADD_FILE, REMOVE_FILE } from '../actions/files';

export type filesStatusType = {
  files: Array<mixed>
};

type actionType = {+type: string
};

// Add or remove files
const files = (state: Array<mixed> = [], action: actionType) => {
  let index = -1;
  if (action.file) {
    index = state.findIndex(f => f.id === action.file.id);
  }
  switch (action.type) {
    case ADD_FILE:
      return [...state, action.file];
    case REMOVE_FILE:
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
};

export default files;
