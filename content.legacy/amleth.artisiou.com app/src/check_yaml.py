import glob
import sys
import yaml

files = glob.glob('./**/*.yaml', recursive=True)
for f in files:
    yaml.safe_load(f)

print(f"{len(files)} YAML files checked")
