// frontend/src/components/PageBuilder.js
import React, { useState } from 'react';
import { Container, Button } from '@mui/material';
import ComponentEditor from './ComponentEditor';

const PageBuilder = () => {
  const [components, setComponents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const addComponent = () => {
    setIsEditing(true);
  };

  const handleSave = (newComponent) => {
    setComponents([...components, newComponent]);
    setIsEditing(false);
  };

  return (
    <Container>
      <h1>Page Builder</h1>
      {components.map((component, index) => (
        <div key={index}>{component.type}</div>
      ))}
      <Button onClick={addComponent}>Add Component</Button>
      {isEditing && <ComponentEditor onSave={handleSave} />}
    </Container>
  );
};

export default PageBuilder;