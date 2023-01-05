
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';


export const ListView = () => {

  const { issuesQuery } = useIssues();

  return (
      <div className="row mt-5"> 
          <div className="col-8">
            {
              issuesQuery.isLoading
              ? <LoadingIcon />
              : <IssueList issues={ issuesQuery.data || [] } />
            }
          </div>
          
          <div className="col-4">
            <LabelPicker />
          </div>
      </div>
  )
}
