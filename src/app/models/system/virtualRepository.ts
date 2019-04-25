import { IIdentifiable } from 'src/app/interfaces/iidentifiable';

export class VirtualRepository<T extends IIdentifiable>{

    private _Rows: T[] = []

    constructor(...rows: T[][]) {

        for (let row of rows) {
            this._Rows = this._Rows.concat(row);
        }

    }

    public GetRows(...callbackfns: ((value: T, index: number, array: T[]) => any)[]) {

        if (!callbackfns || callbackfns.length === 0) return this._Rows;

        let result = this._Rows;
        for (let fn of callbackfns) {
            result = result.filter(fn);
        }
        return result;

    }

    public AddRow(row: T): boolean {

        var rowsFound = this.GetRows(r => (r as IIdentifiable).id === (row as IIdentifiable).id);
        if (rowsFound.length > 0) return false;

        if (!row) return false;
        this._Rows.push(row);

        return true;
    }

    public EditRow(predicate: (value: T, index: number, obj: T[]) => any, value: T, upsert: boolean = false): boolean {

        var row = this._Rows.find(predicate);
        if (!row) {
            if (upsert === false) return false;
            return this.AddRow(value);
        }

        row = value;

    }

    public RemoveRows(predicate: ((value: T, index: number, array: T[]) => boolean)): boolean {

        if (!predicate) return false;
        this._Rows = this._Rows.filter(predicate);

        return true;
    }
}