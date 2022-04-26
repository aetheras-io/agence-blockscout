# Do not do saving in tracer.js!
- Due to some formatter issue, if you try to save in tracer.js then try to start Phoenix server, you will get "javascript based tracing is not available" error

 - If we have some future needs to modify tracer.js, please use vim to edit its content.


# Repo Management Policy
- This repo is forked from [BlockScout](https://github.com/blockscout/blockscout)
- Normal workflow: Master is our main stable development branch.  We use new branches to merge to master
- When there is a update or but fix we need from [BlockScout](https://github.com/blockscout/blockscout), we will use a new branch, run ```git pull upstream master```, then fix all the merge conflicts, make sure it is working, and remerge back to master.


# Todo
- Figure out how to fix stale data in postgres (indexer or migrate?)
- Show only Tx/Day in index
- Figure out how BlockScout manage translation
- Add a page to support faucet (Add a link from blockScout that direct to this page / or using iframe?) 