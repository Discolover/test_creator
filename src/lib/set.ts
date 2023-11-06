export function difference<Type>(setA: Set<Type>, setB: Set<Type>): Set<Type> {
    const _difference = new Set(setA);
    for (const elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}