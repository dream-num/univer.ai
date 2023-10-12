# Official website

# Publish to aliyun

After Commit, push tag to publish

```sh
git add .
git commit -m "fix: new commit"
git pull
git describe # View the latest tag
git tag -a v1.0 -m "release" # Upgrade version number according to the latest tag
git push --follow-tags
```

Just publish, no need to submit code

```sh
git describe
git tag -a v1.0 -m "release"
git push origin v1.0 # push tag
```