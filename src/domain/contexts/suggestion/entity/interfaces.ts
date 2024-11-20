import { UniqueId } from '@/domain/contexts/common/utils/UniqueId';

export type statusSuggestionType = 'accepted' | 'rejected' | 'waiting';

export interface SuggestionEntityInterface {
  get status(): statusSuggestionType;
  get email(): string;
  get description(): string;
  get postId(): UniqueId;
  get id(): UniqueId;
  get createdAt(): string;
  get updatedAt(): string;
  delete: () => void;
}