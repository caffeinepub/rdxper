import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { BarGraphData, TableData } from '../backend';

export function useBarGraphData(researchTopic: string, figureCount: number) {
  const { actor, isFetching } = useActor();

  return useQuery<BarGraphData[]>({
    queryKey: ['barGraphData', researchTopic, figureCount],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.fetchBarGraphData(researchTopic, BigInt(figureCount));
    },
    enabled: !!actor && !isFetching && !!researchTopic && figureCount > 0,
  });
}

export function useTableData(researchTopic: string, figureCount: number) {
  const { actor, isFetching } = useActor();

  return useQuery<TableData[]>({
    queryKey: ['tableData', researchTopic, figureCount],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.fetchTableData(researchTopic, BigInt(figureCount));
    },
    enabled: !!actor && !isFetching && !!researchTopic && figureCount > 0,
  });
}
