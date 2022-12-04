const readline = require("readline");
const { program } = require("commander");
const { argv } = require("process");
require("colors");

program.option(
  "-f, --file [type]",
  "file for saving game results",
  "results.txt"
);
program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin, // введення зі стандартного потоку
  output: process.stdout, // виведення у стандартний потік
});

let count = 0;

const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10 + 1);