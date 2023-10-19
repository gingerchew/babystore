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

type DeepAssign = (orig: PotentialObject, ...args: PotentialObject[]) => PotentialObject | _UnknownObject;

type babystoreFuncs = {
    find: (key: string) => any;
    add: (key: string, obj: _UnknownObject) => void;
    delete: (key: string) => void;
    // clear: () => void;
    has: (key: string) => boolean;
    // all?: () => any[];
};

type babystore = {
    [key in keyof babystoreFuncs]: Promise<babystoreFuncs[key]>;
};

type store = {
    (): void;
    all: (key?:string) => unknown[];
    nuke: () => void;
}

export {
    _UnknownObject,
    PotentialObject,
    ReduceableObject,
    DeepAssign,
    store,
    babystore,
    babystoreFuncs
};