CREATE TABLE tests (
    id uuid PRIMARY KEY,
    name character varying(32),
    hash character(88),
    salt character(24),
    iterations integer
);

CREATE TABLE testdata (
    id uuid  REFERENCES tests(id) UNIQUE,
    data jsonb
);