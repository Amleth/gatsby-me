# get just the current folder stub/name
export PROJECT=${PWD##*/}
# set WHERE_TO if you have a preference, defaults to ~/node_cache/$PROJECT/node_modules
export WHERE_TO=${WHERE_TO:-$HOME/node_cache/$PROJECT}

echo "Moving $PROJECT node_modules to $WHERE_TO"

if [[ -L ./node_modules ]]; then
  echo "node_modules is already a symlink!"
  exit
fi

mkdir -p $WHERE_TO                               # ensure this folder
tar cf - node_modules| (cd $WHERE_TO; tar xf -)  # this efficiently replicates the folder structure
mv node_modules node_modules_backup              # backup your old node_modules
ln -s $WHERE_TO/node_modules ./node_modules      # symlink to the ubuntu cache

echo "You can `rm -rf node_modules_backup` once your build works correctly!"