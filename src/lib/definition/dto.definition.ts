/**
 * toEntity()를 늘 구체화 하도록 dto의 추상 클래스를 사용한다.
 */
export default abstract class DTODefinition
{
    abstract toEntity(): any;

    // fill<T>(a: any, B:T, c:string|number)
    // {
    //     if ( a )
    //         B[c] = a;
    // }
}