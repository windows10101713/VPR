extern printf

section .data
    msg: db "Hello from NASM!", 0

section .text
    global main
    main:
        lea rcx, [rel msg]
        call printf
        xor eax, eax
        ret
