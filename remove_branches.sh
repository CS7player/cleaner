#!/bin/bash

# Check if we're inside a Git repo
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "❌ Not a Git repository. Aborting."
  exit 1
fi

# Check if HEAD exists (i.e., at least one commit)
if ! git rev-parse HEAD > /dev/null 2>&1; then
  echo "❌ Git repository has no commits yet. Aborting."
  exit 1
fi

# Get the current branch name safely
current_branch=$(git symbolic-ref --short HEAD 2>/dev/null)

if [ -z "$current_branch" ]; then
  echo "❌ Could not determine current branch. Possibly in detached HEAD. Aborting."
  exit 1
fi

echo "⚠️  Current branch: $current_branch"
echo "🧹 Deleting all *other* local branches..."

branches_to_delete=$(git branch | grep -v "^\*" | grep -v "$current_branch")

if [ -z "$branches_to_delete" ]; then
  echo "✅ No other local branches to delete."
  exit 0
fi

for branch in $branches_to_delete; do
  branch=$(echo $branch | xargs)
  if git branch -d "$branch" > /dev/null 2>&1; then
    echo "🗑️  Deleted branch: $branch"
  else
    echo "⛔ Skipped unmerged branch: $branch"
  fi
done

echo "🎉 Cleanup complete."
