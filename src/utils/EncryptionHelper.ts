export class Encryption {
    static encrypt(value: string): string {
        return encodeURIComponent(
            Buffer.from(
                Buffer.from(value.toString()).toString('base64'),
            ).toString('hex'),
        );
    }

    static decrypt(value: string): string {
        return Buffer.from(
            Buffer.from(decodeURIComponent(value.toString()), 'hex').toString(),
            'base64',
        ).toString();
    }
}
