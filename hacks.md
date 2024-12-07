### Find all files with certain extension that match pattern, ignoring certain folders and only print file name.

```bash
¤ find . \( -name node_modules -prune \) -o \( -name .next -prune \) -name '*.ts' -o -name '*.js' -exec grep -l "embed" {} \; -print
```
