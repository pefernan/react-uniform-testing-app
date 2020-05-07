import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema } from 'graphql';
import { parse } from 'graphql';

//Issues: 1. does not support DateTime. 2. does not support enum. 3. cannot use self inside

const schema = `
scalar DateTime

type Query {
    ProcessInstances(where: ProcessInstanceArgument, orderBy: ProcessInstanceOrderBy, pagination: Pagination): [ProcessInstance]
    UserTaskInstances(where: UserTaskInstanceArgument, orderBy: UserTaskInstanceOrderBy, pagination: Pagination):  [UserTaskInstance]
    Jobs(where: JobArgument, orderBy: JobOrderBy, pagination: Pagination):  [Job]
}

type ProcessInstance {
    id: String!
    processId: String!
    processName: String
    parentProcessInstanceId: String
    rootProcessInstanceId: String
    rootProcessId: String
    roles: [String!]
    endpoint: String!
    serviceUrl: String
    state: String!
    nodes: [NodeInstance!]!
    variables: String
    start: String!
    end: String
    error: ProcessInstanceError
    addons: [String!]
    lastUpdate: String!
    businessKey: String
}

type KogitoMetadata {
    lastUpdate: String!
    processInstances: [ProcessInstanceMeta]
    userTasks: [UserTaskInstanceMeta]
}

input KogitoMetadataOrderBy {
    lastUpdate: OrderBy
}

input KogitoMetadataArgument {
    lastUpdate: DateArgument
    processInstances: ProcessInstanceMetaArgument
    userTasks: UserTaskInstanceMetaArgument
}

type ProcessInstanceMeta {
    id: String!
    processId: String!
    processName: String
    parentProcessInstanceId: String
    rootProcessInstanceId: String
    rootProcessId: String
    roles: [String!]
    state: String!
    endpoint: String!
    start: String!
    end: String
    lastUpdate: String!
    businessKey: String
}

type ProcessInstanceError {
    nodeDefinitionId: String!
    message: String
}

enum ProcessInstanceState {
    PENDING,
    ACTIVE,
    COMPLETED,
    ABORTED,
    SUSPENDED,
    ERROR
}

type NodeInstance {
    id: String!
    name: String!
    type: String!
    enter: String!
    exit: String
    definitionId: String!
    nodeId: String!
}

input ProcessInstanceOrderBy {
    processId: OrderBy
    processName: OrderBy
    rootProcessId: OrderBy
    state: OrderBy
    start: OrderBy
    end: OrderBy
    error: ProcessInstanceErrorOrderBy
    lastUpdate: OrderBy
    businessKey: OrderBy
}

input ProcessInstanceErrorOrderBy {
    nodeDefinitionId: OrderBy
    message: OrderBy
}

input ProcessInstanceArgument {
    and: [ProcessInstanceArgument!]
    or: [ProcessInstanceArgument!]
    id: IdArgument
    processId: StringArgument
    processName: StringArgument
    parentProcessInstanceId: IdArgument
    rootProcessInstanceId: IdArgument
    rootProcessId: StringArgument
    state: ProcessInstanceStateArgument
    error: ProcessInstanceErrorArgument
    nodes: NodeInstanceArgument
    endpoint: StringArgument
    roles: StringArrayArgument
    start: DateArgument
    end: DateArgument
    addons: StringArrayArgument
    lastUpdate: DateArgument
    businessKey: StringArgument
}

input ProcessInstanceErrorArgument {
    nodeDefinitionId: StringArgument
    message: StringArgument
}

input ProcessInstanceMetaArgument {
    id: IdArgument
    processId: StringArgument
    processName: StringArgument
    parentProcessInstanceId: IdArgument
    rootProcessInstanceId: IdArgument
    rootProcessId: StringArgument
    state: ProcessInstanceStateArgument
    endpoint: StringArgument
    roles: StringArrayArgument
    start: DateArgument
    end: DateArgument
    businessKey: StringArgument
}

input NodeInstanceArgument {
    id: IdArgument
    name: StringArgument
    definitionId: StringArgument
    nodeId: StringArgument
    type: StringArgument
    enter: DateArgument
    exit: DateArgument
}

input StringArrayArgument {
    contains: String
    containsAll: [String!]
    containsAny: [String!]
    isNull: Boolean
}

input IdArgument {
    in: [String!]
    equal: String
    isNull: Boolean
}

input StringArgument {
    in: [String!]
    like: String
    isNull: Boolean
    equal: String
}

input BooleanArgument {
    isNull: Boolean
    equal: Boolean
}

input NumericArgument {
    in: [Int!]
    isNull: Boolean
    equal: Int
    greaterThan: Int
    greaterThanEqual: Int
    lessThan: Int
    lessThanEqual: Int
    between: NumericRange
}

input NumericRange {
    from: Int!
    to: Int!
}

input DateArgument {
    isNull: Boolean
    equal: String
    greaterThan: String
    greaterThanEqual: String
    lessThan: String
    lessThanEqual: String
    between: DateRange
}

input DateRange {
    from: String!
    to: String!
}

input ProcessInstanceStateArgument {
    equal: ProcessInstanceState
    in: [ProcessInstanceState]
}

type UserTaskInstance {
    id: String!
    description: String
    name: String
    priority: String
    processInstanceId: String!
    processId: String!
    rootProcessInstanceId: String
    rootProcessId: String
    state: String!
    actualOwner: String
    adminGroups: [String!]
    adminUsers: [String!]
    completed: String
    started: String!
    excludedUsers: [String!]
    potentialGroups: [String!]
    potentialUsers: [String!]
    inputs: String
    outputs: String
    referenceName: String
    lastUpdate: String!
}

type UserTaskInstanceMeta {
    id: String!
    description: String
    name: String
    priority: String
    processInstanceId: String!
    state: String!
    actualOwner: String
    adminGroups: [String!]
    adminUsers: [String!]
    completed: String
    started: String!
    excludedUsers: [String!]
    potentialGroups: [String!]
    potentialUsers: [String!]
    referenceName: String
    lastUpdate: String!
}

input UserTaskInstanceArgument {
    and: [UserTaskInstanceArgument!]
    or: [UserTaskInstanceArgument!]
    state: StringArgument
    id: IdArgument
    description: StringArgument
    name: StringArgument
    priority: StringArgument
    processInstanceId: IdArgument
    actualOwner: StringArgument
    potentialUsers: StringArrayArgument
    potentialGroups: StringArrayArgument
    excludedUsers: StringArrayArgument
    adminGroups: StringArrayArgument
    adminUsers: StringArrayArgument
    completed: DateArgument
    started: DateArgument
    referenceName: StringArgument
    lastUpdate: DateArgument
}

input UserTaskInstanceMetaArgument {
    state: StringArgument
    id: IdArgument
    description: StringArgument
    name: StringArgument
    priority: StringArgument
    processInstanceId: IdArgument
    actualOwner: StringArgument
    potentialUsers: StringArrayArgument
    potentialGroups: StringArrayArgument
    excludedUsers: StringArrayArgument
    adminGroups: StringArrayArgument
    adminUsers: StringArrayArgument
    completed: DateArgument
    started: DateArgument
    referenceName: StringArgument
}

input UserTaskInstanceOrderBy {
    state: OrderBy
    actualOwner: OrderBy
    description: OrderBy
    name: OrderBy
    priority: OrderBy
    completed: OrderBy
    started: OrderBy
    referenceName: OrderBy
    lastUpdate: OrderBy
}

type Subscription {
    ProcessInstanceAdded: ProcessInstance!
    ProcessInstanceUpdated: ProcessInstance!
    UserTaskInstanceAdded: UserTaskInstance!
    UserTaskInstanceUpdated: UserTaskInstance!
    JobAdded: Job!
    JobUpdated: Job!
}

enum OrderBy {
    ASC,
    DESC
}

input Pagination {
    limit: Int
    offset: Int
}

type Job {
    id: String!
    processId: String
    processInstanceId: String
    rootProcessInstanceId: String
    rootProcessId: String
    status: JobStatus!
    expirationTime: String
    priority: Int
    callbackEndpoint: String
    repeatInterval: Int
    repeatLimit: Int
    scheduledId: String
    retries: Int
    lastUpdate: String
    executionCounter: Int
}

enum JobStatus {
    ERROR,
    EXECUTED,
    SCHEDULED,
    RETRY,
    CANCELED
}

input JobStatusArgument {
    equal: JobStatus
    in: [JobStatus]
}

input JobArgument {
    and: [JobArgument!]
    or: [JobArgument!]
    id: IdArgument
    processId: StringArgument
    processInstanceId: IdArgument
    rootProcessInstanceId: IdArgument
    rootProcessId: StringArgument
    status: JobStatusArgument
    expirationTime: DateArgument
    priority: NumericArgument
    scheduledId: IdArgument
    lastUpdate: DateArgument
}

input JobOrderBy {
    processId: OrderBy
    rootProcessId: OrderBy
    status: OrderBy
    expirationTime: OrderBy
    priority: OrderBy
    retries: OrderBy
    lastUpdate: OrderBy
    executionCounter: OrderBy
}
`;

const parsedSchema = parse(schema);
console.log(buildASTSchema(parsedSchema).getType('Query').getFields());
const schemaType = buildASTSchema(parse(schema)).getType('ProcessInstanceMeta');
const schemaData = {
    state: {
        options: [
            { label: 'Pending', value: 'PENDING' },
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Completed', value: 'COMPLETED' },
            { label: 'Aborted', value: 'ABORTED' },
            { label: 'Suspended', value: 'SUSPENDED' },
            { label: 'Error', value: 'ERROR' },
        ]

    }
};

const schemaValidator = model => {
    const details = [];

    if (!model.id) {
        details.push({ name: 'id', message: 'ID is required!' });
    }

    if (details.length) {
        throw { details };
    }
};

export default new GraphQLBridge(schemaType, schemaValidator, schemaData);