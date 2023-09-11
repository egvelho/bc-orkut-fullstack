drop table if exists comments;
create table comments (
  id integer primary key autoincrement,
  message text not null,
  created_at timestamp default current_timestamp,
  post_id integer not null,
  foreign key (post_id) references posts(id) on delete cascade
);