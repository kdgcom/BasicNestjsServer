export default abstract class DTODefinition {
    abstract toEntity(): any;
    fill<T>(a: any, B: T, c: any): void;
}
