#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
    .version('0.1.0')
    .parse(process.argv);


