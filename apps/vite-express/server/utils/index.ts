import readline from 'readline'
import color from 'picocolors'

export function printServerUrls (urls) {
    
}

export function clearScreen () {
    const repeatCount = process.stdout.rows - 2
    const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : ''
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
}
