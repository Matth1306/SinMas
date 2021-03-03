first install bin

```
cd bin
npm install
```

to run

```
cd bin
> dev [task]
```

to see available tasks (will be more in future)

```
> dev --tasks
[13:04:09] Tasks for \spinV12020\bin\gulpfile.js
[13:04:09] ├── git_update
[13:04:09] ├── mongo_start
[13:04:09] ├── mongo_stop
[13:04:09] ├── mongo_shell
[13:04:09] ├── backend_install
[13:04:09] ├── backend_start
[13:04:09] └── default
```

some tasks:

- `dev git_update` to get latest code
- `dev mongo_start` start mongodb instance locally
- `dev backend_install` install dependencies
- `dev backend_start` starts the service

to add tasks:

- add to `bin/src/foo.js` \
  that exports tasks-names prefixed `foo_*`
