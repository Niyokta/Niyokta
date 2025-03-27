
import React from 'react';
import { Button } from '../ui/button';

const ProjectUser = () => {
  const handleClick = async () => {
    try {
      const response = await fetch('/api/Project/Personal', {
        method: 'GET',
        credentials: 'include',
      });
     
      return response;
    } catch (error) {
      console.error('Error fetching project details:', error);
      return error;
    }
  };

  return (
    <div>
      <p>This is the project component</p>
      <Button onClick={handleClick}>Click to get project details</Button>
    </div>
  );
};

export default ProjectUser;
