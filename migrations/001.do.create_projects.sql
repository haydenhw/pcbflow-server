CREATE TABLE projects(
  id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  owner_id integer,
  name varchar(50),
  is_sample_project Boolean DEFAULT false,
  board_height integer NOT NULL,
  board_width integer NOT NULL,
  board_x integer NOT NULL,
  board_y integer NOT NULL,
  board_thumbnail text
);

CREATE TABLE modules (
  id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  project_id integer NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE,
  module_id varchar(50) NOT NULL,
  price decimal NOT NULL,
  icon_height varchar(50) NOT NULL,
  icon_src varchar(100) NOT NULL,
  image_src varchar(100) NOT NULL,
  image_height integer NOT NULL,
  image_width integer NOT NULL,
  image_y integer NOT NULL,
  image_x integer NOT NULL,
  text_y integer NOT NULL,
  text_x decimal NOT NULL,
  text varchar(50)NOT NULL,
  inner_group_y integer NOT NULL,
  inner_group_x integer NOT NULL,
  bound_to_side_index integer NOT NULL,
  rotation integer NOT NULL,
  height integer NOT NULL,
  width integer NOT NULL,
  stroke varchar(50)NOT NULL,
  y integer NOT NULL,
  x integer NOT NULL,
  dependencies varchar(100) NOT NULL
);
