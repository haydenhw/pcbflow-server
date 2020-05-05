CREATE TABLE projects(
  id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id integer,
  name varchar(50),
  is_sample_project Boolean DEFAULT false,
  board_height decimal NOT NULL,
  board_width decimal NOT NULL,
  board_x decimal NOT NULL,
  board_y decimal NOT NULL,
  board_thumbnail text NOT NULL
);


CREATE TABLE modules (
  id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  project_id integer NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE,
  module_id varchar(50) NOT NULL,
  price decimal NOT NULL,
  icon_height varchar(50) NOT NULL,
  icon_src varchar(100) NOT NULL,
  image_src varchar(100),
  image_height decimal,
  image_width decimal,
  image_y decimal,
  image_x decimal,
  text_y decimal NOT NULL,
  text_x decimal NOT NULL,
  text varchar(50) NOT NULL,
  inner_group_y decimal,
  inner_group_x decimal,
  bound_to_side_index integer,
  rotation integer NOT NULL,
  height decimal NOT NULL,
  width decimal NOT NULL,
  stroke varchar(50) NOT NULL,
  y decimal NOT NULL,
  x decimal NULL,
  dependencies varchar(100) NOT NULL
);
