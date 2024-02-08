#include "csapp.h"

int main()
{
    pid_t pid;
    int x = 1;
    pid = Fork();
    if (pid == 0)
    {
        printf("child:", ++x);
        exit(0);
    }
    printf("parent", --x);
    exit(0);
}