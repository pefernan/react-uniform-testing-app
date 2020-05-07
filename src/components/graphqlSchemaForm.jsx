import React from 'react';
import { AutoForm } from './universal';

import KogitoGraphqlSchema from '../schemas/kogitoGraphqlSchema';

export default function GraphqlSchemaForm() {
  return <AutoForm schema={KogitoGraphqlSchema} onSubmit={model => alert(JSON.stringify(model, null, 2))} />;
}
