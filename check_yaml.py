import glob
import sys
import yaml

files = glob.glob('./**/*.yaml', recursive=True)
for f in files:
    with open(f, 'r') as file:
        try:
            data = yaml.safe_load(file)
        except:
            print(f"😡 {f}")

print(f"{len(files)} YAML files checked")
