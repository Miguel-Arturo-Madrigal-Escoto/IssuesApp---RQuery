import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { sleep } from '../../helpers/sleep';

const getLabels = async (): Promise<Label[]> => {
    await sleep(2);
    const { data } = await githubApi.get<Label[]>('/labels?per_page=100', {
        headers: {
            Authorization: null
        }
    });   
    return data;
};

export const useLabels = () => {

    // staleTime: la data se va a mantener fresca por 'x' milisegundos
    // placeholderData: por mientras que se hace la peticion (sin importar el staleTime), muestra dicha info
    // initialData: data inicial, la afecta el staleTime ya que piensa que dicha data esta fresca

    const labelsQuery = useQuery(
        ['labels'],
        () => getLabels(),
        {
          refetchOnWindowFocus: true,
          staleTime: 1000 * 60 * 60,
          placeholderData: [
            {
                id: 725156255,
                node_id: "MDU6TGFiZWw3MjUxNTYyNTU=",
                url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
                name: "good first issue (taken)",
                color: "b60205",
                default: false,
            },
            {
                id: 139734344,
                node_id: "MDU6TGFiZWwxMzk3MzQzNDQ=",
                url: "https://api.github.com/repos/facebook/react/labels/Component:%20Test%20Utils",
                name: "Component: Test Utils",
                color: "eb6420",
                default: false,

            }
            ]
        }
    );

    return labelsQuery;
}