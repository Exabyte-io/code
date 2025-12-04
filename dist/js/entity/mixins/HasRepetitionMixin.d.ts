import type { InMemoryEntity } from "../in_memory";
export interface HasRepetition {
    _repetition: number;
    _totalRepetitions: number;
    repetition: number;
    totalRepetitions: number;
    setRepetition: (repetition: number) => void;
    setTotalRepetitions: (totalRepetition: number) => void;
}
export declare function hasRepetitionMixin<T extends InMemoryEntity>(item: T): asserts item is T & HasRepetition;
