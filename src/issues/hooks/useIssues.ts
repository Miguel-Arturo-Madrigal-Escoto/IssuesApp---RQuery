import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Issue, State } from '../interfaces';
import { githubApi } from '../../api/githubApi';
import { sleep } from '../../helpers/sleep';



interface Props {  
    state?: State;
    labels: string[];
    page?: number;  
}

const getIssues = async ({ state, labels, page = 1 }: Props): Promise<Issue[]> => {
    await sleep(2);

    const params = new URLSearchParams();

    if (state) params.append('state', state);

    if (labels.length > 0){
        // las labels se piden como un string de labels separado por comas
        const labelsString: string = labels.join(',');
        params.append('labels', labelsString);
    }

    params.append('page', page.toString());
    params.append('per_page', '5');

    const { data } = await githubApi.get<Issue[]>('/issues', {
        params
    });
    return data;
}


export const useIssues = ({ state, labels }: Props) => {
    
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        setPage(1);
    }, [state, labels]);

    const issuesQuery = useQuery(
        ['issues', { state, labels, page }],
        () => getIssues({ labels, page, state }),
        {
            refetchOnWindowFocus: true,
            onSuccess(data: Issue[]) {
                
            },
        }
    );

    const nextPage = (): void => {
        // No hay data, detener la paginación
        if (issuesQuery.data?.length === 0) return;
    
        setPage(page + 1);
    }

    const prevPage = (): void => {
        // No hay data, detener la paginación
        if (page === 1) return;
    
        setPage(page - 1);
    }
    

    return {
        // Properties
        issuesQuery,

        // Getters
        page,

        // Methods
        nextPage,
        prevPage
    }
}
