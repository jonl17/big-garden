export const repoName = process.env.PRISMIC_REPOSITORY_NAME
export const apiEndpoint = `https://${repoName}.cdn.prismic.io/api/v2`
export const accessToken = process.env.PRISMIC_ACCESS_TOKEN

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc: any) => {
  if (doc.type === 'page') {
    return `/${doc.uid}`
  } else if (doc.type === 'work') {
    return `/work/${doc.uid}`
  }
  return '/'
}

// -- Route Resolver rules
// Manages the url links to internal Prismic documents two levels deep (optionals)
export const Router = {
  routes: [
    {
      type: 'page',
      path: '/:uid',
    },
    {
      type: 'work',
      path: '/work/:uid',
    },
  ],
}
