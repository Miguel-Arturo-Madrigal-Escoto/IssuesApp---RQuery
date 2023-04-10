
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
  
  const { issuesQuery, page, nextPage, prevPage } = useIssues({ state, labels });
  

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

            <div className="d-flex mt-2 justify-content-between align-items-center">
              <button type="button" className="btn btn-outline-primary" onClick={ prevPage } disabled={ issuesQuery.isFetching }>Prev</button>
              <span>{ issuesQuery.isFetching? <LoadingIcon /> : page }</span>
              <button type="button" className="btn btn-outline-primary" onClick={ nextPage } disabled={ issuesQuery.isFetching }>Next</button>
            </div>
            
          </div>
          
          <div className="col-4">
            <LabelPicker />
          </div>
      </div>
  )
}
