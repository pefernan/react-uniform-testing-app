import React from 'react';
import { AutoForm } from './universal';

import JsonExampleSchema from '../schemas/jsonExampleSchema';

export default function JsonSchemaForm() {
  return <AutoForm schema={JsonExampleSchema} onSubmit={model => alert(JSON.stringify(model, null, 2))} />;
}
