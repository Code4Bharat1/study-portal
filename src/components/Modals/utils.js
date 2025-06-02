// utils.js

export const LEVEL_SCORE_MAP = {
  Basic: 50,
  Intermediate: 70,
  Hard: 100,
};

export const MAX_ATTEMPTS = 10;
export const TIME_LIMIT = 120;

export const normalizeLevel = (level) =>
  level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();

export const calculateScore = (attempts, duration, level) => {
  const maxScore = LEVEL_SCORE_MAP[level] || 50;
  const passScore = 0.6 * maxScore;
  const attemptScore =
    attempts < MAX_ATTEMPTS
      ? ((MAX_ATTEMPTS + 1 - attempts) / MAX_ATTEMPTS) * (0.2 * maxScore)
      : 0;
  const timeScore =
    duration < TIME_LIMIT
      ? ((TIME_LIMIT - duration) / TIME_LIMIT) * (0.2 * maxScore)
      : 0;

  return {
    total: Math.round(passScore + attemptScore + timeScore),
    breakdown: {
      passScore: Math.round(passScore),
      attemptScore: Math.round(attemptScore),
      timeScore: Math.round(timeScore),
    },
  };
};
