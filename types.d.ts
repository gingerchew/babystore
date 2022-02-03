type _UnknownObject = {
    [key: string]: unknown;
};

type ReduceableObject = _UnknownObject | unknown;

type _PotentialObject = {
    [key: string]: _PotentialObject | unknown;
} | any;

type PotentialObject = {
    [key: string]: _PotentialObject;
};

type qd = (result: ReduceableObject, key: string, index: number, arr: string[]) => ReduceableObject;

type DeepAssign = (orig: PotentialObject, ...args: PotentialObject[]) => PotentialObject | _UnknownObject;

type babystoreFuncs = {
    find: (key: string, ...keys: string[]) => any;
    add: (key: string, obj: _UnknownObject) => void;
    delete: (key: string) => void;
    clear: () => void;
    has: (key: string) => boolean;
    all: () => any[];
};

type babystore = {
    [key in keyof babystoreFuncs]: babystoreFuncs[key];
};

export {
    qd,
    DeepAssign,
    babystoreFuncs,
    babystore
};