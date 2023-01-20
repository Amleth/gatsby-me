from importlib.metadata import metadata
import frontmatter
import hashlib
import os
import pathlib
from pprint import pprint
import shutil
from slugify import slugify

#
# INIT
#

sha1sum = hashlib.sha1()
shutil.rmtree('./src/data_out', ignore_errors=True)
pathlib.Path('./src/data_out').mkdir(parents=True, exist_ok=True)

#
# SERIES
#

for f in pathlib.Path('./src/data_in/series').iterdir():
    if f.is_dir():
        serie_slug = slugify(f.name)
        data = dict()
        out_serie_dir = pathlib.Path(
            './src/data_out/series', serie_slug).mkdir(parents=True, exist_ok=True)
        f_parts = f.name.split(' - ')
        data["date"] = f_parts[0]
        data["title"] = f_parts[1]
        data["files"] = []
        for i in f.iterdir():
            if i.is_file():
                sha1 = hashlib.sha1(i.read_bytes()).hexdigest()
                dest = str(i.parent).replace('/data_in/', '/data_out/')
                dest = dest.replace(i.parent.name, slugify(i.parent.name))
                os.makedirs(dest, exist_ok=True)
                shutil.copy(str(i), dest)
                os.rename(pathlib.Path(dest, i.name),
                          pathlib.Path(dest, sha1 + i.suffix))
                data["files"].append(sha1 + i.suffix)

        class fm:
            pass
        fm.metadata = data
        fm.content = ""
        with open(pathlib.Path(dest, "index.mdx"), mode="wt") as file:
            file.write(frontmatter.dumps(fm))
