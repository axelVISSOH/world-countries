export class ScreenEnum {
    static readonly L  = new ScreenEnum("LARGE", 4);//over 1500
    static readonly M  = new ScreenEnum("MEDIUM", 3);//over 1200
    static readonly S  = new ScreenEnum("SMALL", 2);//over 800
    static readonly XS = new ScreenEnum("XSMALL", 1);//else

    private constructor(public readonly layout: string, public readonly gridCount: number){}
}