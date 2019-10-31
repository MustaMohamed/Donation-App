export class Project {
  id?: number;
  name?: string;
  description?: string;
  cost?: number;
  collectedDonation?: number;
  executionDuration?: string;
  country?: string;
  village?: {
    name: string;
    id: number;
  };
  cause?: string;
  projectCategory?: {
    category: string;
    id: number;
  };
  image?: string;
  gallery?: string[];
  result?: string;
  startAt?: Date;
  expectedEndAt?: Date;
  endAt?: Date;
  isCostCollectedDone?: boolean;
  isExecutionDone?: boolean;
}