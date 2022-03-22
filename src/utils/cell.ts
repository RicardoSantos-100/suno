import { ICell } from '@interfaces/ICell';

export function cell(text: string): ICell {
    return {
        v: text,
        t: 's',
    };
}
