; Simple NASM x64 Calculator for Windows
; This demonstrates proper RIP-relative addressing

extern printf
extern scanf

section .data
    msg1: db "Enter first number: ", 0
    msg2: db "Enter second number: ", 0
    msg3: db "Result: ", 0
    fmt_in: db "%d", 0
    fmt_out: db "%d", 10, 0

section .text
    global main
    main:
        push rbp
        mov rbp, rsp
        sub rsp, 32             ; 로컬 변수 공간
        
        ; 첫 번째 숫자 입력
        lea rcx, [rel msg1]
        call printf
        
        ; 두 번째 숫자 입력
        lea rcx, [rel msg2]
        call printf
        
        ; 결과 출력
        lea rcx, [rel msg3]
        mov edx, 5              ; 예: 2 + 3 = 5
        call printf
        
        xor eax, eax
        add rsp, 32
        pop rbp
        ret
