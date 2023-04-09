
import { useState, useContext } from 'react';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { State } from '../interfaces';
import { SelectedLabels } from '../../contexts/SelectedLabels';


export const ListView = () => {

  const { state: labels } = useContext(SelectedLabels);
  const [state, setState] = useState<State>();
  
  const { issuesQuery } = useIssues({ state, labels });
  

  return (
      <div className="row mt-5"> 
          <div className="col-8">
            {
              issuesQuery.isLoading
              ? <LoadingIcon />
              : <IssueList 
                  issues={ issuesQuery.data || []  } 
                  state={ state }
                  onStateChanged={ setState }
                />
            }
          </div>
          
          <div className="col-4">
            <LabelPicker />
          </div>
      </div>
  )
}
