export const typebotEventMap = (data) => {
  return {
    sessionId: data.sessionId,
    resultId: data.resultId,
    typebotId: data.typebot?.id,
  }
}