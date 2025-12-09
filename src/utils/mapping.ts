import { IRound, IApiRound } from "@/types";
import { computeRoundStatus } from "@/utils/time";

// Преобразование API раунда в клиентский формат
export function transformRound(apiRound: IApiRound): IRound {
  return {
    id: apiRound.id,
    startTime: apiRound.startTime,
    endTime: apiRound.endTime,
    status: computeRoundStatus(apiRound.startTime, apiRound.endTime),
    totalScore: apiRound.totalScore,
  };
}
