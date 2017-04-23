import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import ProjectsItem from './ProjectsItem';
import ProjectsItemFrame from './ProjectsItemFrame';
import './projects-styles/floatGrid.css';
import './projects-styles/ProjectsItemFrame.css'
import confirm from 'helpers/confirm';

class ProjectListContainer extends Component {
  componentDidMount() {
    store.dispatch(actions.fetchProjects());
  }
  
  confirmDelete(projectId) {
    confirm(`Are you sure you want to delete this project?`).then(() => {
      store.dispatch(actions.deleteProject(projectId));
   }, () => {
     
 });
  }

  render() {
    console.log(this.props.thumbnail)
    const { projects } = this.props;
    
    if (projects) {
      const projectsList = [...projects, ...projects, ...projects, ...projects,...projects, ...projects, ...projects].map((project, index) => {
        return (
          <ProjectsItemFrame 
            key={index}
            thumbnailSrc={this.props.thumbnail || project.boardSpecs.thumbnail}
            projectId={ project._id } 
            confirmDelete={this.confirmDelete}
            >
            <ProjectsItem  
              projectId={ project._id } 
              projectName={project.name} 
            /> 
          </ProjectsItemFrame>
        )
      });
      
      return (
        <div className="thumbnail-row">
          <div className="row thumbnail-row">
            {projectsList}
          </div>
        </div>
      
      );
    } 
    else {
      return <div></div>
    }
  }
};

const mapStateToProps = (state, props) => ({
  projects: state.projectList,
  thumbnail: state.boardSpecs.thumbnail
});

export default connect(mapStateToProps)(ProjectListContainer);