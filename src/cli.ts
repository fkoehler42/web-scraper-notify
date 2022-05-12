#!/usr/bin/env node

import { Command } from 'commander';
import main from './index';

const program = new Command();

program
    .version('0.1.0')
    .parse(process.argv);

main();