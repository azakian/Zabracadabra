export interface AnswerResult {
  is_valid: boolean;
  hint: string | null;
  response: string | null;
}

export const ANSWER_CODE = {
  CODE_OF_CONDUCT: 'CODE_OF_CONDUCT',
  PROMO: 'PROMO',
  CRYPTID: 'CRYPTID',
  CRYPTID_HINT: 'CRYPTID_HINT',
  NANTES: 'NANTES',
  GR20: 'GR20',
  FINAL_ANSWER: 'FINAL_ANSWER',
};
