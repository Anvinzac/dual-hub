export const BUSINESS_BASE_PATH = "/business";
export const BUSINESS_BOOKMARKS_PATH = `${BUSINESS_BASE_PATH}/bookmarks`;
export const BUSINESS_AI_GUIDE_PATH = `${BUSINESS_BASE_PATH}/ai-guide`;
export const BUSINESS_SUBMIT_PATH = `${BUSINESS_BASE_PATH}/submit`;

export const businessRemixesPath = (appId: string) =>
  `${BUSINESS_BASE_PATH}/remixes/${appId}`;
