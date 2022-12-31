import { FC, useReducer } from 'react';
import { Outlet } from 'react-router';
import { SelectedLabels } from './contexts/SelectedLabels';
import { selectedLabelsReducer } from './issues/reducers/selectedLabelsReducer';

export const GitApp: FC = () => {

  const [state, dispatch] = useReducer(selectedLabelsReducer, []);
  
  return (
    <SelectedLabels.Provider value={{ state, dispatch }}>
      <div className="container mt-3">
        <h1>Git Issues <small>Seguimiento de problemas</small> </h1>
          <Outlet />
      </div>
    </SelectedLabels.Provider>
  )
}

