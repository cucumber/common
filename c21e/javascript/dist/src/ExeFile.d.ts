export declare class ExeFile {
    private readonly fileNamePattern;
    private readonly props;
    constructor(fileNamePattern: string, props?: {
        os: string;
        arch: string;
    });
    readonly fileName: string;
    private os;
    private arch;
    private ext;
}
