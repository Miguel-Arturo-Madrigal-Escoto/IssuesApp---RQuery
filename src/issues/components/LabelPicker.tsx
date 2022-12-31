
import { useContext } from 'react';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { useLabels } from '../hooks/useLabels';
import { SelectedLabels } from '../../contexts/SelectedLabels';


export const LabelPicker = () => {

  const labelsQuery = useLabels();
  const { state: labels, dispatch } = useContext(SelectedLabels);

  if (labelsQuery.isLoading) return (<LoadingIcon />)
  

  return (
    <div>
        {
            labelsQuery.data?.map(label => (
              <span 
                  key={ label.id }
                  className={`badge rounded-pill m-1 label-picker ${ labels.includes(label.name) ? 'label-active' : '' }`}
                  style={{ border: `1px solid #${ label.color }`, color: `#${ label.color }` }}
                  onClick={ () => dispatch({ type: 'toggle', payload: label.name }) }
              >
                  { label.name }
              </span>
            ))
        }
     
    </div>
  )
}
