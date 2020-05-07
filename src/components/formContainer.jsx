import React from 'react';
import TutorialForm from './TutorialForm';
import JsonSchemaForm from './jsonSchemaFrom';
import GraphqlSchemaForm from './graphqlSchemaForm';

export default function FormContainer() {
    return (
        <div>
            <TutorialForm>
                <h1>Json Schema Form</h1>
                <JsonSchemaForm />

                <hr />
                
                <h1>Graphql Schema Form</h1>
                <GraphqlSchemaForm />
            </TutorialForm>
            <hr />


        </div>
    );
}