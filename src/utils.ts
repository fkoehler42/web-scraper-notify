interface NodeProcessPkg extends NodeJS.Process {
    pkg: unknown;
}

export const isDev = !(process as NodeProcessPkg).pkg;