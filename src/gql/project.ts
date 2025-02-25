import { gql } from '@apollo/client'

export const ADD_PROJECT = gql`
  mutation AddProject($title: String, $scope: ScopeInput, $budget: BudgetInput, $skills: [String]) {
    addProject(title: $title, scope: $scope, budget: $budget, skills: $skills) {
      _id
    }
  }
`

export const DELETE_PROJECT = gql`
  mutation DeleteProject($_id: ID!) {
    deleteProject(_id: $_id) {
      _id
    }
  }
`

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($project: ProjectInput) {
    updateProject(project: $project) {
      _id
      owner
      title
      description
      scope {
        size
        duration
        experience
      }
      skills
      budget {
        type
        currency
        amount
      }
      isPublished
    }
  }
`

export const GET_USER_PROJECTS = gql`
  query GetUserProjects {
    getUserProjects {
      _id
      budget {
        amount
        currency
        type
      }
      description
      isPublished
      owner
      scope {
        duration
        experience
        size
      }
      skills
      title
    }
  }
`

export const GET_PROJECTS = gql`
  query Projects($input: ProjectsInputFilter) {
    projects(input: $input) {
      _id
      budget {
        amount
        currency
        type
      }
      description
      isPublished
      owner
      scope {
        duration
        experience
        size
      }
      skills
      title
    }
  }
`

export const GET_PROJECT = gql`
  query Project($_id: ID!) {
    project(_id: $_id) {
      _id
      owner
      title
      description
      skills
      scope {
        size
        duration
        experience
      }
      budget {
        type
        currency
        amount
      }
      isPublished
    }
  }
`

export const UPDATE_PROJECT_BUDGET = gql`
  mutation UpdateProjectBudget($_id: ID!, $budget: BudgetInput) {
    updateProjectBudget(_id: $_id, budget: $budget) {
      budget {
        type
        currency
        amount
      }
    }
  }
`
export const UPDATE_PROJECT_DESCRIPTION = gql`
  mutation UpdateProjectDescription($_id: ID!, $description: String) {
    updateProjectDescription(_id: $_id, description: $description) {
      description
    }
  }
`

export const UPDATE_PROJECT_SCOPE = gql`
  mutation UpdateProjectScope($_id: ID!, $scope: ScopeInput) {
    updateProjectScope(_id: $_id, scope: $scope) {
      scope {
        size
        duration
        experience
      }
    }
  }
`

export const UPDATE_PROJECT_SKILLS = gql`
  mutation UpdateProjectSkills($_id: ID!, $skills: [String]) {
    updateProjectSkills(_id: $_id, skills: $skills) {
      skills
    }
  }
`

export const UPDATE_PROJECT_TITLE = gql`
  mutation UpdateProjectTitle($_id: ID!, $title: String) {
    updateProjectTitle(_id: $_id, title: $title) {
      title
    }
  }
`

export const GET_PROJECTS_BY_USER_PROPOSALS = gql`
  query GetUserDashboardInfo {
    getProjectsByUserProposals {
      _id
      title
      skills
      budget {
        amount
        currency
        type
      }
    }
    getUserProposals {
      _id
      coverLetter
    }
    getUserCurrentProjects {
      title
      _id
      skills
      budget {
        currency
        amount
      }
      isPublished
    }
    getUserActiveProjects {
      _id
      title
      _id
      skills
      budget {
        currency
        amount
      }
    }
  }
`
