import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { getIssueComments, getIssueInfo } from '../hooks/useIssue';

interface Props {
    issue: Issue
}

export const IssueItem: FC<Props> = ({ issue }) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const prefetchData = () => {
        // prefetch del issue
        queryClient.prefetchQuery(
            ['issue', issue.number],
            () => getIssueInfo(issue.number)
        )
        
        // prefetch de los comentarios del issue
        queryClient.prefetchQuery(
            ['issue', issue.number, 'comments'],
            () => getIssueComments(issue.number)
        );
    }

    const presetData = () => {
        queryClient.setQueryData(
            ['issue', issue.number],
            issue,
            {
                // vigencia que la data se considera como fresh (por lo que no se hace fetch)
                updatedAt: new Date().getTime() + 10000
            }
        );

        queryClient.setQueryData(
            ['issue', issue.number, 'comments'],
            issue.comments && [],
            {
                // vigencia que la data se considera como fresh (por lo que no se hace fetch)
                updatedAt: new Date().getTime() + 10000
            }
        )
    }


    return (
        <div 
            className="card mb-2 issue"
            onClick={ () => navigate(`/issues/issue/${ issue.number }`) }
            // onMouseEnter={ prefetchData }
            onMouseEnter={ presetData }
        >
            <div className="card-body d-flex align-items-center">
                {
                    issue.state === State.Open
                    ? ( <FiInfo size={30} color="red" /> )
                    : ( <FiCheckCircle size={30} color="green" /> )
                }
                

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{ issue.title }</span>
                    <span className="issue-subinfo">#{ issue.number } opened { 4 } days ago by <span className='fw-bold'>{ issue.user.login }</span></span>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={ issue.user.avatar_url } alt="User Avatar" className="avatar" />
                    <span className='px-2'>{ issue.comments }</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
