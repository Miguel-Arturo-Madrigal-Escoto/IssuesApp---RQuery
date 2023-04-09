import { useQuery } from '@tanstack/react-query';
import { Issue, State } from '../interfaces';
import { githubApi } from '../../api/githubApi';
import { sleep } from '../../helpers/sleep';




const getIssues = async (labels: string[], state?: State): Promise<Issue[]> => {
    await sleep(2);

    const params = new URLSearchParams();

    if (state) params.append('state', state);

    if (labels.length > 0){
        // las labels se piden como un string de labels separado por comas
        const labelsString: string = labels.join(',');
        params.append('labels', labelsString);
    }

    params.append('page', '1');
    params.append('per_page', '5');

    const { data } = await githubApi.get<Issue[]>('/issues', {
        params
    });
    return data;
}

interface Props {  state?: State, labels: string[]  }

export const useIssues = ({ state, labels }: Props) => {
    
    const issuesQuery = useQuery(
        ['issues', { state, labels }],
        () => getIssues(labels, state),
        {
            refetchOnWindowFocus: true,
        }
    );


    return {
        issuesQuery
    }
}
