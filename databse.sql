create sequence seq_auth_users;

alter sequence seq_auth_users owner to postgres;

create sequence seq_org_employees;

alter sequence seq_org_employees owner to postgres;

create sequence seq_org_groups;

alter sequence seq_org_groups owner to postgres;

create sequence seq_org_childrens;

alter sequence seq_org_childrens owner to postgres;

create type auth_user_type as enum ('INDIVIDUAL', 'ORGANIZATION');

alter type auth_user_type owner to postgres;

create table auth_users
(
    id          bigint         default nextval('seq_auth_users'::regclass) not null,
    created_at  timestamp,
    full_name   varchar(255),
    permissions jsonb,
    staff_id    uuid,
    state       integer        default 1,
    updated_at  timestamp,
    email       varchar(255),
    password    varchar,
    post_name   varchar(256),
    user_type   auth_user_type default 'ORGANIZATION'::auth_user_type,
    photo       json
);



create unique index auth_users_email_uindex
    on auth_users (email)
    where (state = 1);

alter table auth_users
    add primary key (id);

create table lists
(
    type_id                  integer not null,
    id                       bigint  not null,
    attributes               json,
    created_at               timestamp,
    created_by               bigint,
    date01                   timestamp,
    date02                   timestamp,
    date03                   timestamp,
    date04                   timestamp,
    date05                   timestamp,
    geo_polygon              json,
    int01                    integer,
    int02                    integer,
    int03                    integer,
    int04                    integer,
    int05                    integer,
    int06                    integer,
    int07                    integer,
    int08                    integer,
    int09                    integer,
    int10                    integer,
    key1                     varchar(255),
    key2                     varchar(255),
    key3                     varchar(255),
    long01                   varchar(2000),
    long02                   varchar(2000),
    long03                   varchar(2000),
    name1                    varchar(255),
    name2                    varchar(255),
    name3                    varchar(255),
    name4                    varchar(255),
    num                      integer,
    num01                    double precision,
    num02                    double precision,
    num03                    double precision,
    num04                    double precision,
    num05                    double precision,
    num06                    double precision,
    num07                    double precision,
    num08                    double precision,
    num09                    double precision,
    num10                    double precision,
    state                    integer,
    tag                      integer,
    updated_at               timestamp,
    updated_by               bigint,
    val01                    varchar(500),
    val02                    varchar(255),
    val03                    varchar(255),
    val04                    varchar(255),
    val05                    varchar(1000),
    val06                    varchar(255),
    val07                    varchar(255),
    val08                    varchar(255),
    val09                    varchar(255),
    val10                    varchar(255),
    version                  integer,
    online_mahalla_update_id bigint
);


alter table lists
    add constraint lists_pkey
        unique (type_id, id);

create table org_employees
(
    id          bigint    default nextval('seq_org_employees'::regclass) not null,
    created_at  timestamp default now(),
    created_by  bigint,
    updated_at  timestamp,
    updated_by  bigint,
    state       integer   default 1,
    position_id integer,
    org_id      bigint,
    user_id     bigint,
    salary      numeric,
    degree      varchar,
    email       varchar,
    full_name   varchar
);



alter table org_employees
    add primary key (id);

create table org_groups
(
    id          bigint    default nextval('seq_org_groups'::regclass) not null,
    created_at  timestamp default now(),
    created_by  bigint,
    updated_at  timestamp,
    updated_by  bigint,
    state       integer   default 1,
    name        varchar,
    org_id      bigint,
    description varchar,
    group_head  bigint
);



create table org_children
(
    id           bigint    default nextval('seq_org_childrens'::regclass) not null,
    created_at   timestamp default now(),
    created_by   bigint,
    updated_at   timestamp,
    updated_by   bigint,
    state        integer   default 1,
    full_name    varchar,
    org_id       bigint,
    age          varchar,
    group_id     bigint,
    gender       integer,
    parent_name  varchar,
    parent_email varchar
);



