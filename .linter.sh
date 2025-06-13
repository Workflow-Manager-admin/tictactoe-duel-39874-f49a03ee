#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-duel-39874-f49a03ee/tic_tac_toe_duel
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

