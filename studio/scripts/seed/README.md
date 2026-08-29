# Vertex seed import

The source fixture lives in `../../course-kit/` at the repository root:

- `seed.ndjson` contains the Sanity documents, references, Portable Text, and image directives.
- `videos.json` verifies the YouTube ID and duration assigned to every lesson. It is metadata for
  validation and later ingestion, not an importable Sanity document set.

From `studio/`, run:

```bash
npm run seed:validate
npm run seed:import
```

The import loads the project and dataset configured in `studio/.env.local` and passes the dataset
explicitly to the CLI. It uses `--replace` so reruns converge on the fixture's deterministic IDs.
It does not allow failing assets: if Sanity cannot upload an image, the import fails and should be
investigated.

After importing, validate the dataset and check counts:

```bash
npx sanity documents validate --level error
npx sanity documents query '{
  "category": count(*[_type == "category"]),
  "instructor": count(*[_type == "instructor"]),
  "course": count(*[_type == "course"]),
  "lesson": count(*[_type == "lesson"])
}'
```
