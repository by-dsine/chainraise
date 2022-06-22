export function makeID(length: number): string {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i=0; i< length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}