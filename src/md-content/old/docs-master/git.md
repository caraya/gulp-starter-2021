Gitting more out of git

* Distributed Control System
  * Protects against Potential Single Point of Failure
  * Each user has a fulll copy of the repository + changes they made
* Multiple remotes to copies of the repository outside local tree
  * Example: how you add code to an OS project
* Look at git branch --no-merged
* git diff or git diff master
* Branch names are pointers to head commits at the end of the branch
* Careful with ammend
  * you get a new hash and git treats it  as a new action, except that it's not really a new commit
* Git always adds to the repo, almost never removes
* Rebasing as a strategy for change
  * Go back one commit past where you want to make the changes
  * ex: git rebase --interactive HEAD^^^ (pulls the commits starting from the third one back)
  * You're changing the repo, be careful with it
* Git revert and git reset
  * git checkout to remove changes before staging
  * git reset head <filename> to remove file from staging
* Git reset
  * soft: git reset --soft HEAD^
    * only resets local repository
  * mixed: git reset --mixed HEAD^
    * resets local repository and staging area
  * hard: git reset --hard HEAD^
    * resets local repository, staging area and remote repo
* git reflog to recover from reset --hard
  * git reset --hard HEAD@{1} where {1} is the number of commits you want to go back
* git stash to save your changes without comitting your changes
  * git stash --include-untracked
  * careful with storing files you never mean to commit
  * git stash --save to give stashes names to identify the work you're doing
  * git stash apply to take the latest change and apply it to the current tree
  * git stash drop stash@{0} where {0} is the number of the stash you want to work on. This also applies to apply
* git log --oneline --graph
* git blame to get a detailed list of changes 
git bisect to track changes
