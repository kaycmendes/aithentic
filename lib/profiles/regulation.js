export const getRegulationSettings = (profile) => {
  // Determine and apply percentage influences for each filter based on the selected personality.
  // Default settings are provided if no profile is passed.
  return {
    accent: 1,
    personality: 1,
    vocabulary: 1,
    correctness: 1,
    anxiety: 1,
    intent: 1,
    emphasis: 1,
    flow: 1,
    adaptation: 1,
    bias: 1,
    negativity: 1,
    contradiction: 1
  };
}; 