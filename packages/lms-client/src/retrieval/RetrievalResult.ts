import { type FileHandle } from "../files/FileHandle";

/** @public */
export interface RetrievalResult {
  entries: Array<RetrievalResultEntry>;
}

/** @public */
export interface RetrievalResultEntry {
  content: string;
  score: number;
  source: FileHandle;
}