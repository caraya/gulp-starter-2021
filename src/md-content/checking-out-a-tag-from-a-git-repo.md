# Checking out a tag from a git repo

There are times when I need to checkout a specific tag from a repository. I do this often enough that I chose to document the process based on [How To Checkout Git Tags](https://devconnected.com/how-to-checkout-git-tags/).

The concrete example: I need to get the latest revision of the Gutenberg plugin so I can compile it and install it on my testing machine.

Because there is no branch, I can't just do:

```bash
 git checkout -b <branch-name>
```

So I had to research how to get creative in doing this.

The first step is to make sure we have all the tags available both to our origin and any upstream responsitories.

We do this with git's [fetch](https://git-scm.com/docs/git-fetch) command and two flags:

**--all**
To fetch from all configured remotes

**--tags**
: Fetch all remote tags into local tags with the same name, in addition to whatever else would otherwise be fetched

```bash
git fetch --all --tags
```

We want to work with `v13.3.0` so we need to get the tag:

```txt
git fetch --all --tags
Fetching origin
Fetching upstream
remote: Enumerating objects: 502, done.
remote: Counting objects: 100% (459/459), done.
remote: Compressing objects: 100% (240/240), done.
remote: Total 502 (delta 283), reused 327 (delta 218), pack-reused 43
Receiving objects: 100% (502/502), 1.29 MiB | 7.24 MiB/s, done.
Resolving deltas: 100% (289/289), completed with 102 local objects.
From https://github.com/WordPress/gutenberg
   046ca65b20..81ac4cf385  trunk      -> upstream/trunk
 * [new tag]               v13.3.0    -> v13.3.0
```

Once you know the name of the tag, you can run the following command to check it out:

```bash
git checkout tags/v13.3.0 -b v13.0.0-branch
```

`tags/v13.3.0` is the name of the tag we want to work with.

The `-b` flag tells git to create a branch named `v13.0.0-branch` and check it out.
