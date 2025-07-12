/**
 * Terminal Component
 * Maneja la animación de typing del terminal
 */

// Terminal typing animation
/*export function initTerminalAnimation() {
    const terminalCommands = [
        'nmap -sS -O target.com',
        'sqlmap -u "http://target.com" --dbs',
        'nikto -h target.com',
        'gobuster dir -u target.com -w wordlist.txt',
        'burpsuite --proxy=127.0.0.1:8080'
    ];
    
    const commandElement = document.querySelector('.terminal-line .command');
    const cursorElement = document.querySelector('.cursor');
    
    if (!commandElement) return;
    
    let currentCommandIndex = 0;
    let currentCharIndex = 0;
    let isTyping = false;
    
    function typeCommand() {
        if (isTyping) return;
        
        isTyping = true;
        const currentCommand = terminalCommands[currentCommandIndex];
        
        commandElement.textContent = '';
        
        const typeInterval = setInterval(() => {
            if (currentCharIndex < currentCommand.length) {
                commandElement.textContent += currentCommand[currentCharIndex];
                currentCharIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    currentCommandIndex = (currentCommandIndex + 1) % terminalCommands.length;
                    currentCharIndex = 0;
                    isTyping = false;
                    setTimeout(typeCommand, 1000);
                }, 2000);
            }
        }, 100);
    }
    
    // Start typing animation after a delay
    setTimeout(typeCommand, 2000);
}

// Initialize terminal component
export function initTerminal() {
    initTerminalAnimation();
} */